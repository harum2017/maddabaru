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
  const schools = getActiveSchools();
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
      <section id="schools" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sekolah yang Sudah <span className="text-gradient">Bergabung</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Bergabunglah dengan ratusan sekolah yang telah mempercayakan 
              pengelolaan website mereka kepada platform kami.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school, index) => (
              <div 
                key={school.id}
                className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="h-32 relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${school.theme_color} 0%, ${school.theme_color}99 100%)` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-card rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl font-bold" style={{ color: school.theme_color }}>
                        {school.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{school.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{school.address.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium">{school.domain}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => handleVisitWebsite(school.id)}
                  >
                    Kunjungi Website
                  </Button>
                </div>
              </div>
            ))}
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border-2 border-dashed border-primary/30 p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl">🏫</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sekolah Anda Belum Terdaftar?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Daftarkan sekolah Anda sekarang dan nikmati semua fitur premium gratis selama 30 hari!
              </p>
              <Button onClick={() => setIsRegisterDialogOpen(true)}>Daftar Sekarang</Button>
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
