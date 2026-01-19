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
    <section id="features" className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-primary mb-3">Sistem Terintegrasi</h2>
          <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter leading-none">
            Ecosystem <span className="text-gradient">Digital Sekolah</span>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed font-medium">
            MaddaSoft menghadirkan harmoni antara manajemen data internal (SIM) dan eksistensi publik yang prestisius.
          </p>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-card/80 backdrop-blur-sm hover:bg-accent/10 p-6 rounded-2xl border-2 border-border/80 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 flex flex-col items-start"
            >
              <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <feature.icon className="w-20 h-20" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:rotate-3 transition-all">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider mb-3 border border-primary/20">
                {feature.tag}
              </div>
              <h4 className="text-lg font-black mb-2 tracking-tight">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary Features List */}
        <div className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 border-2 border-border/60">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {secondaryFeatures.map((feature, index) => (
              <div key={index} className="flex gap-3 items-center group">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-background border-2 border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <feature.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <div>
                  <h5 className="font-black text-xs group-hover:text-primary transition-colors tracking-tight">{feature.title}</h5>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-tighter opacity-80">{feature.description}</p>
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
