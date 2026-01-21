import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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

export interface PermissionContextType {
  // User info
  userRole: string;
  schoolId: number | null;
  permissions: Permission[];
  
  // Permission checking methods
  hasPermission(permission: Permission): boolean;
  canCreate(resource: 'post' | 'gallery' | 'user'): boolean;
  canEdit(resource: 'post' | 'gallery' | 'user', resourceOwnerId?: number): boolean;
  canDelete(resource: 'post' | 'gallery' | 'user', resourceOwnerId?: number): boolean;
  canManageUsers(): boolean;
  canManageSchool(): boolean;
  canManageSettings(): boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const { user } = useAuth();

  // Get permissions from user (atau default kosong jika belum login)
  const permissions = user?.permissions || [];
  const userRole = user?.role || '';
  const schoolId = user?.schoolId || null;

  // Helper: Check if user has specific permission
  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  // Helper: Can create resource
  const canCreate = (resource: 'post' | 'gallery' | 'user'): boolean => {
    switch (resource) {
      case 'post':
        return hasPermission('create_post');
      case 'gallery':
        return hasPermission('create_gallery');
      case 'user':
        return hasPermission('create_user');
      default:
        return false;
    }
  };

  // Helper: Can edit resource
  const canEdit = (resource: 'post' | 'gallery' | 'user', resourceOwnerId?: number): boolean => {
    const currentUserId = user?.id;

    switch (resource) {
      case 'post':
        // Full edit permission
        if (hasPermission('edit_post')) return true;
        // Edit own post only
        if (hasPermission('edit_own_post') && resourceOwnerId === currentUserId) return true;
        return false;

      case 'gallery':
        // Full edit permission
        if (hasPermission('edit_gallery')) return true;
        // Edit own gallery only
        if (hasPermission('edit_own_gallery') && resourceOwnerId === currentUserId) return true;
        return false;

      case 'user':
        return hasPermission('edit_user');

      default:
        return false;
    }
  };

  // Helper: Can delete resource
  const canDelete = (resource: 'post' | 'gallery' | 'user', resourceOwnerId?: number): boolean => {
    const currentUserId = user?.id;

    switch (resource) {
      case 'post':
        // Full delete permission
        if (hasPermission('delete_post')) return true;
        // Delete own post only
        if (hasPermission('delete_own_post') && resourceOwnerId === currentUserId) return true;
        return false;

      case 'gallery':
        // Full delete permission
        if (hasPermission('delete_gallery')) return true;
        // Delete own gallery only
        if (hasPermission('delete_own_gallery') && resourceOwnerId === currentUserId) return true;
        return false;

      case 'user':
        return hasPermission('delete_user');

      default:
        return false;
    }
  };

  // Helper: Can manage users
  const canManageUsers = (): boolean => {
    return hasPermission('create_user') && hasPermission('edit_user') && hasPermission('delete_user');
  };

  // Helper: Can manage school
  const canManageSchool = (): boolean => {
    return hasPermission('edit_school') && hasPermission('manage_settings');
  };

  // Helper: Can manage settings
  const canManageSettings = (): boolean => {
    return hasPermission('manage_settings');
  };

  const value: PermissionContextType = {
    userRole,
    schoolId,
    permissions,
    hasPermission,
    canCreate,
    canEdit,
    canDelete,
    canManageUsers,
    canManageSchool,
    canManageSettings,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};
