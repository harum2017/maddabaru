import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { 
  LayoutDashboard, Users, GraduationCap, FileText, 
  Image, Settings, LogOut, Menu, X, Bell, 
  HelpCircle, ChevronDown, UserCog, School, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Manajemen Pegawai', path: '/admin/staff' },
  { icon: GraduationCap, label: 'Manajemen Siswa', path: '/admin/students' },
  { icon: BookOpen, label: 'Manajemen Kelas', path: '/admin/classes' },
  { icon: UserCog, label: 'Manajemen Operator', path: '/admin/operators' },
  { icon: FileText, label: 'Konten Publik', path: '/admin/content' },
  { icon: Image, label: 'Galeri', path: '/admin/gallery' },
  { icon: Settings, label: 'Pengaturan', path: '/admin/settings' },
];

const SchoolAdminLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { currentSchool } = useDomain();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Redirect jika belum login, bukan admin sekolah, atau tidak di domain sekolah
  React.useEffect(() => {
    // Harus di domain sekolah (currentSchool ada)
    if (!currentSchool) {
      navigate('/');
      return;
    }
    
    if (!isAuthenticated) {
      navigate('/school-login', { replace: true });
    } else if (user?.role === 'OPERATOR') {
      // OPERATOR tidak boleh akses admin sekolah
      toast.error('Akses ditolak. Operator tidak dapat mengakses panel admin sekolah.');
      navigate('/operator', { replace: true });
    } else if (user?.role !== 'ADMIN_SEKOLAH') {
      // Role lain juga tidak diperbolehkan
      toast.error('Akses ditolak. Anda bukan Admin Sekolah.');
      navigate('/', { replace: true });
    } else if (user?.schoolId !== currentSchool.id) {
      // Validasi schoolId harus cocok dengan domain sekolah saat ini
      toast.error('Akses ditolak. Anda tidak terdaftar di sekolah ini.');
      navigate('/school-login', { replace: true });
    }
  }, [isAuthenticated, user, navigate, currentSchool]);

  const handleLogout = () => {
    logout();
    navigate('/school-login');
    toast.success('Berhasil logout');
  };

  if (!currentSchool || !isAuthenticated || user?.role !== 'ADMIN_SEKOLAH' || user?.schoolId !== currentSchool.id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">Admin Sekolah</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* School Info */}
        <div className="p-4 border-b">
          <p className="text-xs text-muted-foreground">Sekolah</p>
          <p className="font-medium text-sm truncate">
            {currentSchool?.name || 'SMA Negeri 1 Nusantara'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Help Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={() => setHelpOpen(true)}
          >
            <HelpCircle className="w-4 h-4" />
            Bantuan
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-lg hidden sm:block">Panel Admin Sekolah</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <p className="font-semibold">Notifikasi</p>
                </div>
                <div className="p-3 hover:bg-accent cursor-pointer">
                  <p className="text-sm font-medium">Operator baru menunggu persetujuan</p>
                  <p className="text-xs text-muted-foreground">5 menit yang lalu</p>
                </div>
                <div className="p-3 hover:bg-accent cursor-pointer">
                  <p className="text-sm font-medium">Data siswa berhasil diimpor</p>
                  <p className="text-xs text-muted-foreground">1 jam yang lalu</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">{user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
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
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Bantuan Panel Admin Sekolah</DialogTitle>
            <DialogDescription>
              Panduan penggunaan panel administrasi sekolah
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Dashboard</h4>
              <p className="text-muted-foreground">Lihat ringkasan data sekolah dan statistik.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Manajemen Pegawai</h4>
              <p className="text-muted-foreground">Kelola data guru dan tenaga kependidikan.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Manajemen Siswa</h4>
              <p className="text-muted-foreground">Kelola data siswa.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Manajemen Kelas</h4>
              <p className="text-muted-foreground">Kelola rombongan belajar (rombel) per tingkat kelas.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Manajemen Operator</h4>
              <p className="text-muted-foreground">Tambah dan kelola akses operator konten.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Konten Publik</h4>
              <p className="text-muted-foreground">Tentukan konten yang tampil di website publik.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolAdminLayout;
