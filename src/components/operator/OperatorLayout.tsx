import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { 
  LayoutDashboard, FileText, Image, Newspaper,
  LogOut, Menu, X, Bell, HelpCircle, ChevronDown, Edit
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
  { icon: LayoutDashboard, label: 'Dashboard', path: '/operator' },
  { icon: Newspaper, label: 'Kelola Berita', path: '/operator/news' },
  { icon: Image, label: 'Kelola Galeri', path: '/operator/gallery' },
  { icon: FileText, label: 'Kelola Halaman', path: '/operator/pages' },
];

const OperatorLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { currentSchool } = useDomain();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Redirect jika belum login, bukan operator, atau tidak di domain sekolah
  React.useEffect(() => {
    // Harus di domain sekolah (currentSchool ada)
    if (!currentSchool) {
      navigate('/');
      return;
    }
    
    if (!isAuthenticated) {
      navigate('/school-login');
    } else if (user?.role !== 'OPERATOR') {
      toast.error('Akses ditolak. Anda bukan Operator.');
      navigate('/');
    } else if (user?.schoolId !== currentSchool.id) {
      // Validasi schoolId harus cocok dengan domain sekolah saat ini
      toast.error('Akses ditolak. Anda tidak terdaftar di sekolah ini.');
      navigate('/school-login');
    }
  }, [isAuthenticated, user, navigate, currentSchool]);

  const handleLogout = () => {
    logout();
    navigate('/school-login');
    toast.success('Berhasil logout');
  };

  if (!currentSchool || !isAuthenticated || user?.role !== 'OPERATOR' || user?.schoolId !== currentSchool.id) {
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
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="font-semibold text-sm">Panel Operator</span>
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
                    ? 'bg-secondary text-secondary-foreground' 
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
            <h1 className="font-semibold text-lg hidden sm:block">Panel Operator</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <p className="font-semibold">Notifikasi</p>
                </div>
                <div className="p-3 hover:bg-accent cursor-pointer">
                  <p className="text-sm font-medium">Berita baru berhasil dipublikasikan</p>
                  <p className="text-xs text-muted-foreground">10 menit yang lalu</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                      {user?.name?.charAt(0) || 'O'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm">{user?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
            <DialogTitle>Bantuan Panel Operator</DialogTitle>
            <DialogDescription>
              Panduan penggunaan panel operator konten
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Dashboard</h4>
              <p className="text-muted-foreground">Lihat ringkasan konten dan aktivitas terbaru.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Kelola Berita</h4>
              <p className="text-muted-foreground">Buat, edit, dan publikasikan berita sekolah.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Kelola Galeri</h4>
              <p className="text-muted-foreground">Upload dan atur foto galeri sekolah.</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Kelola Halaman</h4>
              <p className="text-muted-foreground">Edit konten halaman statis website.</p>
            </div>
            <div className="p-3 bg-accent rounded-lg border border-accent-foreground/20">
              <h4 className="font-medium mb-1">⚠️ Catatan Penting</h4>
              <p className="text-muted-foreground">
                Operator hanya dapat mengelola konten publik. 
                Untuk akses data internal, hubungi Admin Sekolah.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperatorLayout;
