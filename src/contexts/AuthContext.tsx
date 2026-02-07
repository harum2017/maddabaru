import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { isDevMode, hasBackendCredentials } from '@/services/config';
import { getSupabaseClient } from '@/lib/supabase';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN_SEKOLAH' | 'OPERATOR';

export type Permission = 
  // School Management
  | 'view_school'
  | 'edit_school'
  | 'delete_school'
  
  // User Management
  | 'create_user'
  | 'view_users'
  | 'edit_user'
  | 'delete_user'
  
  // Content Management
  | 'create_post'
  | 'view_posts'
  | 'edit_post'
  | 'edit_own_post'
  | 'delete_post'
  | 'delete_own_post'
  
  // Gallery Management
  | 'create_gallery'
  | 'view_gallery'
  | 'edit_gallery'
  | 'edit_own_gallery'
  | 'delete_gallery'
  | 'delete_own_gallery'
  
  // Settings
  | 'manage_settings'
  | 'manage_branding'
  | 'manage_permissions';

interface AuthUser {
  id: number | string;
  email: string;
  name: string;
  role: UserRole;
  schoolId?: number;
  permissions: Permission[];
}

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
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

// Permission mappings for different roles
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    'view_school', 'edit_school', 'delete_school',
    'create_user', 'view_users', 'edit_user', 'delete_user',
    'create_post', 'view_posts', 'edit_post', 'delete_post',
    'create_gallery', 'view_gallery', 'edit_gallery', 'delete_gallery',
    'manage_settings', 'manage_branding', 'manage_permissions'
  ],
  ADMIN_SEKOLAH: [
    'view_school', 'edit_school',
    'create_user', 'view_users', 'edit_user', 'delete_user',
    'create_post', 'view_posts', 'edit_post', 'delete_post',
    'create_gallery', 'view_gallery', 'edit_gallery', 'delete_gallery',
    'manage_settings', 'manage_branding'
  ],
  OPERATOR: [
    'view_posts', 'create_post', 'edit_own_post', 'delete_own_post',
    'view_gallery', 'create_gallery', 'edit_own_gallery', 'delete_own_gallery'
  ]
};

// Map Supabase role to app role
const mapSupabaseRole = (role: string): UserRole => {
  switch (role) {
    case 'super_admin':
      return 'SUPER_ADMIN';
    case 'admin_sekolah':
      return 'ADMIN_SEKOLAH';
    case 'operator':
      return 'OPERATOR';
    default:
      return 'OPERATOR';
  }
};

// ============================================
// DEV MODE ONLY - Dummy users for development
// ============================================
const getDummyUsers = () => {
  // Only return dummy users in DEV mode
  if (!isDevMode()) {
    return [];
  }
  
  return [
    // Super Admin - Full access ke semua
    {
      email: 'superadmin@maddasoft.id',
      password: 'admin123',
      user: { 
        id: 1, 
        email: 'superadmin@maddasoft.id', 
        name: 'Super Administrator', 
        role: 'SUPER_ADMIN' as UserRole,
        permissions: ROLE_PERMISSIONS.SUPER_ADMIN
      }
    },
    
    // Sekolah 1 - SMA Negeri 1 Nusantara
    {
      email: 'admin@sman1nusantara.sch.id',
      password: 'admin123',
      user: { 
        id: 2, 
        email: 'admin@sman1nusantara.sch.id', 
        name: 'Dra. Siti Aminah, M.Pd.', 
        role: 'ADMIN_SEKOLAH' as UserRole, 
        schoolId: 1,
        permissions: ROLE_PERMISSIONS.ADMIN_SEKOLAH
      }
    },
    {
      email: 'operator@sman1nusantara.sch.id',
      password: 'admin123',
      user: { 
        id: 3, 
        email: 'operator@sman1nusantara.sch.id', 
        name: 'Rudi Hermawan', 
        role: 'OPERATOR' as UserRole, 
        schoolId: 1,
        permissions: ROLE_PERMISSIONS.OPERATOR
      }
    },
    
    // Sekolah 2 - SMK Teknologi Merdeka
    {
      email: 'admin@smkteknologimerdeka.sch.id',
      password: 'admin123',
      user: { 
        id: 4, 
        email: 'admin@smkteknologimerdeka.sch.id', 
        name: 'Ir. Bambang Hermawan, M.T.', 
        role: 'ADMIN_SEKOLAH' as UserRole, 
        schoolId: 2,
        permissions: ROLE_PERMISSIONS.ADMIN_SEKOLAH
      }
    },
    {
      email: 'operator@smkteknologimerdeka.sch.id',
      password: 'admin123',
      user: { 
        id: 5, 
        email: 'operator@smkteknologimerdeka.sch.id', 
        name: 'Dewi Kartika', 
        role: 'OPERATOR' as UserRole, 
        schoolId: 2,
        permissions: ROLE_PERMISSIONS.OPERATOR
      }
    },
    
    // Sekolah 3 - SMP Harapan Bangsa
    {
      email: 'admin@smpharapanbangsa.sch.id',
      password: 'admin123',
      user: { 
        id: 6, 
        email: 'admin@smpharapanbangsa.sch.id', 
        name: 'Drs. Hendra Wijaya, M.M.', 
        role: 'ADMIN_SEKOLAH' as UserRole, 
        schoolId: 3,
        permissions: ROLE_PERMISSIONS.ADMIN_SEKOLAH
      }
    },
    {
      email: 'operator@smpharapanbangsa.sch.id',
      password: 'admin123',
      user: { 
        id: 7, 
        email: 'operator@smpharapanbangsa.sch.id', 
        name: 'Putri Rahayu', 
        role: 'OPERATOR' as UserRole, 
        schoolId: 3,
        permissions: ROLE_PERMISSIONS.OPERATOR
      }
    },
    
    // Sekolah 4 - SD Negeri Cendekia
    {
      email: 'admin@sdncendekia.sch.id',
      password: 'admin123',
      user: { 
        id: 8, 
        email: 'admin@sdncendekia.sch.id', 
        name: 'Dra. Kartini Dewi, M.Pd.', 
        role: 'ADMIN_SEKOLAH' as UserRole, 
        schoolId: 4,
        permissions: ROLE_PERMISSIONS.ADMIN_SEKOLAH
      }
    },
    {
      email: 'operator@sdncendekia.sch.id',
      password: 'admin123',
      user: { 
        id: 9, 
        email: 'operator@sdncendekia.sch.id', 
        name: 'Wati Lestari', 
        role: 'OPERATOR' as UserRole, 
        schoolId: 4,
        permissions: ROLE_PERMISSIONS.OPERATOR
      }
    },
  ];
};

// Export for dev mode hints in login pages - ONLY returns data in DEV mode
export const getDummyUsersBySchoolId = (schoolId: number) => {
  if (!isDevMode()) {
    return [];
  }
  
  return getDummyUsers()
    .filter(u => u.user.schoolId === schoolId)
    .map(u => ({
      email: u.email,
      role: u.user.role,
      name: u.user.name
    }));
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    if (isDevMode()) {
      // DEV mode: restore from localStorage
      const saved = localStorage.getItem('auth_user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          localStorage.removeItem('auth_user');
        }
      }
      setIsLoading(false);
    } else {
      // PROD mode: use backend auth (loaded lazily)
      let isCancelled = false;
      let unsubscribe: (() => void) | null = null;

      (async () => {
        const supabase = await getSupabaseClient();
        if (isCancelled) return;

        // If credentials are missing, avoid crashing and just behave as logged out.
        if (!supabase) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Set up auth state listener FIRST
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session?.user) {
              // Defer profile/role fetch to avoid deadlock
              setTimeout(() => {
                fetchUserProfile(session.user.id);
              }, 0);
            } else {
              setUser(null);
              setIsLoading(false);
            }
          }
        );
        unsubscribe = () => subscription.unsubscribe();

        // THEN check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (isCancelled) return;

        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setIsLoading(false);
        }
      })();

      return () => {
        isCancelled = true;
        unsubscribe?.();
      };
    }
  }, []);

  // Fetch user profile and role from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Fetch user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const appRole = mapSupabaseRole(roleData.role);
      
      const authUser: AuthUser = {
        id: userId,
        email: profile.email,
        name: profile.name,
        role: appRole,
        schoolId: profile.school_id || undefined,
        permissions: ROLE_PERMISSIONS[appRole]
      };

      setUser(authUser);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUser(null);
      setIsLoading(false);
    }
  };

  const login = async (
    email: string, 
    password: string, 
    role?: UserRole,
    expectedSchoolId?: number
  ): Promise<LoginResult> => {
    if (isDevMode()) {
      // DEV mode: use dummy users
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dummyUsers = getDummyUsers();
      const found = dummyUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!found) {
        return { success: false, message: 'Email atau password salah' };
      }

      // Validate role if specified
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

      // Validate school if specified
      if (expectedSchoolId && found.user.schoolId !== expectedSchoolId) {
        return { 
          success: false, 
          message: 'Akun ini tidak terdaftar di sekolah ini' 
        };
      }

      setUser(found.user);
      localStorage.setItem('auth_user', JSON.stringify(found.user));
      return { success: true };
    } else {
      // PROD mode: use Supabase auth
      try {
        const supabase = await getSupabaseClient();
        if (!supabase) {
          return { success: false, message: 'Backend belum terkonfigurasi' };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          return { success: false, message: error.message };
        }

        if (!data.user) {
          return { success: false, message: 'Login gagal' };
        }

        // Fetch role and validate
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (roleError || !roleData) {
          await supabase.auth.signOut();
          return { success: false, message: 'Akun tidak memiliki role yang valid' };
        }

        const userRole = mapSupabaseRole(roleData.role);

        // Validate role if specified
        if (role && userRole !== role) {
          await supabase.auth.signOut();
          return { success: false, message: `Akun ini bukan ${role.replace('_', ' ')}` };
        }

        // Fetch profile to validate school
        const { data: profile } = await supabase
          .from('profiles')
          .select('school_id')
          .eq('id', data.user.id)
          .single();

        // Validate school if specified
        if (expectedSchoolId && profile?.school_id !== expectedSchoolId) {
          await supabase.auth.signOut();
          return { 
            success: false, 
            message: 'Akun ini tidak terdaftar di sekolah ini' 
          };
        }

        // Profile will be fetched by auth state listener
        return { success: true };
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Terjadi kesalahan saat login' };
      }
    }
  };

  const logout = async () => {
    if (isDevMode()) {
      setUser(null);
      localStorage.removeItem('auth_user');
    } else {
      const supabase = await getSupabaseClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
