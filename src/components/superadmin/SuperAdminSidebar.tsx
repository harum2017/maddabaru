import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { LayoutDashboard, Building2, FileText, Shield, Globe, BarChart3, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const SuperAdminSidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', href: '/domain-pusat/admin', icon: LayoutDashboard },
    { name: 'Kelola Sekolah', href: '/domain-pusat/admin/schools', icon: Building2 },
    { name: 'Pendaftaran Sekolah', href: '/domain-pusat/admin/registrations', icon: FileText },
    { name: 'Kelola Akun', href: '/domain-pusat/admin/accounts', icon: Shield },
    { name: 'Kelola Domain', href: '/domain-pusat/admin/domains', icon: Globe },
    { name: 'Statistik', href: '/domain-pusat/admin/statistics', icon: BarChart3 },
    { name: 'Pengaturan', href: '/domain-pusat/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Berhasil keluar dari sistem');
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">MaddaSoft</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Super Admin</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                    tooltip={item.name}
                  >
                    <a href={item.href} onClick={(e) => { e.preventDefault(); navigate(item.href); }}>
                      <item.icon />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SuperAdminSidebar;