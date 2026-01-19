import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PlatformHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Tentang', href: '#about' },
    { label: 'Sekolah', href: '#schools' },
    { label: 'Fitur', href: '#features' },
    { label: 'Kontak', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/domain-pusat/login');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1x24 jam.');
    setIsRegisterDialogOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('#hero')}>
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MaddaSoft</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" className="font-medium" onClick={handleLogin}>
                Masuk
              </Button>
              <Button className="font-medium" onClick={() => setIsRegisterDialogOpen(true)}>
                Daftar Sekolah
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 text-left text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col gap-2 pt-4 px-4">
                  <Button variant="outline" className="w-full" onClick={handleLogin}>
                    Masuk
                  </Button>
                  <Button className="w-full" onClick={() => setIsRegisterDialogOpen(true)}>
                    Daftar Sekolah
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Register Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Daftar Sekolah Baru</DialogTitle>
            <DialogDescription>
              Lengkapi data berikut untuk mendaftarkan sekolah Anda. Tim kami akan menghubungi Anda dalam 1x24 jam.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">Nama Sekolah</Label>
              <Input id="school-name" placeholder="SMA Negeri 1 Contoh" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nama Penanggung Jawab</Label>
              <Input id="contact-name" placeholder="Dr. Budi Santoso" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" placeholder="admin@sekolah.sch.id" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Nomor Telepon</Label>
              <Input id="contact-phone" placeholder="08123456789" required />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsRegisterDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Daftar Sekarang
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlatformHeader;
