import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { schools, posts, staff } from '@/data/dummyData';
import { useDomain } from '@/contexts/DomainContext';
import {
  Building2,
  Users,
  FileText,
  Globe,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setSimulatedSchoolId } = useDomain();
  const [selectedPeriod, setSelectedPeriod] = useState<'7' | '30' | '90'>('7');
  
  const activeSchools = schools.filter(s => s.is_active).length;
  const totalStaff = staff.length;
  const totalPosts = posts.length;

  const stats = [
    {
      title: 'Total Sekolah',
      value: schools.length,
      change: '+2',
      trend: 'up',
      icon: Building2,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Sekolah Aktif',
      value: activeSchools,
      change: '+1',
      trend: 'up',
      icon: Activity,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Total Pengguna',
      value: totalStaff + 10,
      change: '+5',
      trend: 'up',
      icon: Users,
      color: 'text-info',
      bgColor: 'bg-info/10'
    },
    {
      title: 'Total Berita',
      value: totalPosts,
      change: '+12',
      trend: 'up',
      icon: FileText,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
  ];

  const recentActivities = [
    { action: 'Sekolah baru terdaftar', school: 'SMK Mandiri Jaya', time: '5 menit lalu' },
    { action: 'Domain diverifikasi', school: 'SMA Negeri 1 Nusantara', time: '1 jam lalu' },
    { action: 'Berita dipublikasikan', school: 'SMK Teknologi Merdeka', time: '2 jam lalu' },
    { action: 'Admin baru ditambahkan', school: 'SMA Harapan Bangsa', time: '3 jam lalu' },
    { action: 'Galeri diperbarui', school: 'SMK Teknologi Merdeka', time: '5 jam lalu' },
  ];

  const handleAddSchool = () => {
    navigate('/domain-pusat/admin/schools');
  };

  const handleViewAllSchools = () => {
    navigate('/domain-pusat/admin/schools');
  };

  const handleViewSchoolWebsite = (schoolId: number) => {
    setSimulatedSchoolId(schoolId);
    navigate('/');
    toast.success('Mode simulasi aktif! Anda sekarang melihat website sekolah.');
  };

  const handlePeriodChange = (period: '7' | '30' | '90') => {
    setSelectedPeriod(period);
    toast.info(`Menampilkan data ${period} hari terakhir`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Selamat Datang, Super Admin! 👋</h1>
          <p className="text-muted-foreground">Berikut ringkasan platform hari ini.</p>
        </div>
        <Button className="gap-2" onClick={handleAddSchool}>
          <Building2 className="w-4 h-4" />
          Tambah Sekolah Baru
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-accent' : 'text-destructive'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Schools Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daftar Sekolah Terbaru</CardTitle>
            <Button variant="ghost" size="sm" onClick={handleViewAllSchools}>
              Lihat Semua
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{
                      backgroundColor: `${school.theme_color}15`,
                      color: school.theme_color
                    }}
                  >
                    {school.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{school.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="w-3 h-3" />
                      <span className="truncate">{school.domain}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      school.is_active 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {school.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewSchoolWebsite(school.id)}
                      title="Lihat Website"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.school}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Chart Placeholder */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Trafik Platform</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedPeriod === '7' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => handlePeriodChange('7')}
              className={selectedPeriod === '7' ? 'bg-primary/10' : ''}
            >
              7 Hari
            </Button>
            <Button 
              variant={selectedPeriod === '30' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => handlePeriodChange('30')}
              className={selectedPeriod === '30' ? 'bg-primary/10' : ''}
            >
              30 Hari
            </Button>
            <Button 
              variant={selectedPeriod === '90' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => handlePeriodChange('90')}
              className={selectedPeriod === '90' ? 'bg-primary/10' : ''}
            >
              90 Hari
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/50 rounded-xl">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-muted-foreground">Grafik statistik {selectedPeriod} hari terakhir</p>
              <p className="text-xs text-muted-foreground">Data dummy - Setelah integrasi database</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
