import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getDummyUsersBySchoolId } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Loader2, AlertCircle, UserCog, Users, ArrowLeft, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SchoolLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'admin' | 'operator'>('admin');
  
  const { login, isAuthenticated, user } = useAuth();
  const { currentSchool, isDevMode, simulatedSchoolId } = useDomain();
  const navigate = useNavigate();

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'ADMIN_SEKOLAH') {
        navigate('/admin');
      } else if (user.role === 'OPERATOR') {
        navigate('/operator');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Redirect jika bukan domain sekolah
  useEffect(() => {
    if (!currentSchool) {
      navigate('/');
    }
  }, [currentSchool, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const targetRole = activeTab === 'admin' ? 'ADMIN_SEKOLAH' : 'OPERATOR';

    try {
      const result = await login(email, password, targetRole, currentSchool?.id);
      
      if (result.success) {
        toast.success('Login berhasil!');
        if (targetRole === 'ADMIN_SEKOLAH') {
          navigate('/admin');
        } else {
          navigate('/operator');
        }
      } else {
        setError(result.message || 'Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get dummy users for current school (harus konsisten dengan AuthContext)
  const dummyUsers = currentSchool ? getDummyUsersBySchoolId(currentSchool.id) : [];
  const adminUser = dummyUsers.find(u => u.role === 'ADMIN_SEKOLAH');
  const operatorUser = dummyUsers.find(u => u.role === 'OPERATOR');

  if (!currentSchool) {
    return null;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: `linear-gradient(135deg, ${currentSchool.theme_color}15 0%, ${currentSchool.theme_color}05 100%)` 
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: currentSchool.theme_color }}
            >
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold line-clamp-1">{currentSchool.name}</h1>
              <p className="text-sm text-muted-foreground">Portal Login</p>
            </div>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Masuk ke Panel</CardTitle>
            <CardDescription>
              Pilih jenis akun untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'admin' | 'operator')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="operator" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Operator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email Admin</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@sekolah.sch.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 font-bold" 
                    disabled={isLoading}
                    style={{ backgroundColor: currentSchool.theme_color }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Masuk sebagai Admin'
                    )}
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t border-border text-center">
                  <button 
                    type="button" 
                    className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
                    onClick={() => toast.info(`Silakan hubungi Admin ${currentSchool.name} untuk reset password.`)}
                  >
                    Lupa Password?
                  </button>
                </div>

                {/* Dev Mode Hint for Admin - Only shown in DEV mode and development build */}
                {isDevMode && adminUser && import.meta.env.DEV && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      🔧 Mode Development - Akun Admin
                    </p>
                    <p className="text-xs text-center">
                      Email: <code className="bg-background px-1 rounded">{adminUser.email}</code>
                    </p>
                    <p className="text-xs text-center">
                      Password: <code className="bg-background px-1 rounded">admin123</code>
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="operator">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="operator-email">Email Operator</Label>
                    <Input
                      id="operator-email"
                      type="email"
                      placeholder="operator@sekolah.sch.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operator-password">Password</Label>
                    <Input
                      id="operator-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-11 font-bold" 
                    disabled={isLoading}
                    style={{ backgroundColor: currentSchool.theme_color }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      'Masuk sebagai Operator'
                    )}
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t border-border text-center">
                  <button 
                    type="button" 
                    className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
                    onClick={() => toast.info(`Silakan hubungi Admin ${currentSchool.name} untuk reset password.`)}
                  >
                    Lupa Password?
                  </button>
                </div>

                {/* Dev Mode Hint for Operator - Only shown in DEV mode and development build */}
                {isDevMode && operatorUser && import.meta.env.DEV && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      🔧 Mode Development - Akun Operator
                    </p>
                    <p className="text-xs text-center">
                      Email: <code className="bg-background px-1 rounded">{operatorUser.email}</code>
                    </p>
                    <p className="text-xs text-center">
                      Password: <code className="bg-background px-1 rounded">admin123</code>
                    </p>
                  </div>
                )}

                {!operatorUser && isDevMode && import.meta.env.DEV && (
                  <div className="mt-4 p-3 bg-amber-500/10 text-amber-700 rounded-lg">
                    <p className="text-xs text-center">
                      ⚠️ Belum ada operator untuk sekolah ini
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Help Dialog */}
            <div className="mt-6 flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Bantuan Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bantuan Login</DialogTitle>
                    <DialogDescription>
                      Panduan untuk masuk ke panel pengelolaan sekolah
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">Admin Sekolah</h4>
                      <p className="text-muted-foreground">
                        Admin memiliki akses penuh untuk mengelola seluruh konten sekolah, 
                        termasuk data guru, siswa, dan pengaturan website.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Operator</h4>
                      <p className="text-muted-foreground">
                        Operator bertugas mengelola konten website seperti berita, 
                        galeri foto, dan halaman informasi.
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-muted-foreground">
                        Jika Anda lupa password atau mengalami kendala, 
                        hubungi administrator sekolah.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Website
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchoolLogin;
