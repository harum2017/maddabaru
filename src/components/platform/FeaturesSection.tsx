import React from 'react';
import { 
  Layout, 
  Users, 
  FileText, 
  Image, 
  Settings, 
  BarChart3,
  Smartphone,
  Lock
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Layout,
      title: 'Template Modern',
      description: 'Desain website responsif dan profesional yang siap pakai untuk sekolah Anda.'
    },
    {
      icon: Users,
      title: 'Manajemen Pengguna',
      description: 'Kelola admin, operator, dan hak akses dengan mudah dan aman.'
    },
    {
      icon: FileText,
      title: 'Publikasi Berita',
      description: 'Publikasikan berita, pengumuman, dan artikel dengan editor yang mudah.'
    },
    {
      icon: Image,
      title: 'Galeri Media',
      description: 'Tampilkan foto dan video kegiatan sekolah dengan galeri yang menarik.'
    },
    {
      icon: Settings,
      title: 'Kustomisasi Mudah',
      description: 'Sesuaikan warna, logo, dan konten sesuai identitas sekolah Anda.'
    },
    {
      icon: BarChart3,
      title: 'Statistik Pengunjung',
      description: 'Pantau performa website dengan dashboard analitik yang lengkap.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Tampilan optimal di semua perangkat, dari desktop hingga smartphone.'
    },
    {
      icon: Lock,
      title: 'Keamanan Data',
      description: 'Perlindungan data dengan enkripsi SSL dan backup otomatis harian.'
    }
  ];

  return (
    <section id="features" className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Fitur <span className="text-gradient">Lengkap</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Semua yang Anda butuhkan untuk website sekolah modern dalam satu platform.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-4 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <feature.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
