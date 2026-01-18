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

const SuperAdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isPlatformDomain, isSchoolDomain } = useDomain();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Redirect jika di domain sekolah - Super Admin hanya bisa diakses dari domain platform
  useEffect(() => {
    if (isSchoolDomain) {
      toast.error('Panel Super Admin hanya dapat diakses dari domain platform.');
      navigate('/');
    }
  }, [isSchoolDomain, navigate]);

  // Redirect jika belum login atau bukan super admin
  if (isSchoolDomain || !isAuthenticated || user?.role !== 'SUPER_ADMIN') {
    if (!isAuthenticated || user?.role !== 'SUPER_ADMIN') {
      return <Navigate to="/login" replace />;
    }
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/superadmin', icon: LayoutDashboard },
    { name: 'Kelola Sekolah', href: '/superadmin/schools', icon: Building2 },
    { name: 'Pendaftaran Sekolah', href: '/superadmin/registrations', icon: FileText },
    { name: 'Kelola Akun', href: '/superadmin/accounts', icon: Shield },
    { name: 'Kelola Domain', href: '/superadmin/domains', icon: Globe },
    { name: 'Statistik', href: '/superadmin/statistics', icon: BarChart3 },
    { name: 'Pengaturan', href: '/superadmin/settings', icon: Settings },
  ];

  const pendingRegistrations = getPendingSchoolRegistrations();
  const unreadCount = pendingRegistrations.length;

  const notifications = pendingRegistrations.slice(0, 3).map((reg, index) => ({
    id: reg.id,
    title: 'Sekolah baru mendaftar',
    message: `${reg.school_name} (${reg.level}) mengajukan pendaftaran`,
    time: `${index + 1} jam lalu`,
    unread: true
  }));

  const helpItems = [
    { icon: BookOpen, title: 'Dokumentasi', description: 'Panduan lengkap penggunaan platform' },
    { icon: MessageCircle, title: 'Live Chat', description: 'Hubungi tim support kami' },
    { icon: FileText, title: 'FAQ', description: 'Pertanyaan yang sering diajukan' },
  ];

  const isActive = (href: string) => {
    if (href === '/superadmin') {
      return location.pathname === '/superadmin';
    }
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Berhasil keluar dari sistem');
  };

  const handleProfileClick = () => {
    navigate('/superadmin/settings');
  };

  const handleSettingsClick = () => {
    navigate('/superadmin/settings');
  };

  const handleNotificationClick = (id: number) => {
    toast.info('Fitur notifikasi akan tersedia setelah integrasi database');
    setIsNotificationsOpen(false);
  };

  const handleHelpItemClick = (title: string) => {
    toast.info(`${title} akan tersedia segera`);
    setIsHelpDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen transition-transform bg-sidebar',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-sidebar-foreground">MaddaSoft</h1>
                <p className="text-xs text-sidebar-foreground/60">Super Admin</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Help */}
          <div className="p-4 border-t border-sidebar-border">
            <button 
              onClick={() => setIsHelpDialogOpen(true)}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Bantuan</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('transition-all', sidebarOpen ? 'ml-64' : 'ml-20')}>
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-semibold">
                {navigation.find(n => isActive(n.href))?.name || 'Dashboard'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifikasi</span>
                  <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                    Tandai semua dibaca
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notif) => (
                  <DropdownMenuItem 
                    key={notif.id} 
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                    onClick={() => handleNotificationClick(notif.id)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {notif.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                      <span className="font-medium text-sm">{notif.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{notif.message}</span>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary">
                  Lihat semua notifikasi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="w-4 h-4 mr-2" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Help Dialog */}
      <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Pusat Bantuan
            </DialogTitle>
            <DialogDescription>
              Pilih jenis bantuan yang Anda butuhkan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {helpItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleHelpItemClick(item.title)}
                className="w-full flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center">
              Butuh bantuan langsung? Hubungi{' '}
              <a href="mailto:support@maddasoft.id" className="text-primary hover:underline">
                support@maddasoft.id
              </a>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminLayout;
