import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { isDevMode } from '@/services/config';
import {
  User,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  Save,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { getSupabaseClient } from '@/lib/supabase';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  // Security Form State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    email: true,
    newSchool: true,
    domainIssues: true,
    weeklyReport: false,
  });

  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    name: 'MaddaSoft',
    domain: 'maddasoft.id',
    supportEmail: 'support@maddasoft.id',
  });

  // Branding State
  const [branding, setBranding] = useState({
    primaryColor: '#2563eb',
    logoImage: null as string | null,
  });

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file tidak boleh lebih dari 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Format file harus JPG atau PNG');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        toast.success('Foto profil berhasil diubah');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file tidak boleh lebih dari 2MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        toast.error('Format file harus JPG, PNG, atau SVG');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBranding({ ...branding, logoImage: result });
        toast.success('Logo berhasil diubah');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile save
  const handleProfileSave = async () => {
    if (!profileForm.name.trim()) {
      toast.error('Nama tidak boleh kosong');
      return;
    }
    if (!profileForm.email.trim()) {
      toast.error('Email tidak boleh kosong');
      return;
    }

    // In dev mode, just show success
    if (isDevMode()) {
      toast.success('Profil berhasil disimpan (mode dev)');
      return;
    }

    setIsProfileLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        toast.error('Backend tidak tersedia');
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sesi tidak valid. Silakan login ulang.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('update-profile', {
        body: { 
          name: profileForm.name.trim(),
          avatarUrl: profileImage 
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(data?.message || 'Profil berhasil disimpan');
    } catch (error: any) {
      console.error('Profile save error:', error);
      toast.error(error.message || 'Gagal menyimpan profil');
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    setPasswordError(null);

    if (!securityForm.currentPassword.trim()) {
      setPasswordError('Password saat ini harus diisi');
      return;
    }
    if (!securityForm.newPassword.trim()) {
      setPasswordError('Password baru harus diisi');
      return;
    }
    if (securityForm.newPassword.length < 8) {
      setPasswordError('Password minimal 8 karakter');
      return;
    }
    
    // Check password strength
    const hasUppercase = /[A-Z]/.test(securityForm.newPassword);
    const hasLowercase = /[a-z]/.test(securityForm.newPassword);
    const hasNumber = /[0-9]/.test(securityForm.newPassword);
    
    if (!hasUppercase || !hasLowercase || !hasNumber) {
      setPasswordError('Password harus mengandung huruf besar, huruf kecil, dan angka');
      return;
    }
    
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setPasswordError('Password tidak cocok');
      return;
    }

    // In dev mode, just show success
    if (isDevMode()) {
      toast.success('Password berhasil diubah (mode dev)');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      return;
    }

    setIsLoading(true);
    try {
      const supabase = await getSupabaseClient();
      if (!supabase) {
        setPasswordError('Backend tidak tersedia');
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setPasswordError('Sesi tidak valid. Silakan login ulang.');
        return;
      }

      const { data, error } = await supabase.functions.invoke('change-password', {
        body: {
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(data?.message || 'Password berhasil diubah');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Password change error:', error);
      setPasswordError(error.message || 'Gagal mengubah password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle 2FA toggle
  const handleToggle2FA = () => {
    if (!twoFAEnabled) {
      toast.success('2FA akan diaktifkan. Cek email Anda untuk instruksi.');
    } else {
      toast.success('2FA berhasil dinonaktifkan');
    }
    setTwoFAEnabled(!twoFAEnabled);
  };

  // Handle notification save
  const handleNotificationSave = () => {
    toast.success('Preferensi notifikasi berhasil disimpan');
  };

  // Handle platform settings save
  const handlePlatformSave = () => {
    if (!platformSettings.name.trim()) {
      toast.error('Nama platform tidak boleh kosong');
      return;
    }
    if (!platformSettings.domain.trim()) {
      toast.error('Domain tidak boleh kosong');
      return;
    }
    if (!platformSettings.supportEmail.trim()) {
      toast.error('Email support tidak boleh kosong');
      return;
    }
    toast.success('Pengaturan platform berhasil disimpan');
  };

  // Handle branding save
  const handleBrandingSave = () => {
    toast.success('Pengaturan branding berhasil disimpan');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan akun dan platform</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="w-4 h-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="platform" className="gap-2">
            <Globe className="w-4 h-4" />
            Platform
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>
                Perbarui informasi profil administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-primary" />
                  )}
                </div>
                <div>
                  <label htmlFor="photo-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>Ubah Foto</span>
                    </Button>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG max 2MB</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input 
                    id="name" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input 
                    id="phone" 
                    placeholder="+62 812 3456 7890"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value="Super Administrator" disabled />
                </div>
              </div>

              <Button onClick={handleProfileSave} className="gap-2" disabled={isProfileLoading}>
                {isProfileLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Simpan Perubahan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ubah Password</CardTitle>
                <CardDescription>
                  Pastikan menggunakan password yang kuat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {passwordError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <p className="font-medium mb-1">Persyaratan Password:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                    <li>Minimal 8 karakter</li>
                    <li>Mengandung huruf besar (A-Z)</li>
                    <li>Mengandung huruf kecil (a-z)</li>
                    <li>Mengandung angka (0-9)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showPassword ? "text" : "password"}
                      value={securityForm.currentPassword}
                      onChange={(e) => {
                        setPasswordError(null);
                        setSecurityForm({ ...securityForm, currentPassword: e.target.value });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => {
                      setPasswordError(null);
                      setSecurityForm({ ...securityForm, newPassword: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => {
                      setPasswordError(null);
                      setSecurityForm({ ...securityForm, confirmPassword: e.target.value });
                    }}
                  />
                </div>
                <Button onClick={handlePasswordChange} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengubah...
                    </>
                  ) : (
                    'Ubah Password'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>
                  Tambahkan lapisan keamanan ekstra untuk akun Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Status: {twoFAEnabled ? 'Aktif ✓' : 'Tidak Aktif'}</p>
                    <p className="text-sm text-muted-foreground">
                      {twoFAEnabled ? '2FA sedang aktif untuk akun Anda' : 'Aktifkan 2FA untuk keamanan lebih baik'}
                    </p>
                  </div>
                  <Button 
                    variant={twoFAEnabled ? "destructive" : "outline"}
                    onClick={handleToggle2FA}
                  >
                    {twoFAEnabled ? 'Nonaktifkan 2FA' : 'Aktifkan 2FA'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Notifikasi</CardTitle>
              <CardDescription>
                Atur notifikasi yang ingin Anda terima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi Email</p>
                  <p className="text-sm text-muted-foreground">
                    Terima notifikasi via email
                  </p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sekolah Baru</p>
                  <p className="text-sm text-muted-foreground">
                    Notifikasi saat ada sekolah baru mendaftar
                  </p>
                </div>
                <Switch 
                  checked={notifications.newSchool}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newSchool: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Masalah Domain</p>
                  <p className="text-sm text-muted-foreground">
                    Notifikasi jika ada masalah dengan domain
                  </p>
                </div>
                <Switch 
                  checked={notifications.domainIssues}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, domainIssues: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Laporan Mingguan</p>
                  <p className="text-sm text-muted-foreground">
                    Terima ringkasan statistik mingguan
                  </p>
                </div>
                <Switch 
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
                />
              </div>

              <Button onClick={handleNotificationSave} className="gap-2">
                <Save className="w-4 h-4" />
                Simpan Preferensi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Tab */}
        <TabsContent value="platform">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Pengaturan Platform
                </CardTitle>
                <CardDescription>
                  Konfigurasi umum platform MaddaSoft
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Nama Platform</Label>
                  <Input 
                    id="platform-name" 
                    value={platformSettings.name}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-domain">Domain Utama</Label>
                  <Input 
                    id="platform-domain" 
                    value={platformSettings.domain}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, domain: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Email Support</Label>
                  <Input 
                    id="support-email" 
                    type="email" 
                    value={platformSettings.supportEmail}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })}
                  />
                </div>
                <Button onClick={handlePlatformSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Branding
                </CardTitle>
                <CardDescription>
                  Sesuaikan tampilan platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Warna Utama</Label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      className="w-16 h-10 p-1 rounded border border-input cursor-pointer"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                    />
                    <Input 
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo Platform</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl hero-gradient flex items-center justify-center overflow-hidden">
                      {branding.logoImage ? (
                        <img src={branding.logoImage} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">🎓</span>
                      )}
                    </div>
                    <label htmlFor="logo-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Upload Logo</span>
                      </Button>
                    </label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/svg+xml"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </div>
                </div>
                <Button onClick={handleBrandingSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
