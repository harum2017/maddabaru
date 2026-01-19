import React from 'react';
import { 
  Layout, 
  Users, 
  FileText, 
  Image, 
  Settings, 
  BarChart3,
  Smartphone,
  Lock,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Zap
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const mainFeatures = [
    {
      icon: BookOpen,
      title: 'Aplikasi Buku Induk Digital',
      description: 'Manajemen data siswa super lengkap sesuai standar nasional. Riwayat pendidikan, data keluarga, hingga mutasi siswa terintegrasi dalam satu database aman.',
      tag: 'Unggulan'
    },
    {
      icon: UserCheck,
      title: 'Sistem Kepegawaian (SIMPEG)',
      description: 'Kelola data guru dan staf secara profesional. Pendataan NIP, jabatan, hingga publikasi profil tenaga pendidik untuk transparansi sekolah.',
      tag: 'Eksklusif'
    },
    {
      icon: Layout,
      title: 'Multi-Tenant Website',
      description: 'Satu platform untuk ratusan sekolah. Setiap sekolah memiliki subdomain dan identitas visual sendiri namun tetap dalam kendali pusat yang efisien.',
      tag: 'Arsitektur'
    },
    {
      icon: ShieldCheck,
      title: 'Keamanan Data Berlapis',
      description: 'Proteksi data sensitif siswa dan sekolah dengan enkripsi modern. Backup rutin memastikan aset informasi sekolah Anda selalu aman.',
      tag: 'Keamanan'
    }
  ];

  const secondaryFeatures = [
    { icon: FileText, title: 'Warta Sekolah', description: 'Publikasi berita & pengumuman.' },
    { icon: Image, title: 'Galeri Kegiatan', description: 'Dokumentasi visual sekolah.' },
    { icon: Settings, title: 'Custom Branding', description: 'Warna & Logo khas sekolah.' },
    { icon: BarChart3, title: 'Analitik Data', description: 'Statistik pengunjung & data.' },
    { icon: Smartphone, title: 'Responsive Design', description: 'Akses lancar di HP & Tablet.' },
    { icon: Zap, title: 'Performa Cepat', description: 'Loading website super kilat.' },
  ];

  return (
    <section id="features" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-2">SYSTEM_ARCHITECTURE</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter leading-none uppercase">
            EKOSISTEM <span className="text-gradient">DIGITAL</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-tight font-black uppercase tracking-tighter">
            Harmonisasi data internal dan eksistensi publik yang prestisius.
          </p>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white p-6 rounded-none border-4 border-black transition-all duration-200 hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),0.2)] flex flex-col items-start"
            >
              <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <feature.icon className="w-16 h-16" />
              </div>
              <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div className="inline-block px-2 py-0.5 rounded-none bg-primary text-white text-[9px] font-black uppercase tracking-widest mb-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {feature.tag}
              </div>
              <h4 className="text-xl font-black mb-1 tracking-tighter uppercase leading-none">{feature.title}</h4>
              <p className="text-xs text-muted-foreground leading-tight font-bold tracking-tight uppercase">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary Features List */}
        <div className="bg-black p-8 rounded-none border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {secondaryFeatures.map((feature, index) => (
              <div key={index} className="flex gap-3 items-center group">
                <div className="shrink-0 w-7 h-7 rounded-none bg-white border-2 border-white flex items-center justify-center group-hover:bg-primary transition-colors">
                  <feature.icon className="w-3.5 h-3.5 text-black group-hover:text-white" />
                </div>
                <div>
                  <h5 className="font-black text-[10px] text-white group-hover:text-primary transition-colors tracking-widest uppercase">{feature.title}</h5>
                  <p className="text-[9px] text-white/60 font-black uppercase tracking-tighter leading-none">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
