import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DomainStatus {
  domain: string;
  dnsStatus: 'active' | 'pending' | 'error';
  dnsMessage: string;
  sslStatus: 'valid' | 'pending' | 'expired' | 'none';
  sslMessage: string;
  ipAddress: string | null;
  expectedIp: string;
  lastChecked: string;
}

interface SchoolDomain {
  id: number;
  name: string;
  domain: string;
  is_active: boolean;
  level: string;
  domainStatus?: DomainStatus;
  isChecking?: boolean;
}

const PLATFORM_DOMAIN = 'maddasoft.id';

export function useDomainManagement() {
  const [schools, setSchools] = useState<SchoolDomain[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingAll, setCheckingAll] = useState(false);

  // Fetch all schools with their domains
  const fetchSchools = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, domain, is_active, level')
        .order('name');

      if (error) throw error;

      setSchools(data?.map(s => ({ ...s, level: s.level || 'SD' })) || []);
    } catch (error: any) {
      console.error('[useDomainManagement] Fetch error:', error);
      toast.error('Gagal mengambil data sekolah');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check single domain status
  const checkDomainStatus = useCallback(async (schoolId: number, domain: string) => {
    // Mark as checking
    setSchools(prev => prev.map(s => 
      s.id === schoolId ? { ...s, isChecking: true } : s
    ));

    try {
      const { data, error } = await supabase.functions.invoke('check-domain-status', {
        body: { domain }
      });

      if (error) throw error;

      // Update school with status
      setSchools(prev => prev.map(s => 
        s.id === schoolId 
          ? { ...s, domainStatus: data, isChecking: false }
          : s
      ));

      return data as DomainStatus;
    } catch (error: any) {
      console.error('[useDomainManagement] Check error:', error);
      setSchools(prev => prev.map(s => 
        s.id === schoolId ? { ...s, isChecking: false } : s
      ));
      toast.error(`Gagal memeriksa ${domain}`);
      return null;
    }
  }, []);

  // Check all domains
  const checkAllDomains = useCallback(async () => {
    setCheckingAll(true);
    
    for (const school of schools) {
      await checkDomainStatus(school.id, school.domain);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    }
    
    setCheckingAll(false);
    toast.success('Selesai memeriksa semua domain');
  }, [schools, checkDomainStatus]);

  // Update school domain
  const updateDomain = useCallback(async (schoolId: number, newDomain: string) => {
    try {
      // Validate domain format
      const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
      if (!domainRegex.test(newDomain)) {
        toast.error('Format domain tidak valid');
        return false;
      }

      // Check if domain already exists
      const { data: existing } = await supabase
        .from('schools')
        .select('id')
        .eq('domain', newDomain.toLowerCase())
        .neq('id', schoolId)
        .maybeSingle();

      if (existing) {
        toast.error('Domain sudah digunakan oleh sekolah lain');
        return false;
      }

      const { error } = await supabase
        .from('schools')
        .update({ domain: newDomain.toLowerCase() })
        .eq('id', schoolId);

      if (error) throw error;

      // Update local state
      setSchools(prev => prev.map(s => 
        s.id === schoolId 
          ? { ...s, domain: newDomain.toLowerCase(), domainStatus: undefined }
          : s
      ));

      toast.success('Domain berhasil diperbarui');
      return true;
    } catch (error: any) {
      console.error('[useDomainManagement] Update error:', error);
      toast.error('Gagal memperbarui domain');
      return false;
    }
  }, []);

  // Generate subdomain under platform
  const generateSubdomain = useCallback((schoolName: string): string => {
    // Convert name to slug
    const slug = schoolName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 30);
    
    return `${slug}.${PLATFORM_DOMAIN}`;
  }, []);

  // Assign subdomain to school
  const assignSubdomain = useCallback(async (schoolId: number, schoolName: string) => {
    const subdomain = generateSubdomain(schoolName);
    return updateDomain(schoolId, subdomain);
  }, [generateSubdomain, updateDomain]);

  // Toggle school active status
  const toggleActive = useCallback(async (schoolId: number, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('schools')
        .update({ is_active: isActive })
        .eq('id', schoolId);

      if (error) throw error;

      setSchools(prev => prev.map(s => 
        s.id === schoolId ? { ...s, is_active: isActive } : s
      ));

      toast.success(isActive ? 'Domain diaktifkan' : 'Domain dinonaktifkan');
      return true;
    } catch (error: any) {
      console.error('[useDomainManagement] Toggle error:', error);
      toast.error('Gagal mengubah status');
      return false;
    }
  }, []);

  return {
    schools,
    loading,
    checkingAll,
    fetchSchools,
    checkDomainStatus,
    checkAllDomains,
    updateDomain,
    assignSubdomain,
    generateSubdomain,
    toggleActive,
    platformDomain: PLATFORM_DOMAIN,
  };
}

export type { SchoolDomain, DomainStatus };
