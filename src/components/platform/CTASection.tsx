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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CTASection: React.FC = () => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Tim kami akan menghubungi Anda dalam 1x24 jam.');
    setIsRegisterDialogOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesan terkirim! Tim sales kami akan menghubungi Anda segera.');
    setIsContactDialogOpen(false);
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
    <>
      <section id="contact" className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* CTA Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Siap Memulai <span className="text-gradient">Digitalisasi</span> Sekolah Anda?
              </h2>
              <p className="text-lg text-muted-foreground">
                Daftarkan sekolah Anda sekarang dan dapatkan akses ke semua fitur premium. 
                Tim kami siap membantu proses setup hingga website Anda live!
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" onClick={() => setIsRegisterDialogOpen(true)}>
                  Daftar Gratis
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setIsContactDialogOpen(true)}>
                  Hubungi Sales
                </Button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <h3 className="text-xl font-semibold">Hubungi Kami</h3>
              
              <div className="space-y-4">
                <button 
                  onClick={handlePhoneClick}
                  className="flex items-start gap-4 w-full text-left hover:bg-muted/50 p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-muted-foreground">(021) 1234-5678</p>
                  </div>
                </button>
                
                <button 
                  onClick={handleEmailClick}
                  className="flex items-start gap-4 w-full text-left hover:bg-muted/50 p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">info@maddasoft.id</p>
                  </div>
                </button>
                
                <button 
                  onClick={handleMapsClick}
                  className="flex items-start gap-4 w-full text-left hover:bg-muted/50 p-2 -m-2 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-muted-foreground">
                      Jl. Teknologi No. 123<br />
                      Jakarta Selatan 12345
                    </p>
                  </div>
                </button>
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

      {/* Contact Sales Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hubungi Tim Sales</DialogTitle>
            <DialogDescription>
              Punya pertanyaan atau butuh penjelasan lebih lanjut? Tim kami siap membantu Anda.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sales-name">Nama Lengkap</Label>
              <Input id="sales-name" placeholder="Nama Anda" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-email">Email</Label>
              <Input id="sales-email" type="email" placeholder="email@anda.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-phone">Nomor Telepon</Label>
              <Input id="sales-phone" placeholder="08123456789" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sales-message">Pesan</Label>
              <Textarea 
                id="sales-message" 
                placeholder="Jelaskan kebutuhan atau pertanyaan Anda..." 
                rows={4}
                required 
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsContactDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Kirim Pesan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CTASection;
