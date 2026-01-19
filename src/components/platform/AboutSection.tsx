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
    <section id="about" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black rounded-none border-4 border-black overflow-hidden shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)] h-[280px]">
              <img 
                src="https://images.unsplash.com/photo-1523050338692-7b835a07973f?auto=format&fit=crop&q=80&w=1200&h=800" 
                alt="School Environment" 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 grayscale-[0.4] group-hover:grayscale-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200&h=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 z-10 pointer-events-none">
                <p className="text-white font-black tracking-tighter text-2xl leading-none mb-1">DATA TANPA BATAS</p>
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">MaddaSoft Ecosystem</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="inline-block px-2 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em]">
              THE_MISSION
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase">
              STANDAR <span className="text-gradient">PRESTISIUS</span> <br/>
              DIGITALISASI
            </h2>
            <p className="text-sm text-muted-foreground leading-tight font-bold tracking-tight">
              Kami menciptakan harmoni antara data internal yang kompleks dengan profil publik yang elegan. Partner transformasi digital paling tajam.
            </p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: 'UPDATE_REGULASI', desc: 'Selalu relevan.' },
                { title: 'SUPPORT_24_JAM', desc: 'Respon instan.' }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-white border-2 border-black rounded-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-black text-[11px] mb-0.5 tracking-tight uppercase">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter leading-none">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="text-2xl font-black tracking-tighter uppercase leading-none">
            MENGAPA <span className="text-gradient">MADDASOFT</span>?
          </h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(var(--primary),0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
            >
              <div className="w-8 h-8 rounded-none bg-black flex items-center justify-center mb-3">
                <value.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-black mb-1 tracking-tight uppercase leading-none">{value.title}</h3>
              <p className="text-[10px] text-muted-foreground font-bold leading-tight tracking-tight uppercase">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
