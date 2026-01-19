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
    <section id="about" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-card rounded-2xl border-2 border-border/80 overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523050338692-7b835a07973f?w=800&h=600&fit=crop" 
                alt="School Environment" 
                className="w-full h-full object-cover aspect-video transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-black tracking-tight text-lg">Digitalisasi Pendidikan Masa Depan</p>
                <p className="text-white/80 text-sm font-medium uppercase tracking-widest">MaddaSoft Platform</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/10 border-2 border-primary/20 rounded-lg text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              Tentang Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">
              Membangun Standar Baru <br/>
              <span className="text-gradient">Website Sekolah Indonesia</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              Kami percaya setiap sekolah layak memiliki identitas digital yang prestisius. 
              MaddaSoft hadir bukan hanya sebagai pembuat website, tapi sebagai partner 
              transformasi digital pendidikan Anda.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: 'Inovasi Berkelanjutan', desc: 'Update fitur rutin sesuai regulasi.' },
                { title: 'Dukungan Prioritas', desc: 'Tim teknis siap membantu 24/7.' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-background/50 rounded-xl border-2 border-border/60 hover:border-primary/40 transition-colors">
                  <h4 className="font-black text-sm mb-1 tracking-tight">{item.title}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-primary mb-3">
            Filosofi Kami
          </h2>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter leading-none">
            Mengapa Memilih <span className="text-gradient">MaddaSoft</span>?
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-card/60 backdrop-blur-sm p-5 rounded-2xl border-2 border-border/80 hover:border-primary/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black mb-2 tracking-tight">{value.title}</h3>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
