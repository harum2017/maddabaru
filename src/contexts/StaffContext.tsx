import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { staff as initialStaff, Staff } from '@/data/dummyData';

interface StaffContextType {
  staffList: Staff[];
  getStaffBySchool: (schoolId: number) => Staff[];
  updateStaff: (id: number, data: Partial<Staff>) => void;
  addStaff: (staff: Staff) => void;
  deleteStaff: (id: number) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);

  const getStaffBySchool = useCallback((schoolId: number): Staff[] => {
    return staffList.filter(s => s.school_id === schoolId && s.is_public);
  }, [staffList]);

  const updateStaff = useCallback((id: number, data: Partial<Staff>) => {
    setStaffList(prev => prev.map(s => 
      s.id === id ? { ...s, ...data } : s
    ));
  }, []);

  const addStaff = useCallback((staff: Staff) => {
    setStaffList(prev => [staff, ...prev]);
  }, []);

  const deleteStaff = useCallback((id: number) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  }, []);

  return (
    <StaffContext.Provider value={{ 
      staffList, 
      getStaffBySchool, 
      updateStaff, 
      addStaff, 
      deleteStaff 
    }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (context === undefined) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
