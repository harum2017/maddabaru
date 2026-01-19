import React, { useState } from 'react';
import { getActiveSchools } from '@/data/dummyData';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, ArrowRight } from 'lucide-react';
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

const SchoolsSection: React.FC = () => {
  // Real schools only - filtering out demo or simulated entries
  const schools = getActiveSchools().filter(s => s.is_active && !s.name.toLowerCase().includes('demo'));
  const { setSimulatedSchoolId } = useDomain();
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const handleVisitWebsite = (schoolId: number) => {
    setSimulatedSchoolId(schoolId);
    toast.success('Mode simulasi aktif! Anda sekarang melihat website sekolah.');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1x24 jam.');
    setIsRegisterDialogOpen(false);
  };

  return (
    <>
      <section id="schools" className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2">VERIFIED_INSTITUTIONS</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter leading-none uppercase">
              SEKOLAH <span className="text-gradient">TERDAFTAR</span>
            </h3>
            <p className="text-sm text-muted-foreground font-bold tracking-tight uppercase">
              Institusi pendidikan yang telah resmi bermigrasi ke ekosistem digital MaddaSoft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school, index) => (
              <div 
                key={school.id}
                className="bg-white rounded-none border-4 border-black overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="h-28 relative overflow-hidden border-b-4 border-black"
                  style={{ 
                    backgroundColor: school.theme_color
                  }}
                >
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-none border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-3 transition-transform">
                      <span className="text-2xl font-black" style={{ color: school.theme_color }}>
                        {school.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-black mb-1 line-clamp-1 uppercase tracking-tighter">{school.name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                      <MapPin className="w-3 h-3 flex-shrink-0 text-primary" />
                      <span className="line-clamp-1">{school.address.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-4">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <span className="text-primary font-black uppercase tracking-tighter">{school.domain}</span>
                  </div>

                  <Button 
                    variant="default" 
                    className="w-full rounded-none h-10 font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                    onClick={() => handleVisitWebsite(school.id)}
                  >
                    Masuk Portofolio
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
            
            {/* CTA Card - Brutalist style */}
            <div className="bg-primary p-6 rounded-none border-4 border-black flex flex-col items-center justify-center text-center min-h-[280px] shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] group">
              <div className="w-16 h-16 rounded-none bg-white border-4 border-black flex items-center justify-center mb-4 group-hover:-rotate-3 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-3xl font-black">🏫</span>
              </div>
              <h3 className="text-lg font-black text-white mb-2 uppercase tracking-tighter leading-none">SEKOLAH ANDA <br/>BELUM TERDAFTAR?</h3>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-tighter leading-tight mb-4 max-w-[200px]">
                Daftarkan sekolah Anda sekarang untuk bergabung dalam ekosistem eksklusif kami.
              </p>
              <Button 
                onClick={() => setIsRegisterDialogOpen(true)}
                className="bg-white text-black hover:bg-white/90 rounded-none border-4 border-black font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                GABUNG SEKARANG
              </Button>
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
              <Label htmlFor="schools-school-name">Nama Sekolah</Label>
              <Input id="schools-school-name" placeholder="SMA Negeri 1 Contoh" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schools-contact-name">Nama Penanggung Jawab</Label>
              <Input id="schools-contact-name" placeholder="Dr. Budi Santoso" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schools-contact-email">Email</Label>
              <Input id="schools-contact-email" type="email" placeholder="admin@sekolah.sch.id" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schools-contact-phone">Nomor Telepon</Label>
              <Input id="schools-contact-phone" placeholder="08123456789" required />
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

export default SchoolsSection;
