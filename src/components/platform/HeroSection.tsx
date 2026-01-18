import React, { useState } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
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
import { schools } from '@/data/dummyData';

const HeroSection: React.FC = () => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);
  const { setSimulatedSchoolId } = useDomain();

  const features = [
    'Website Profesional Instan',
    'Panel Admin Lengkap',
    'Tanpa Biaya Hosting',
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1x24 jam.');
    setIsRegisterDialogOpen(false);
  };

  const handleViewDemo = (schoolId: number) => {
    setSimulatedSchoolId(schoolId);
    setIsDemoDialogOpen(false);
    toast.success('Mode demo aktif! Anda sekarang melihat website sekolah.');
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Platform Website Sekolah Terpadu
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Buat Website Sekolah{' '}
                <span className="text-gradient">Profesional Tanpa Ribet</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Platform all-in-one untuk mengelola website sekolah paling lengkap
              </p>
              
              <div className="flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2 text-base px-8" onClick={() => setIsRegisterDialogOpen(true)}>
                  Daftar Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-base px-8" onClick={() => setIsDemoDialogOpen(true)}>
                  Lihat Demo
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                ✨ Sudah digunakan oleh <span className="text-primary font-semibold">500+</span> sekolah di Indonesia
              </p>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10">
                <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                  <div className="bg-muted p-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/60" />
                      <div className="w-3 h-3 rounded-full bg-warning/60" />
                      <div className="w-3 h-3 rounded-full bg-accent/60" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-muted-foreground">sekolahanda.sch.id</span>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop"
                    alt="Website Sekolah Preview"
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg animate-float">
                <p className="text-sm font-semibold">🎓 100% Online</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card px-4 py-3 rounded-lg shadow-lg border border-border" style={{ animationDelay: '1s' }}>
                <p className="text-xs text-muted-foreground">Siswa Terdaftar</p>
                <p className="text-xl font-bold text-primary">12,450+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Label htmlFor="hero-school-name">Nama Sekolah</Label>
              <Input id="hero-school-name" placeholder="SMA Negeri 1 Contoh" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-contact-name">Nama Penanggung Jawab</Label>
              <Input id="hero-contact-name" placeholder="Dr. Budi Santoso" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-contact-email">Email</Label>
              <Input id="hero-contact-email" type="email" placeholder="admin@sekolah.sch.id" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-contact-phone">Nomor Telepon</Label>
              <Input id="hero-contact-phone" placeholder="08123456789" required />
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

      {/* Demo Dialog */}
      <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pilih Demo Website Sekolah</DialogTitle>
            <DialogDescription>
              Pilih salah satu sekolah untuk melihat demo website. Anda dapat kembali ke halaman platform melalui toggle di kanan bawah.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => handleViewDemo(school.id)}
                className="w-full flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: `${school.theme_color}15`,
                    color: school.theme_color
                  }}
                >
                  {school.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{school.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{school.domain}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeroSection;
