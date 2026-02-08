import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import {
  Search,
  Globe,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Edit3,
  Shield,
  Server,
  Loader2,
  HelpCircle,
  Link2,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useDomainManagement, SchoolDomain, DomainStatus } from '@/hooks/useDomainManagement';

const DomainManagement: React.FC = () => {
  const {
    schools,
    loading,
    checkingAll,
    fetchSchools,
    checkDomainStatus,
    checkAllDomains,
    updateDomain,
    assignSubdomain,
    generateSubdomain,
    toggleActive,
    platformDomain,
  } = useDomainManagement();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingSchool, setEditingSchool] = useState<SchoolDomain | null>(null);
  const [editDomain, setEditDomain] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const filteredSchools = schools.filter(s =>
    s.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = schools.filter(s => s.is_active).length;
  const verifiedCount = schools.filter(s => s.domainStatus?.dnsStatus === 'active').length;
  const subdomainCount = schools.filter(s => s.domain.endsWith(platformDomain)).length;

  const getDnsStatusBadge = (status?: DomainStatus) => {
    if (!status) {
      return (
        <Badge variant="outline" className="gap-1 text-muted-foreground">
          <HelpCircle className="w-3 h-3" />
          Belum Dicek
        </Badge>
      );
    }

    switch (status.dnsStatus) {
      case 'active':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-accent/10 text-accent border-0 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  DNS Aktif
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{status.dnsMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'pending':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-warning/10 text-warning border-0 gap-1">
                  <Clock className="w-3 h-3" />
                  DNS Pending
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{status.dnsMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case 'error':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="bg-destructive/10 text-destructive border-0 gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  DNS Error
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{status.dnsMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const getSslStatusBadge = (status?: DomainStatus) => {
    if (!status) return null;

    switch (status.sslStatus) {
      case 'valid':
        return (
          <Badge variant="outline" className="text-accent border-accent/30 gap-1">
            <Shield className="w-3 h-3" />
            SSL Valid
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="text-warning border-warning/30 gap-1">
            <Clock className="w-3 h-3" />
            SSL Pending
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="text-destructive border-destructive/30 gap-1">
            <XCircle className="w-3 h-3" />
            SSL Expired
          </Badge>
        );
      case 'none':
        return (
          <Badge variant="outline" className="text-muted-foreground gap-1">
            <XCircle className="w-3 h-3" />
            No SSL
          </Badge>
        );
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Disalin ke clipboard');
  };

  const handleEditDomain = (school: SchoolDomain) => {
    setEditingSchool(school);
    setEditDomain(school.domain);
  };

  const handleSaveDomain = async () => {
    if (!editingSchool) return;
    setSaving(true);
    const success = await updateDomain(editingSchool.id, editDomain);
    setSaving(false);
    if (success) {
      setEditingSchool(null);
      // Auto-check the new domain
      setTimeout(() => checkDomainStatus(editingSchool.id, editDomain), 1000);
    }
  };

  const handleAssignSubdomain = async (school: SchoolDomain) => {
    const success = await assignSubdomain(school.id, school.name);
    if (success) {
      const subdomain = generateSubdomain(school.name);
      setTimeout(() => checkDomainStatus(school.id, subdomain), 1000);
    }
  };

  const isSubdomain = (domain: string) => domain.endsWith(platformDomain);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Kelola Domain</h1>
        <p className="text-muted-foreground">Kelola domain dan subdomain untuk setiap sekolah</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{schools.length}</p>
              <p className="text-sm text-muted-foreground">Total Domain</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <CheckCircle2 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Domain Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Server className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{verifiedCount}</p>
              <p className="text-sm text-muted-foreground">DNS Terverifikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <Link2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{subdomainCount}</p>
              <p className="text-sm text-muted-foreground">Subdomain Platform</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DNS Configuration Info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">Konfigurasi DNS untuk Domain Kustom</p>
              <p className="text-sm text-muted-foreground mb-3">
                Sekolah yang menggunakan domain sendiri harus menambahkan A Record berikut:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2 p-3 bg-card rounded-lg flex-1">
                  <code className="text-sm flex-1">A Record: @ → 185.158.133.1</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard('185.158.133.1')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-3 bg-card rounded-lg flex-1">
                  <code className="text-sm flex-1">A Record: www → 185.158.133.1</code>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard('185.158.133.1')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Sekolah tanpa domain kustom dapat menggunakan subdomain platform: <strong>nama-sekolah.{platformDomain}</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari domain atau nama sekolah..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={checkAllDomains}
              disabled={checkingAll || schools.length === 0}
            >
              {checkingAll ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {checkingAll ? 'Memeriksa...' : 'Cek Semua DNS'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domain Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Domain Sekolah</CardTitle>
          <CardDescription>
            Kelola domain kustom dan subdomain untuk setiap sekolah
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 flex-1" />
                  <Skeleton className="h-12 w-24" />
                  <Skeleton className="h-12 w-24" />
                </div>
              ))}
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada data sekolah</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Sekolah</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status DNS</TableHead>
                  <TableHead>SSL</TableHead>
                  <TableHead>Aktif</TableHead>
                  <TableHead className="w-[120px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium font-mono text-sm">{school.domain}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{school.name}</span>
                    </TableCell>
                    <TableCell>
                      {isSubdomain(school.domain) ? (
                        <Badge variant="secondary" className="gap-1">
                          <Link2 className="w-3 h-3" />
                          Subdomain
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Globe className="w-3 h-3" />
                          Kustom
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {school.isChecking ? (
                        <Badge variant="outline" className="gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Memeriksa...
                        </Badge>
                      ) : (
                        getDnsStatusBadge(school.domainStatus)
                      )}
                    </TableCell>
                    <TableCell>
                      {getSslStatusBadge(school.domainStatus)}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={school.is_active}
                        onCheckedChange={(checked) => toggleActive(school.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditDomain(school)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Domain</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => checkDomainStatus(school.id, school.domain)}
                                disabled={school.isChecking}
                              >
                                {school.isChecking ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-4 h-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Cek Status</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(`https://${school.domain}`, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Buka Situs</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Domain Dialog */}
      <Dialog open={!!editingSchool} onOpenChange={() => setEditingSchool(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Domain</DialogTitle>
            <DialogDescription>
              Ubah domain untuk {editingSchool?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                value={editDomain}
                onChange={(e) => setEditDomain(e.target.value.toLowerCase())}
                placeholder="contoh: sdn1-surabaya.sch.id"
              />
              <p className="text-xs text-muted-foreground">
                Gunakan domain kustom atau subdomain platform
              </p>
            </div>

            {editingSchool && !isSubdomain(editDomain) && (
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setEditDomain(generateSubdomain(editingSchool.name))}
              >
                <Link2 className="w-4 h-4" />
                Gunakan Subdomain Platform
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSchool(null)}>
              Batal
            </Button>
            <Button onClick={handleSaveDomain} disabled={saving || !editDomain}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainManagement;
