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
      <section id="hero" className="relative min-h-[60vh] flex items-center pt-16 pb-8 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-4 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary border-2 border-white/20 rounded-lg text-primary-foreground text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-primary/20">
                <Sparkles className="w-3.5 h-3.5" />
                MaddaSoft Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-[-0.05em]">
                REVOLUSI <br/>
                <span className="text-gradient">WEBSITE</span> <br/>
                SEKOLAH
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-sm leading-tight font-bold tracking-tight">
                Manajemen data siswa & SIMPEG dalam satu sistem terpadu yang sangat presisi.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 text-[11px] bg-card px-2 py-0.5 rounded-sm border-2 border-border font-black uppercase tracking-tighter">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" className="h-12 gap-2 px-8 rounded-none font-black border-b-4 border-r-4 border-black/20 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-tight" onClick={() => setIsRegisterDialogOpen(true)}>
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-none font-black border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-tight" onClick={() => setIsDemoDialogOpen(true)}>
                  Lihat Demo
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative z-10 group">
                <div className="bg-card rounded-none shadow-[20px_20px_0px_0px_rgba(var(--primary),0.1)] border-4 border-black overflow-hidden">
                  <div className="bg-black p-2 flex items-center gap-2 border-b-4 border-black">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center pr-8">
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">SYSTEM_DASHBOARD</span>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200&h=750"
                    alt="Website Sekolah Preview"
                    className="w-full object-cover aspect-[16/10] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              
              {/* Floating Element - Sharpened */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-4 border-black z-20">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-80">Database Terintegrasi</p>
                <p className="text-3xl font-black tracking-tighter leading-none">12,450+</p>
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
