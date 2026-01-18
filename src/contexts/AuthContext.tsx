import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN_SEKOLAH' | 'OPERATOR';

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  schoolId?: number;
}

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole, schoolId?: number) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Dummy users untuk development
const DUMMY_USERS: { email: string; password: string; user: AuthUser }[] = [
  // Super Admin
  {
    email: 'superadmin@maddasoft.id',
    password: 'admin123',
    user: { id: 1, email: 'superadmin@maddasoft.id', name: 'Super Administrator', role: 'SUPER_ADMIN' }
  },
  // Sekolah 1 - SMA Negeri 1 Nusantara
  {
    email: 'admin@sman1nusantara.sch.id',
    password: 'admin123',
    user: { id: 2, email: 'admin@sman1nusantara.sch.id', name: 'Dra. Siti Aminah, M.Pd.', role: 'ADMIN_SEKOLAH', schoolId: 1 }
  },
  {
    email: 'operator@sman1nusantara.sch.id',
    password: 'admin123',
    user: { id: 3, email: 'operator@sman1nusantara.sch.id', name: 'Rudi Hermawan', role: 'OPERATOR', schoolId: 1 }
  },
  // Sekolah 2 - SMK Teknologi Merdeka
  {
    email: 'admin@smkteknologimerdeka.sch.id',
    password: 'admin123',
    user: { id: 4, email: 'admin@smkteknologimerdeka.sch.id', name: 'Ir. Bambang Hermawan, M.T.', role: 'ADMIN_SEKOLAH', schoolId: 2 }
  },
  {
    email: 'operator@smkteknologimerdeka.sch.id',
    password: 'admin123',
    user: { id: 5, email: 'operator@smkteknologimerdeka.sch.id', name: 'Dewi Kartika', role: 'OPERATOR', schoolId: 2 }
  },
  // Sekolah 3 - SMP Harapan Bangsa
  {
    email: 'admin@smpharapanbangsa.sch.id',
    password: 'admin123',
    user: { id: 6, email: 'admin@smpharapanbangsa.sch.id', name: 'Drs. Hendra Wijaya, M.M.', role: 'ADMIN_SEKOLAH', schoolId: 3 }
  },
  {
    email: 'operator@smpharapanbangsa.sch.id',
    password: 'admin123',
    user: { id: 7, email: 'operator@smpharapanbangsa.sch.id', name: 'Putri Rahayu', role: 'OPERATOR', schoolId: 3 }
  },
  // Sekolah 4 - SD Negeri Cendekia
  {
    email: 'admin@sdncendekia.sch.id',
    password: 'admin123',
    user: { id: 8, email: 'admin@sdncendekia.sch.id', name: 'Dra. Kartini Dewi, M.Pd.', role: 'ADMIN_SEKOLAH', schoolId: 4 }
  },
  {
    email: 'operator@sdncendekia.sch.id',
    password: 'admin123',
    user: { id: 9, email: 'operator@sdncendekia.sch.id', name: 'Wati Lestari', role: 'OPERATOR', schoolId: 4 }
  },
];

// Export untuk digunakan di komponen lain (dev mode hints)
export const getDummyUsersBySchoolId = (schoolId: number) => {
  return DUMMY_USERS.filter(u => u.user.schoolId === schoolId).map(u => ({
    email: u.email,
    role: u.user.role,
    name: u.user.name
  }));
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (
    email: string, 
    password: string, 
    role?: UserRole,
    expectedSchoolId?: number
  ): Promise<LoginResult> => {
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Cari user berdasarkan email dan password
    const found = DUMMY_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!found) {
      return { success: false, message: 'Email atau password salah' };
    }

    // Jika role ditentukan, validasi role harus cocok
    if (role && found.user.role !== role) {
      if (role === 'ADMIN_SEKOLAH') {
        return { success: false, message: 'Akun ini bukan Admin Sekolah' };
      } else if (role === 'OPERATOR') {
        return { success: false, message: 'Akun ini bukan Operator' };
      } else if (role === 'SUPER_ADMIN') {
        return { success: false, message: 'Akun ini bukan Super Admin' };
      }
      return { success: false, message: 'Role tidak sesuai' };
    }

    // Jika login dari domain sekolah, validasi schoolId harus cocok
    if (expectedSchoolId && found.user.schoolId !== expectedSchoolId) {
      return { 
        success: false, 
        message: 'Akun ini tidak terdaftar di sekolah ini' 
      };
    }

    setUser(found.user);
    localStorage.setItem('auth_user', JSON.stringify(found.user));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
