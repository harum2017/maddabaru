import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();

    if (!domain) {
      return new Response(
        JSON.stringify({ error: 'Domain is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[check-domain-status] Checking domain: ${domain}`);

    // Clean domain (remove protocol and trailing slashes)
    const cleanDomain = domain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .toLowerCase();

    let dnsStatus: DomainCheckResult['dnsStatus'] = 'pending';
    let dnsMessage = 'Belum dapat memverifikasi DNS';
    let ipAddress: string | null = null;
    let sslStatus: DomainCheckResult['sslStatus'] = 'pending';
    let sslMessage = 'Belum dapat memverifikasi SSL';

    // Check DNS by trying to resolve the domain
    try {
      // Use DNS over HTTPS (DoH) to check A record
      const dnsResponse = await fetch(
        `https://dns.google/resolve?name=${cleanDomain}&type=A`,
        { headers: { 'Accept': 'application/dns-json' } }
      );

      if (dnsResponse.ok) {
        const dnsData = await dnsResponse.json();
        console.log(`[check-domain-status] DNS response:`, JSON.stringify(dnsData));

        if (dnsData.Answer && dnsData.Answer.length > 0) {
          // Get the A record IP
          const aRecord = dnsData.Answer.find((r: any) => r.type === 1);
          if (aRecord) {
            ipAddress = aRecord.data;
            
            if (VALID_PLATFORM_IPS.includes(ipAddress)) {
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
          // NXDOMAIN - domain doesn't exist
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
      console.log(`[check-domain-status] SSL check result:`, sslError.message);
      
      if (sslError.message?.includes('certificate')) {
        sslStatus = 'expired';
        sslMessage = 'Sertifikat SSL bermasalah atau expired';
      } else if (sslError.message?.includes('abort')) {
        sslStatus = 'pending';
        sslMessage = 'Timeout - server tidak merespons';
      } else if (dnsStatus === 'active') {
        // DNS is correct but SSL not ready yet
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

    console.log(`[check-domain-status] Result:`, JSON.stringify(result));

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[check-domain-status] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
