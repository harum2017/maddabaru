import React, { useState } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { schools } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Image, Palette, FileText } from 'lucide-react';
import { toast } from 'sonner';

const SchoolSettings: React.FC = () => {
  const { currentSchool, simulatedSchoolId } = useDomain();
  const { user } = useAuth();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  const school = currentSchool || schools.find(s => s.id === schoolId);

  const [generalForm, setGeneralForm] = useState({
    name: school?.name || '',
    email: school?.email || '',
    phone: school?.phone || '',
    address: school?.address || '',
  });

  const [contentForm, setContentForm] = useState({
    about: school?.about || '',
    vision: school?.vision || '',
    mission: school?.mission?.join('\n') || '',
  });

  const [brandingForm, setBrandingForm] = useState({
    logo: school?.logo || '',
    theme_color: school?.theme_color || '#2563eb',
    hero_images: school?.hero_images?.join('\n') || '',
    profile_image: school?.profile_image || '',
  });

  const handleSaveGeneral = () => {
    toast.success('Informasi umum berhasil disimpan');
  };

  const handleSaveContent = () => {
    toast.success('Konten profil berhasil disimpan');
  };

  const handleSaveBranding = () => {
    toast.success('Branding berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Sekolah</h1>
        <p className="text-muted-foreground">Kelola informasi dan tampilan website sekolah</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informasi Umum
              </CardTitle>
              <CardDescription>Informasi dasar sekolah yang ditampilkan di website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nama Sekolah</Label>
                <Input
                  value={generalForm.name}
                  onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={generalForm.email}
                    onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Telepon</Label>
                  <Input
                    value={generalForm.phone}
                    onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Alamat</Label>
                <Textarea
                  value={generalForm.address}
                  onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Settings */}
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Konten Profil
              </CardTitle>
              <CardDescription>Tentang, visi, dan misi sekolah</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tentang Sekolah</Label>
                <Textarea
                  value={contentForm.about}
                  onChange={(e) => setContentForm({ ...contentForm, about: e.target.value })}
                  rows={4}
                  placeholder="Deskripsi tentang sekolah..."
                />
              </div>
              <div>
                <Label>Visi</Label>
                <Textarea
                  value={contentForm.vision}
                  onChange={(e) => setContentForm({ ...contentForm, vision: e.target.value })}
                  rows={2}
                  placeholder="Visi sekolah..."
                />
              </div>
              <div>
                <Label>Misi (satu per baris)</Label>
                <Textarea
                  value={contentForm.mission}
                  onChange={(e) => setContentForm({ ...contentForm, mission: e.target.value })}
                  rows={4}
                  placeholder="Misi pertama&#10;Misi kedua&#10;Misi ketiga"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveContent}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Branding
              </CardTitle>
              <CardDescription>Logo, warna, dan gambar website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>URL Logo</Label>
                <Input
                  value={brandingForm.logo}
                  onChange={(e) => setBrandingForm({ ...brandingForm, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
                {brandingForm.logo && brandingForm.logo !== '/placeholder.svg' && (
                  <div className="mt-2 w-20 h-20 rounded-lg border flex items-center justify-center overflow-hidden">
                    <img src={brandingForm.logo} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
              </div>
              <div>
                <Label>Warna Tema</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={brandingForm.theme_color}
                    onChange={(e) => setBrandingForm({ ...brandingForm, theme_color: e.target.value })}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={brandingForm.theme_color}
                    onChange={(e) => setBrandingForm({ ...brandingForm, theme_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label>URL Hero Images (satu per baris)</Label>
                <Textarea
                  value={brandingForm.hero_images}
                  onChange={(e) => setBrandingForm({ ...brandingForm, hero_images: e.target.value })}
                  rows={4}
                  placeholder="https://example.com/hero1.jpg&#10;https://example.com/hero2.jpg"
                />
              </div>
              <div>
                <Label>URL Gambar Profil Sekolah (Tentang Kami)</Label>
                <Input
                  value={brandingForm.profile_image}
                  onChange={(e) => setBrandingForm({ ...brandingForm, profile_image: e.target.value })}
                  placeholder="https://example.com/profile.jpg"
                />
                {brandingForm.profile_image && (
                  <div className="mt-2 aspect-[3/2] w-48 rounded-lg border overflow-hidden">
                    <img src={brandingForm.profile_image} alt="Profile Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveBranding}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolSettings;
