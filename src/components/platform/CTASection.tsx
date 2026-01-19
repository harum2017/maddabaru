import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
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

const CTASection: React.FC = () => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1x24 jam.');
    setIsRegisterDialogOpen(false);
  };

  const handlePhoneClick = () => {
    window.open('tel:+622112345678', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@maddasoft.id', '_self');
  };

  const handleMapsClick = () => {
    window.open('https://maps.google.com/?q=Jl.+Teknologi+No.+123+Jakarta+Selatan', '_blank');
  };

  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-primary rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden border-4 border-white/10 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">
              Siap Melangkah Ke Masa Depan Digital?
            </h2>
            <p className="text-lg text-primary-foreground/90 font-medium leading-relaxed">
              Bergabunglah dengan ratusan sekolah yang telah bertransformasi bersama MaddaSoft. 
              Website sekolah Anda hanya berjarak beberapa klik.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsRegisterDialogOpen(true)}
                className="inline-flex items-center justify-center min-h-10 px-8 rounded-xl bg-secondary text-primary font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Mulai Sekarang
              </button>
              <button 
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center min-h-10 px-8 rounded-xl border-2 border-white/20 bg-transparent text-white font-black hover:bg-white/10 active:scale-95 transition-all"
              >
                Konsultasi Gratis
              </button>
            </div>
          </div>
        </div>
      </div>

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
              <Label htmlFor="cta-school-name">Nama Sekolah</Label>
              <Input id="cta-school-name" placeholder="SMA Negeri 1 Contoh" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-contact-name">Nama Penanggung Jawab</Label>
              <Input id="cta-contact-name" placeholder="Dr. Budi Santoso" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-contact-email">Email</Label>
              <Input id="cta-contact-email" type="email" placeholder="admin@sekolah.sch.id" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-contact-phone">Nomor Telepon</Label>
              <Input id="cta-contact-phone" placeholder="08123456789" required />
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
    </section>
  );
};

export default CTASection;