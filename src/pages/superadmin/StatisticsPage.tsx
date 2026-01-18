import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { schools, posts, staff } from '@/data/dummyData';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  FileText,
  Calendar
} from 'lucide-react';

const StatisticsPage: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', visitors: 12500, pageViews: 45000 },
    { month: 'Feb', visitors: 14200, pageViews: 52000 },
    { month: 'Mar', visitors: 15800, pageViews: 58000 },
    { month: 'Apr', visitors: 13900, pageViews: 48000 },
    { month: 'Mei', visitors: 16500, pageViews: 62000 },
    { month: 'Jun', visitors: 18200, pageViews: 71000 },
  ];

  const topSchools = schools.map((school, index) => ({
    ...school,
    visitors: Math.floor(Math.random() * 5000) + 1000,
    posts: posts.filter(p => p.school_id === school.id).length,
  })).sort((a, b) => b.visitors - a.visitors);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Statistik Platform</h1>
          <p className="text-muted-foreground">Analisis performa dan penggunaan platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Juni 2024
          </Button>
          <Button size="sm">Export Report</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">125,847</p>
                <p className="text-sm text-muted-foreground">Total Pengunjung</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% dari bulan lalu
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/10">
                <BarChart3 className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">456,230</p>
                <p className="text-sm text-muted-foreground">Page Views</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.3% dari bulan lalu
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{staff.length + 15}</p>
                <p className="text-sm text-muted-foreground">Pengguna Aktif</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5 pengguna baru
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.length + 45}</p>
                <p className="text-sm text-muted-foreground">Konten Dipublikasi</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-accent">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23 konten baru
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trafik Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{data.month}</span>
                    <span className="text-muted-foreground">{data.visitors.toLocaleString()} pengunjung</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full hero-gradient rounded-full transition-all duration-500"
                      style={{ width: `${(data.visitors / 20000) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Schools */}
        <Card>
          <CardHeader>
            <CardTitle>Sekolah dengan Pengunjung Terbanyak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSchools.map((school, index) => (
                <div key={school.id} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{
                      backgroundColor: `${school.theme_color}15`,
                      color: school.theme_color
                    }}
                  >
                    {school.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{school.name}</p>
                    <p className="text-xs text-muted-foreground">{school.posts} artikel</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{school.visitors.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">pengunjung</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device & Browser Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perangkat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Mobile</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-primary rounded-full" />
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Desktop</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-info rounded-full" />
                  </div>
                  <span className="text-sm font-medium">30%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Tablet</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[5%] bg-accent rounded-full" />
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Chrome</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Safari</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Firefox</span>
                <span className="font-medium">8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Lainnya</span>
                <span className="font-medium">6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lokasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Jawa Barat</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Jawa Tengah</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DKI Jakarta</span>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Lainnya</span>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
