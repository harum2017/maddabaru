import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { School } from '@/data/dummyData';
import { getDataService } from '@/services/repositories';

// Platform domain (saat production, ganti dengan domain sebenarnya)
const PLATFORM_DOMAIN = import.meta.env.VITE_PLATFORM_DOMAIN || 'maddasoft.id';

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

  // Deteksi mode development
  const isDevMode = import.meta.env.DEV || 
    window.location.hostname.includes('lovable.app') || 
    window.location.hostname === 'localhost';

  // Ambil domain saat ini
  const currentDomain = window.location.hostname.toLowerCase().replace(/^www\./, '');

  // Wrapper untuk setSimulatedSchoolId yang juga persist ke localStorage
  const setSimulatedSchoolId = (id: number | null) => {
    setSimulatedSchoolIdState(id);
    if (id !== null) {
      localStorage.setItem('dev_simulated_school_id', id.toString());
    } else {
      localStorage.removeItem('dev_simulated_school_id');
    }
  };

  // Cek simulasi sekolah (dev only) - prioritas: ENV > localStorage > query parameter
  useEffect(() => {
    if (isDevMode) {
      // Prioritas 1: ENV variable
      const envSchoolId = import.meta.env.VITE_DEV_SCHOOL_ID;
      const envId = envSchoolId ? parseInt(envSchoolId, 10) : null;
      
      // Prioritas 2: localStorage (persistent)
      const savedSchoolId = localStorage.getItem('dev_simulated_school_id');
      const savedId = savedSchoolId ? parseInt(savedSchoolId, 10) : null;
      
      // Prioritas 3: query parameter
      const params = new URLSearchParams(window.location.search);
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
    : currentDomain === PLATFORM_DOMAIN;

  const isSchoolDomain = !isPlatformDomain;

  // Dapatkan data sekolah menggunakan data service
  useEffect(() => {
    const loadSchool = async () => {
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
