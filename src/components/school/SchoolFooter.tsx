import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { MapPin, Phone, Mail } from 'lucide-react';

const SchoolFooter: React.FC = () => {
  const { currentSchool } = useDomain();
  const currentYear = new Date().getFullYear();

  if (!currentSchool) return null;

  return (
    <footer 
      className="text-background"
      style={{ backgroundColor: currentSchool.theme_color }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-background/20 flex items-center justify-center text-xl font-bold">
                {currentSchool.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold">{currentSchool.name}</h4>
                <p className="text-background/70 text-sm">{currentSchool.domain}</p>
              </div>
            </div>
            <p className="text-background/80 text-sm">
              {currentSchool.about.substring(0, 150)}...
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#profile" className="text-background/80 hover:text-background transition-colors">Profil Sekolah</a></li>
              <li><a href="#vision" className="text-background/80 hover:text-background transition-colors">Visi & Misi</a></li>
              <li><a href="#staff" className="text-background/80 hover:text-background transition-colors">Guru & Staff</a></li>
              <li><a href="#news" className="text-background/80 hover:text-background transition-colors">Berita</a></li>
              <li><a href="#gallery" className="text-background/80 hover:text-background transition-colors">Galeri</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="text-background/80">{currentSchool.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-background/80">{currentSchool.phone}</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-background/80">{currentSchool.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-background/70">
            © {currentYear} {currentSchool.name}. Hak cipta dilindungi.
          </p>
          <p className="text-background/50">
            Powered by <span className="font-medium text-background/70">MaddaSoft</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SchoolFooter;
