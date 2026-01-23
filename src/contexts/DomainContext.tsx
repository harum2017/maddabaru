import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { School } from '@/data/dummyData';
import { getDataService } from '@/services/repositories';

// Platform domains - bisa multiple untuk fleksibilitas
const PLATFORM_DOMAINS = [
  import.meta.env.VITE_PLATFORM_DOMAIN,
  'maddasoft.id',
  'maddasoft.my.id',
  'maddasoft.lovable.app',
  'localhost',
].filter(Boolean).map(d => d?.toLowerCase());

// Helper untuk cek apakah domain adalah platform
const isPlatformHost = (hostname: string): boolean => {
  const normalizedHost = hostname.toLowerCase().replace(/^www\./, '');
  return PLATFORM_DOMAINS.some(pd => 
    normalizedHost === pd || 
    normalizedHost.endsWith('.lovable.app') ||
    normalizedHost === 'localhost'
  );
};

interface DomainContextType {
  // Mode saat ini
  isPlatformDomain: boolean;
  isSchoolDomain: boolean;
  
  // Data sekolah (jika di domain sekolah atau simulasi)
  currentSchool: School | null;
  
  // Dev mode - simulasi sekolah
  isDevMode: boolean;
  simulatedSchoolId: number | null;
  setSimulatedSchoolId: (id: number | null) => void;
  
  // Info domain
  currentDomain: string;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const useDomain = () => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
};

interface DomainProviderProps {
  children: ReactNode;
}

export const DomainProvider: React.FC<DomainProviderProps> = ({ children }) => {
  // Inisialisasi dari localStorage jika ada (untuk persist saat refresh)
  const [simulatedSchoolId, setSimulatedSchoolIdState] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dev_simulated_school_id');
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });
  const [currentSchool, setCurrentSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Deteksi mode development - lebih robust
  const isDevMode = 
    import.meta.env.DEV || 
    import.meta.env.MODE === 'development' ||
    (typeof window !== 'undefined' && (
      window.location.hostname.includes('lovable.app') || 
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ));

  // Ambil domain saat ini dengan safe check
  const currentDomain = typeof window !== 'undefined' 
    ? window.location.hostname.toLowerCase().replace(/^www\./, '')
    : 'localhost';

  // Wrapper untuk setSimulatedSchoolId yang juga persist ke localStorage
  const setSimulatedSchoolId = (id: number | null) => {
    setSimulatedSchoolIdState(id);
    if (typeof window !== 'undefined') {
      if (id !== null) {
        localStorage.setItem('dev_simulated_school_id', id.toString());
      } else {
        localStorage.removeItem('dev_simulated_school_id');
      }
    }
  };

  // Cek simulasi sekolah (dev only) - prioritas: ENV > localStorage > query parameter
  useEffect(() => {
    if (isDevMode) {
      // Prioritas 1: ENV variable
      const envSchoolId = import.meta.env.VITE_DEV_SCHOOL_ID;
      const envId = envSchoolId ? parseInt(envSchoolId, 10) : null;
      
      // Prioritas 2: localStorage (persistent)
      const savedSchoolId = typeof window !== 'undefined' 
        ? localStorage.getItem('dev_simulated_school_id') 
        : null;
      const savedId = savedSchoolId ? parseInt(savedSchoolId, 10) : null;
      
      // Prioritas 3: query parameter
      const params = typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search) 
        : new URLSearchParams();
      const querySchoolId = params.get('school_id');
      const queryId = querySchoolId ? parseInt(querySchoolId, 10) : null;
      
      // Gunakan yang pertama yang valid
      const schoolId = envId || savedId || queryId;
      
      if (schoolId && !isNaN(schoolId)) {
        setSimulatedSchoolId(schoolId);
      }
    }
  }, [isDevMode]);

  // Tentukan apakah ini domain platform atau sekolah
  const isPlatformDomain = isDevMode 
    ? simulatedSchoolId === null 
    : isPlatformHost(currentDomain);

  const isSchoolDomain = !isPlatformDomain;

  // Dapatkan data sekolah menggunakan data service
  useEffect(() => {
    const loadSchool = async () => {
      setIsLoading(true);
      try {
        const dataService = getDataService();
        
        if (isDevMode && simulatedSchoolId !== null) {
          // Mode dev dengan simulasi
          const school = await dataService.school.getSchoolById(simulatedSchoolId);
          setCurrentSchool(school || null);
        } else if (!isDevMode && isSchoolDomain) {
          // Mode production - cek domain sekolah
          const school = await dataService.school.getSchoolByDomain(currentDomain);
          setCurrentSchool(school || null);
        } else {
          setCurrentSchool(null);
        }
      } catch (error) {
        console.error('[DomainContext] Error loading school:', error);
        setCurrentSchool(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchool();
  }, [isDevMode, simulatedSchoolId, isSchoolDomain, currentDomain]);

  const value: DomainContextType = {
    isPlatformDomain,
    isSchoolDomain,
    currentSchool,
    isDevMode,
    simulatedSchoolId,
    setSimulatedSchoolId,
    currentDomain
  };

  return (
    <DomainContext.Provider value={value}>
      {children}
    </DomainContext.Provider>
  );
};