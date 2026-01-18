import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const SchoolContact: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) return null;

  return (
    <section id="contact" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hubungi Kami</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami jika ada pertanyaan
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${currentSchool.theme_color}15` }}
              >
                <MapPin className="w-6 h-6" style={{ color: currentSchool.theme_color }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Alamat</h4>
                <p className="text-muted-foreground">{currentSchool.address}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${currentSchool.theme_color}15` }}
              >
                <Phone className="w-6 h-6" style={{ color: currentSchool.theme_color }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Telepon</h4>
                <p className="text-muted-foreground">{currentSchool.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${currentSchool.theme_color}15` }}
              >
                <Mail className="w-6 h-6" style={{ color: currentSchool.theme_color }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-muted-foreground">{currentSchool.email}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${currentSchool.theme_color}15` }}
              >
                <Clock className="w-6 h-6" style={{ color: currentSchool.theme_color }} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Jam Operasional</h4>
                <p className="text-muted-foreground">Senin - Jumat: 07:00 - 15:00 WIB</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-semibold mb-6">Kirim Pesan</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Nama Lengkap" />
                <Input type="email" placeholder="Email" />
              </div>
              <Input placeholder="Subjek" />
              <Textarea placeholder="Pesan Anda..." className="min-h-[120px]" />
              <Button 
                className="w-full"
                style={{ backgroundColor: currentSchool.theme_color }}
              >
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolContact;
