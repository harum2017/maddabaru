import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface DomainCheckResult {
  domain: string;
  dnsStatus: 'active' | 'pending' | 'error';
  dnsMessage: string;
  sslStatus: 'valid' | 'pending' | 'expired' | 'none';
  sslMessage: string;
  ipAddress: string | null;
  expectedIp: string;
  lastChecked: string;
}

// Expected IPs for Lovable/platform domains (multiple valid IPs)
const VALID_PLATFORM_IPS = ['185.158.133.1', '185.158.133.2'];

// Block private/internal IP ranges and reserved hostnames
const BLOCKED_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /\.local$/i,
  /\.internal$/i,
  /^metadata\.google\.internal$/i,
];

function isDomainBlocked(domain: string): boolean {
  return BLOCKED_PATTERNS.some(pattern => pattern.test(domain));
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate: require a valid JWT from a super_admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = claimsData.claims.sub as string;

    // Verify super_admin role using service role client
    const supabaseAdmin = createClient(
      supabaseUrl,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'super_admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: super_admin role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { domain } = await req.json();

    if (!domain) {
      return new Response(
        JSON.stringify({ error: 'Domain is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean domain (remove protocol and trailing slashes)
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .toLowerCase();

    // Block SSRF: reject private/internal hostnames
    if (isDomainBlocked(cleanDomain)) {
      return new Response(
        JSON.stringify({ error: 'Invalid domain' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate domain format
    const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
    if (!domainRegex.test(cleanDomain)) {
      return new Response(
        JSON.stringify({ error: 'Invalid domain format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[check-domain-status] Checking domain: ${cleanDomain}`);

    let dnsStatus: DomainCheckResult['dnsStatus'] = 'pending';
    let dnsMessage = 'Belum dapat memverifikasi DNS';
    let ipAddress: string | null = null;
    let sslStatus: DomainCheckResult['sslStatus'] = 'pending';
    let sslMessage = 'Belum dapat memverifikasi SSL';

    // Check DNS by trying to resolve the domain
    try {
      const dnsResponse = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=A`,
        { headers: { 'Accept': 'application/dns-json' } }
      );

      if (dnsResponse.ok) {
        const dnsData = await dnsResponse.json();

        if (dnsData.Answer && dnsData.Answer.length > 0) {
          const aRecord = dnsData.Answer.find((r: any) => r.type === 1);
          if (aRecord) {
            ipAddress = aRecord.data;
            
            if (VALID_PLATFORM_IPS.includes(ipAddress!)) {
              dnsStatus = 'active';
              dnsMessage = `DNS dikonfigurasi dengan benar (${ipAddress})`;
            } else {
              dnsStatus = 'error';
              dnsMessage = `DNS mengarah ke ${ipAddress}, seharusnya ${VALID_PLATFORM_IPS[0]}`;
            }
          } else {
            dnsStatus = 'error';
            dnsMessage = 'Tidak ditemukan A record';
          }
        } else if (dnsData.Status === 3) {
          dnsStatus = 'error';
          dnsMessage = 'Domain tidak ditemukan (NXDOMAIN)';
        } else {
          dnsStatus = 'pending';
          dnsMessage = 'DNS belum dikonfigurasi';
        }
      }
    } catch (dnsError) {
      console.error(`[check-domain-status] DNS check error:`, dnsError);
      dnsStatus = 'error';
      dnsMessage = 'Gagal memeriksa DNS';
    }

    // Check SSL by trying HTTPS connection
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const sslResponse = await fetch(`https://${cleanDomain}`, {
        method: 'HEAD',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (sslResponse.ok || sslResponse.status === 301 || sslResponse.status === 302) {
        sslStatus = 'valid';
        sslMessage = 'Sertifikat SSL aktif dan valid';
      } else {
        sslStatus = 'pending';
        sslMessage = `HTTP ${sslResponse.status}`;
      }
    } catch (sslError: any) {
      if (sslError.message?.includes('certificate')) {
        sslStatus = 'expired';
        sslMessage = 'Sertifikat SSL bermasalah atau expired';
      } else if (sslError.message?.includes('abort')) {
        sslStatus = 'pending';
        sslMessage = 'Timeout - server tidak merespons';
      } else if (dnsStatus === 'active') {
        sslStatus = 'pending';
        sslMessage = 'SSL sedang diproses';
      } else {
        sslStatus = 'none';
        sslMessage = 'Tidak dapat memeriksa SSL (DNS belum aktif)';
      }
    }

    const result: DomainCheckResult = {
      domain: cleanDomain,
      dnsStatus,
      dnsMessage,
      sslStatus,
      sslMessage,
      ipAddress,
      expectedIp: VALID_PLATFORM_IPS[0],
      lastChecked: new Date().toISOString(),
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[check-domain-status] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
