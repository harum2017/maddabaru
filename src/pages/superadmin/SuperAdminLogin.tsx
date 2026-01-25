import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const SuperAdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated, user } = useAuth();
  const { isPlatformDomain, isSchoolDomain } = useDomain();
  const navigate = useNavigate();

  // Redirect jika sedang di domain sekolah - harus login via /school-login
  useEffect(() => {
    if (isSchoolDomain) {
      navigate('/school-login');
    }
  }, [isSchoolDomain, navigate]);

  // Redirect jika sudah login sebagai super admin
  useEffect(() => {
    if (isAuthenticated && user?.role === 'SUPER_ADMIN') {
      navigate('/domain-pusat/admin');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password, 'SUPER_ADMIN');
      if (result.success) {
        toast.success('Login berhasil!');
        navigate('/domain-pusat/admin');
      } else {
        setError(result.message || 'Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">MaddaSoft</h1>
              <p className="text-sm text-muted-foreground">Platform Management</p>
            </div>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Super Admin Login</CardTitle>
            <CardDescription>
              Masuk untuk mengelola platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="superadmin@maddasoft.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full font-bold h-11" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk ke Dashboard'
                )}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-muted text-center">
              <button 
                type="button" 
                className="text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
                onClick={() => toast.info("Silakan hubungi tim teknis MaddaSoft untuk reset password.")}
              >
                Lupa Password?
              </button>
            </div>

            {/* Dev Hint - Only shown in DEV mode */}
            {isPlatformDomain && import.meta.env.DEV && (
              <div className="mt-6 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground text-center mb-2">
                  🔧 Mode Development
                </p>
                <p className="text-xs text-center">
                  Email: <code className="bg-background px-1 rounded">superadmin@maddasoft.id</code>
                </p>
                <p className="text-xs text-center">
                  Password: <code className="bg-background px-1 rounded">admin123</code>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary">← Kembali ke Beranda</a>
        </p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
