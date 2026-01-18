import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { useAuth } from '@/contexts/AuthContext';
import { posts, gallery, getPostsBySchool, getGalleryBySchool } from '@/data/dummyData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Image, Eye, Plus, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OperatorDashboard: React.FC = () => {
  const { currentSchool, simulatedSchoolId } = useDomain();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  
  const schoolPosts = posts.filter(p => p.school_id === schoolId);
  const schoolGallery = getGalleryBySchool(schoolId);
  
  const publishedPosts = schoolPosts.filter(p => p.status === 'published');
  const draftPosts = schoolPosts.filter(p => p.status === 'draft');

  const stats = [
    { 
      label: 'Berita Terpublikasi', 
      value: publishedPosts.length, 
      icon: FileText, 
      color: 'bg-green-500',
      path: '/operator/news'
    },
    { 
      label: 'Draft Berita', 
      value: draftPosts.length, 
      icon: Clock, 
      color: 'bg-yellow-500',
      path: '/operator/news'
    },
    { 
      label: 'Foto Galeri', 
      value: schoolGallery.length, 
      icon: Image, 
      color: 'bg-blue-500',
      path: '/operator/gallery'
    },
  ];

  const recentActivities = [
    { action: 'Berita "Olimpiade Matematika" dipublikasikan', time: '10 menit lalu' },
    { action: 'Foto galeri baru ditambahkan', time: '1 jam lalu' },
    { action: 'Draft berita disimpan', time: '2 jam lalu' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Operator</h1>
          <p className="text-muted-foreground">
            Selamat datang, {user?.name || 'Operator'}
          </p>
        </div>
        <Button onClick={() => window.open(`/?school_id=${schoolId}`, '_blank')}>
          <Eye className="w-4 h-4 mr-2" />
          Lihat Website
        </Button>
      </div>

      {/* School Info */}
      <Card className="bg-secondary/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Anda mengelola konten untuk:</p>
          <p className="font-semibold">{currentSchool?.name || 'SMA Negeri 1 Nusantara'}</p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(stat.path)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aksi Cepat</CardTitle>
            <CardDescription>Kelola konten website dengan cepat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/operator/news')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Buat Berita Baru
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/operator/gallery')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Foto Galeri
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/operator/pages')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Edit Halaman Statis
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas konten Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">💡 Tips untuk Operator</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Pastikan berita memiliki gambar yang menarik sebelum dipublikasikan</li>
            <li>• Gunakan judul yang singkat dan informatif</li>
            <li>• Kategorikan foto galeri dengan benar agar mudah ditemukan</li>
            <li>• Simpan sebagai draft jika belum siap dipublikasikan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorDashboard;
