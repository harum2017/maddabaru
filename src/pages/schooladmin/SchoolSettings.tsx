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
import { Save, Palette, FileText, HelpCircle, Info, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SchoolSettings: React.FC = () => {
  const { currentSchool, simulatedSchoolId } = useDomain();
  const { user } = useAuth();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  const school = currentSchool || schools.find(s => s.id === schoolId);

  // Helper to get valid dummy URLs based on school level
  const getDummyUrls = (id: number) => {
    switch (id) {
      case 4: // SD
        return {
          logo: 'https://i.pinimg.com/236x/67/e9/b1/67e9b15075e83cfa3235b1f76b7cb890.jpg',
          profile: 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/227/2024/07/17/sd-di-kudus-digabung-1882173063.jpg'
        };
      case 3: // SMP
        return {
          logo: 'https://smpn6purwokerto.sch.id/wp-content/uploads/2021/12/LOGO-SPENSIX-BARU-NO-BACKGROUND-1024x1024.png',
          profile: 'https://smpn2.bimakota.sch.id/upload/kontent/1679795348_225ee7f5d9752c51854f.jpeg'
        };
      case 2: // SMK
        return {
          logo: 'https://png.pngtree.com/png-vector/20220611/ourmid/pngtree-smk-hebat-siap-kerja-santun-mandiri-kreatif-png-image_4936786.png',
          profile: 'https://live.staticflickr.com/7547/16210761646_879af6a36a_b.jpg'
        };
      case 1: // SMA
        return {
          logo: 'https://e7.pngegg.com/pngimages/185/601/png-clipart-sma-negeri-67-jakarta-logo-brand-symbol-school-sma-negeri-76-jakarta-others-miscellaneous-logo.png',
          profile: 'https://i.pinimg.com/564x/34/37/96/343796afec1e1c464b8949f8a1953301.jpg'
        };
      default:
        return {
          logo: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&q=80&w=200&h=200',
          profile: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200&h=800'
        };
    }
  };

  const dummy = getDummyUrls(schoolId);

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
    logo: school?.logo && !school.logo.includes('placeholder') ? school.logo : dummy.logo,
    theme_color: school?.theme_color || '#2563eb',
    hero_images: school?.hero_images?.join('\n') || 'https://images.unsplash.com/photo-1523050335392-938511794244?auto=format&fit=crop&q=80&w=1920&h=600\nhttps://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920&h=600',
    profile_image: school?.profile_image && !school.profile_image.includes('placeholder') ? school.profile_image : dummy.profile,
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Sekolah</h1>
          <p className="text-muted-foreground">Kelola informasi dan tampilan website sekolah</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 shadow-sm">Umum</TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 shadow-sm">Konten</TabsTrigger>
          <TabsTrigger value="branding" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 shadow-sm">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
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
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveGeneral}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
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
              <div className="grid grid-cols-1 gap-4">
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
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveContent}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Konten
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Branding & Visual
              </CardTitle>
              <CardDescription>Kelola Logo, Warna Tema, dan Gambar Galeri Website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">URL Logo Sekolah</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Logo Sekolah</DialogTitle>
                        <DialogDescription>
                          Petunjuk penggunaan logo untuk hasil terbaik.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3 items-start">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <p className="text-sm">
                            Gunakan URL gambar dengan latar belakang transparan (format .PNG atau .SVG) agar serasi dengan semua warna tema.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Rasio yang disarankan: 1:1 (Persegi)</li>
                          <li>Ukuran file optimal: di bawah 500KB</li>
                          <li>Pastikan tautan bersifat publik (dapat diakses siapapun)</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  value={brandingForm.logo}
                  onChange={(e) => setBrandingForm({ ...brandingForm, logo: e.target.value })}
                  placeholder="https://link-gambar.com/logo-sekolah.png"
                />
                <div className="mt-2 flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-muted/20 min-h-[140px]">
                  {brandingForm.logo ? (
                    <div className="relative group">
                      <img 
                        src={brandingForm.logo} 
                        alt="Logo Preview" 
                        className="max-w-[100px] max-h-[100px] object-contain transition-transform group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Logo+Gagal';
                        }}
                      />
                      <div className="mt-2 text-center">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Preview Logo Aktif</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-1">
                      <ImageIcon className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                      <p className="text-xs text-muted-foreground italic">Masukkan URL untuk melihat preview logo</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Warna Utama Tema</Label>
                <div className="flex gap-3">
                  <div className="relative">
                    <Input
                      type="color"
                      value={brandingForm.theme_color}
                      onChange={(e) => setBrandingForm({ ...brandingForm, theme_color: e.target.value })}
                      className="w-14 h-11 p-1 cursor-pointer"
                    />
                  </div>
                  <Input
                    value={brandingForm.theme_color}
                    onChange={(e) => setBrandingForm({ ...brandingForm, theme_color: e.target.value })}
                    className="flex-1 font-mono uppercase"
                    placeholder="#2563EB"
                  />
                  <div 
                    className="w-11 h-11 rounded-md border shadow-inner" 
                    style={ { backgroundColor: brandingForm.theme_color } }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">URL Banner Utama (Hero Images)</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Gambar Banner (Hero)</DialogTitle>
                        <DialogDescription>
                          Gambar besar yang muncul di bagian atas halaman utama.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3 items-start">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium">
                            Masukkan satu tautan (URL) per baris untuk membuat slideshow banner.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Rasio optimal: 16:9 atau panoramic (1920x600 px)</li>
                          <li>Gunakan gambar berkualitas HD (minimal 1080p)</li>
                          <li>Sistem akan melakukan pemotongan (crop) otomatis secara proporsional</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  value={brandingForm.hero_images}
                  onChange={(e) => setBrandingForm({ ...brandingForm, hero_images: e.target.value })}
                  rows={4}
                  placeholder="https://link.com/banner-1.jpg&#10;https://link.com/banner-2.jpg"
                  className="font-mono text-xs"
                />
                {brandingForm.hero_images && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {brandingForm.hero_images.split('\n').filter(url => url.trim()).map((url, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border shadow-sm bg-muted/30">
                        <div className="aspect-[16/6] w-full">
                          <img 
                            src={url.trim()} 
                            alt={`Banner ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/800x300?text=Banner+Gagal+Dimuat';
                            }}
                          />
                        </div>
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-widest">
                          Banner {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-semibold">URL Gambar Profil Sekolah (Tentang Kami)</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Gambar Profil</DialogTitle>
                        <DialogDescription>
                          Gambar yang mewakili identitas sekolah Anda.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3 items-start">
                          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                          <p className="text-sm">
                            Gambar ini akan muncul di bagian deskripsi "Tentang Kami". Pilih foto terbaik gedung sekolah atau aktivitas utama.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Rasio disarankan: 3:2 atau 4:3 (Lanskap)</li>
                          <li>Gunakan gambar yang terang dan fokus pada subjek utama</li>
                          <li>Resolusi rekomendasi: minimal 1200x800 pixel</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  value={brandingForm.profile_image}
                  onChange={(e) => setBrandingForm({ ...brandingForm, profile_image: e.target.value })}
                  placeholder="https://link-gambar.com/gedung-sekolah.jpg"
                />
                <div className="mt-2 flex justify-center p-3 border rounded-lg bg-muted/10 min-h-[220px]">
                  {brandingForm.profile_image ? (
                    <div className="relative w-full max-w-md aspect-[3/2] rounded-md overflow-hidden shadow-md group">
                      <img 
                        src={brandingForm.profile_image} 
                        alt="Profile Preview" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Gambar+Profil+Gagal+Dimuat';
                        }}
                      />
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest">
                        Pratinjau Profil
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-2 opacity-40">
                      <ImageIcon className="h-10 w-10" />
                      <p className="text-xs italic">Pratinjau gambar profil sekolah akan muncul di sini</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button size="lg" onClick={handleSaveBranding} className="font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
                  <Save className="w-5 h-5 mr-2" />
                  Simpan Semua Pengaturan Visual
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