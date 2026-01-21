import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  GraduationCap,
  LayoutDashboard,
  Building2,
  Globe,
  BarChart3,
  Settings,
  LogOut,
  User,
  Menu,
  HelpCircle,
  Bell,
  X,
  BookOpen,
  MessageCircle,
  FileText,
  Shield
} from 'lucide-react';
import { getPendingSchoolRegistrations } from '@/data/dummyData';
import SuperAdminSidebar from './SuperAdminSidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from '../ThemeToggle';

const SuperAdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isPlatformDomain, isSchoolDomain } = useDomain();
  const location = useLocation();
  const navigate = useNavigate();

  // Guard: Harus login sebagai SUPER_ADMIN dan berada di platform domain
  useEffect(() => {
    if (isSchoolDomain) {
      toast.error('Panel Super Admin hanya dapat diakses dari domain platform.');
      navigate('/');
      return;
    }

    if (!isAuthenticated) {
      navigate('/domain-pusat/login', { replace: true });
    } else if (user?.role !== 'SUPER_ADMIN') {
      const roleMsg = user?.role === 'ADMIN_SEKOLAH' ? 'Admin sekolah' : 
                     user?.role === 'OPERATOR' ? 'Operator' : 'User';
      toast.error(`Akses ditolak. ${roleMsg} tidak dapat mengakses panel super admin.`);
      
      if (user?.role === 'ADMIN_SEKOLAH') navigate('/admin', { replace: true });
      else if (user?.role === 'OPERATOR') navigate('/operator', { replace: true });
      else navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, isSchoolDomain, navigate]);

  // Guard render
  if (isSchoolDomain || !isAuthenticated || user?.role !== 'SUPER_ADMIN') {
    return null;
  }

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <SuperAdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-card shrink-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover-elevate" />
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-bold tracking-tight text-muted-foreground uppercase">Platform_Central</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-muted/30 p-6 custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;
