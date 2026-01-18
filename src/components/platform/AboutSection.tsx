import React from 'react';
import { Globe, Shield, Zap, HeartHandshake } from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Globe,
      title: 'Akses Global',
      description: 'Website sekolah Anda dapat diakses dari mana saja, kapan saja, dengan performa optimal.'
    },
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description: 'Data sekolah terlindungi dengan standar keamanan tinggi dan backup otomatis.'
    },
    {
      icon: Zap,
      title: 'Cepat & Mudah',
      description: 'Setup dalam hitungan menit tanpa perlu keahlian teknis atau coding.'
    },
    {
      icon: HeartHandshake,
      title: 'Dukungan Penuh',
      description: 'Tim support kami siap membantu Anda 24/7 dengan respons cepat.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mengapa Memilih <span className="text-gradient">MaddaSoft</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Kami menyediakan solusi lengkap untuk digitalisasi sekolah Indonesia. 
            Satu platform untuk semua kebutuhan website sekolah Anda.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-xl border border-border card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg hero-gradient flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
