import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { staff, posts, gallery, getStaffBySchool, getPostsBySchool, getGalleryBySchool } from '@/data/dummyData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, FileText, Image, TrendingUp, Eye, Plus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const SchoolAdminDashboard: React.FC = () => {
  const { currentSchool, simulatedSchoolId } = useDomain();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Gunakan schoolId dari user atau simulasi
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  
  // Get stats
  const schoolStaff = getStaffBySchool(schoolId);
  const schoolPosts = getPostsBySchool(schoolId);
  const schoolGallery = getGalleryBySchool(schoolId);
  
  const stats = [
    { 
      label: 'Total Pegawai', 
      value: schoolStaff.length, 
      icon: Users, 
      color: 'bg-blue-500',
      path: '/admin/staff'
    },
    { 
      label: 'Total Siswa', 
      value: 450, 
      icon: GraduationCap, 
      color: 'bg-green-500',
      path: '/admin/students'
    },
    { 
      label: 'Berita Terpublikasi', 
      value: schoolPosts.length, 
      icon: FileText, 
      color: 'bg-purple-500',
      path: '/admin/content'
    },
    { 
      label: 'Foto Galeri', 
      value: schoolGallery.length, 
      icon: Image, 
      color: 'bg-orange-500',
      path: '/admin/gallery'
    },
  ];

  const recentActivities = [
    { action: 'Berita baru dipublikasikan', user: 'Operator', time: '5 menit lalu' },
    { action: 'Data pegawai diperbarui', user: 'Admin', time: '1 jam lalu' },
    { action: 'Foto galeri ditambahkan', user: 'Operator', time: '2 jam lalu' },
    { action: 'Siswa baru didaftarkan', user: 'Admin', time: '3 jam lalu' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin Sekolah</h1>
          <p className="text-muted-foreground">
            Selamat datang, {user?.name || 'Admin'}
          </p>
        </div>
        <Button onClick={() => window.open(`/?school_id=${schoolId}`, '_blank')}>
          <Eye className="w-4 h-4 mr-2" />
          Lihat Website
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardDescription>Kelola data sekolah dengan cepat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/staff')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pegawai Baru
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/students')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Siswa Baru
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/operators')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Operator
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/content')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Kelola Konten Publik
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
            <CardDescription>Log aktivitas dalam 24 jam terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      oleh {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* School Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informasi Sekolah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama Sekolah</p>
              <p className="font-medium">{currentSchool?.name || 'SMA Negeri 1 Nusantara'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Domain</p>
              <p className="font-medium">{currentSchool?.domain || 'sman1nusantara.sch.id'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{currentSchool?.email || 'info@sman1nusantara.sch.id'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telepon</p>
              <p className="font-medium">{currentSchool?.phone || '(022) 1234567'}</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => navigate('/admin/settings')}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Edit Informasi Sekolah
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolAdminDashboard;
