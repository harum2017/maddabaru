import React, { useState } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { useAuth } from '@/contexts/AuthContext';
import { schools } from '@/data/dummyData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, FileText, Target, Info } from 'lucide-react';
import { toast } from 'sonner';

const OperatorPages: React.FC = () => {
  const { currentSchool, simulatedSchoolId } = useDomain();
  const { user } = useAuth();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  const school = currentSchool || schools.find(s => s.id === schoolId);

  const [aboutContent, setAboutContent] = useState(school?.about || '');
  const [visionContent, setVisionContent] = useState(school?.vision || '');
  const [missionContent, setMissionContent] = useState(school?.mission?.join('\n') || '');

  const handleSaveAbout = () => {
    toast.success('Halaman Tentang berhasil disimpan');
  };

  const handleSaveVisionMission = () => {
    toast.success('Visi & Misi berhasil disimpan');
  };

  const pages = [
    { id: 'about', title: 'Tentang Sekolah', icon: Info, status: 'published' },
    { id: 'vision', title: 'Visi & Misi', icon: Target, status: 'published' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kelola Halaman</h1>
          <p className="text-muted-foreground">Edit konten halaman statis website</p>
        </div>
        <Button onClick={() => window.open(`/?school_id=${schoolId}`, '_blank')}>
          <Eye className="w-4 h-4 mr-2" />
          Preview Website
        </Button>
      </div>

      {/* Page List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  <page.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{page.title}</p>
                  <Badge variant="outline" className="text-xs">
                    {page.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Editor */}
      <Tabs defaultValue="about">
        <TabsList>
          <TabsTrigger value="about">Tentang Sekolah</TabsTrigger>
          <TabsTrigger value="vision">Visi & Misi</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Tentang Sekolah
              </CardTitle>
              <CardDescription>
                Deskripsi tentang sekolah yang ditampilkan di website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Konten</Label>
                <Textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  rows={8}
                  placeholder="Tulis deskripsi tentang sekolah..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {aboutContent.length} karakter
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => window.open(`/?school_id=${schoolId}#about`, '_blank')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleSaveAbout}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Visi & Misi
              </CardTitle>
              <CardDescription>
                Visi dan misi sekolah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Visi</Label>
                <Textarea
                  value={visionContent}
                  onChange={(e) => setVisionContent(e.target.value)}
                  rows={3}
                  placeholder="Tulis visi sekolah..."
                />
              </div>
              <div>
                <Label>Misi (satu per baris)</Label>
                <Textarea
                  value={missionContent}
                  onChange={(e) => setMissionContent(e.target.value)}
                  rows={6}
                  placeholder="Misi pertama&#10;Misi kedua&#10;Misi ketiga"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Pisahkan setiap misi dengan baris baru
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => window.open(`/?school_id=${schoolId}#visi-misi`, '_blank')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleSaveVisionMission}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tips */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">💡 Tips Mengedit Halaman</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Gunakan bahasa yang jelas dan mudah dipahami</li>
            <li>• Pastikan informasi yang ditampilkan sudah akurat dan terbaru</li>
            <li>• Preview terlebih dahulu sebelum menyimpan perubahan</li>
            <li>• Untuk perubahan besar, konsultasikan dengan Admin Sekolah</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperatorPages;
