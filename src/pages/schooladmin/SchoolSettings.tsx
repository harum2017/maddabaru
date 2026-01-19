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
import { Save, Image, Palette, FileText, HelpCircle, Info } from 'lucide-react';
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
    logo: school?.logo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/512px-Twitter_Verified_Badge.svg.png',
    theme_color: school?.theme_color || '#2563eb',
    hero_images: school?.hero_images?.join('\n') || 'https://images.unsplash.com/photo-1523050335392-938511794244?auto=format&fit=crop&q=80&w=1920&h=600\nhttps://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920&h=600',
    profile_image: school?.profile_image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200&h=800',
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
          <h1 className="text-2xl font-bold">Pengaturan Sekolah</h1>
          <p className="text-muted-foreground">Kelola informasi dan tampilan website sekolah</p>
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="content">Konten</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

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
                <div className="flex items-center gap-2 mb-2">
                  <Label>URL Logo</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Logo Sekolah</DialogTitle>
                        <DialogDescription>
                          Logo sekolah akan muncul di navbar dan footer website.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0" />
                          <p className="text-sm">
                            Gunakan URL gambar dengan latar belakang transparan (PNG) untuk hasil terbaik di berbagai warna tema.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Format yang disarankan: PNG atau SVG.</li>
                          <li>Rasio: 1:1 (persegi) atau horizontal.</li>
                          <li>Pastikan URL dapat diakses secara publik.</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  value={brandingForm.logo}
                  onChange={(e) => setBrandingForm({ ...brandingForm, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
                {brandingForm.logo && (
                  <div className="mt-2 w-24 h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center overflow-hidden bg-muted/30 p-2">
                    <img 
                      src={brandingForm.logo} 
                      alt="Logo Preview" 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Format+Salah';
                      }}
                    />
                    <span className="text-[10px] font-bold text-muted-foreground mt-1 uppercase text-center">Preview Logo</span>
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
                <div className="flex items-center gap-2 mb-2">
                  <Label>URL Hero Images (satu per baris)</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Hero Images</DialogTitle>
                        <DialogDescription>
                          Hero images adalah gambar besar yang muncul di bagian paling atas website sekolah.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0" />
                          <p className="text-sm">
                            Masukkan satu URL gambar per baris. Sistem akan otomatis memotong (crop) gambar agar sesuai dengan area banner yang responsif.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Rekomendasi rasio: 16:9 atau lebih lebar (panoramic).</li>
                          <li>Minimal resolusi: 1920x600 pixel untuk hasil terbaik.</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  value={brandingForm.hero_images}
                  onChange={(e) => setBrandingForm({ ...brandingForm, hero_images: e.target.value })}
                  rows={4}
                  placeholder="https://example.com/hero1.jpg&#10;https://example.com/hero2.jpg"
                />
                {brandingForm.hero_images && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {brandingForm.hero_images.split('\n').filter(url => url.trim()).map((url, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border bg-muted">
                        <div className="aspect-[16/5] w-full">
                          <img 
                            src={url.trim()} 
                            alt={`Preview ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/800x250?text=URL+Tidak+Valid';
                            }}
                          />
                        </div>
                        <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                          Banner {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label>URL Gambar Profil Sekolah (Tentang Kami)</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Panduan Gambar Profil</DialogTitle>
                        <DialogDescription>
                          Gambar ini akan muncul di halaman "Tentang Kami" atau profil sekolah.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex gap-3">
                          <Info className="h-5 w-5 text-blue-500 shrink-0" />
                          <p className="text-sm">
                            Pilih gambar yang merepresentasikan identitas sekolah, seperti gedung utama atau aktivitas siswa.
                          </p>
                        </div>
                        <ul className="text-sm space-y-2 list-disc pl-5 text-muted-foreground">
                          <li>Rasio ideal: 3:2 atau 4:3.</li>
                          <li>Resolusi minimal: 1200x800 pixel.</li>
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Input
                  value={brandingForm.profile_image}
                  onChange={(e) => setBrandingForm({ ...brandingForm, profile_image: e.target.value })}
                  placeholder="https://example.com/profile.jpg"
                />
                {brandingForm.profile_image && (
                  <div className="mt-2 relative w-full max-w-md aspect-[3/2] rounded-lg border overflow-hidden bg-muted group">
                    <img 
                      src={brandingForm.profile_image} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=URL+Tidak+Valid';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                      Preview Profil
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveBranding}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Branding
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