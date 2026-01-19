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
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-3">Solusi Terpadu</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Lebih Dari Sekadar <span className="text-gradient">Website Sekolah</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            MaddaSoft menggabungkan kekuatan sistem informasi manajemen (SIM) dengan profil publik yang elegan. 
            Solusi digitalisasi sekolah paling lengkap di Indonesia.
          </p>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-card hover:bg-accent/50 p-8 rounded-3xl border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col items-start"
            >
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <feature.icon className="w-24 h-24" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider mb-4 border border-primary/10">
                {feature.tag}
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary Features List */}
        <div className="bg-muted/30 rounded-[2.5rem] p-12 border border-border/50">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {secondaryFeatures.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="mt-1 w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <feature.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{feature.title}</h5>
                  <p className="text-xs text-muted-foreground leading-snug">{feature.description}</p>
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
