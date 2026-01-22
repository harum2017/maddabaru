import React from 'react';
import { GraduationCap } from 'lucide-react';

const PlatformFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produk: [
      { label: 'Fitur', href: '#features' },
      { label: 'Harga', href: '#' },
      { label: 'Demo', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
    perusahaan: [
      { label: 'Tentang Kami', href: '#about' },
      { label: 'Kontak', href: '#contact' },
      { label: 'Blog', href: '#' },
      { label: 'Karir', href: '#' },
    ],
    legal: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Keamanan', href: '#' },
    ],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MaddaSoft</span>
            </div>
            <p className="text-background/70 mb-4 max-w-sm">
              Platform website sekolah terpadu untuk digitalisasi pendidikan Indonesia. 
              Satu solusi untuk semua kebutuhan website sekolah.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.produk.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <p className="text-background/70 text-sm">
            Website Design By <a href="/" className="hover:underline font-bold">@ MaddaSoft 2026 Menuju Halaman Homepage Platform Utama</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PlatformFooter;
