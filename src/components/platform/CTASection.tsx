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
    <section id="contact" className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-black p-8 md:p-12 text-center relative overflow-hidden border-[6px] border-black shadow-[20px_20px_0px_0px_rgba(var(--primary),0.2)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-50" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">
              SEGERA <br/> BERGABUNG
            </h2>
            <p className="text-sm text-white/70 font-black uppercase tracking-tighter leading-tight">
              Website sekolah Anda hanya berjarak beberapa klik. Partner transformasi digital paling tajam.
            </p>
            <div className="flex justify-center pt-2">
              <button 
                onClick={() => setIsRegisterDialogOpen(true)}
                className="inline-flex items-center justify-center h-14 px-12 bg-primary text-white font-black text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95 transition-all uppercase tracking-widest"
              >
                Daftar Sekarang
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