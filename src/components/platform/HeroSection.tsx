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
    'Website Instan',
    'Admin Lengkap',
    'Gratis Hosting',
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
      <section id="hero" className="relative min-h-[70vh] flex items-center pt-20 pb-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="space-y-5 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold tracking-tight uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Platform Website Sekolah Modern
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
                Website Sekolah{' '}
                <span className="text-gradient">Profesional</span> Berstandar Nasional
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
                Solusi cerdas digitalisasi sekolah. Manajemen data siswa & pegawai dalam satu sistem terpadu yang elegan.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-sm bg-background/50 px-3 py-1 rounded-md border border-border shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="gap-2 px-8 rounded-xl font-bold border-2 border-primary shadow-lg shadow-primary/20" onClick={() => setIsRegisterDialogOpen(true)}>
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 rounded-xl font-bold border-2 hover:bg-accent/10" onClick={() => setIsDemoDialogOpen(true)}>
                  Lihat Demo
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 group">
                <div className="bg-card rounded-2xl shadow-2xl border-2 border-border/80 overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-500">
                  <div className="bg-muted p-2.5 flex items-center gap-2 border-b-2 border-border/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 text-center pr-10">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">sekolahanda.sch.id</span>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=750&fit=crop"
                    alt="Website Sekolah Preview"
                    className="w-full object-cover aspect-[16/10]"
                  />
                </div>
              </div>
              
              {/* Floating Elements - Sharpened */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-xl border-2 border-white/20 animate-float z-20">
                <p className="text-sm font-black italic tracking-tighter">100% ONLINE</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card px-5 py-3 rounded-xl shadow-2xl border-2 border-border z-20" style={{ animationDelay: '1s' }}>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Siswa</p>
                <p className="text-2xl font-black text-primary tracking-tighter leading-none">12,450+</p>
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
