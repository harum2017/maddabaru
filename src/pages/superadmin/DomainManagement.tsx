import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { schools } from '@/data/dummyData';
import {
  Search,
  Globe,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

interface DomainStatus {
  schoolId: number;
  domain: string;
  schoolName: string;
  status: 'active' | 'pending' | 'error';
  sslStatus: 'valid' | 'pending' | 'expired';
  lastChecked: string;
}

const DomainManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Generate domain status dari data sekolah
  const domainStatuses: DomainStatus[] = schools.map((school, index) => ({
    schoolId: school.id,
    domain: school.domain,
    schoolName: school.name,
    status: school.is_active ? 'active' : 'pending',
    sslStatus: school.is_active ? 'valid' : 'pending',
    lastChecked: '5 menit lalu',
  }));

  const filteredDomains = domainStatuses.filter(d =>
    d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: DomainStatus['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-accent/10 text-accent border-0 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Aktif
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-warning/10 text-warning border-0 gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-destructive/10 text-destructive border-0 gap-1">
            <AlertTriangle className="w-3 h-3" />
            Error
          </Badge>
        );
    }
  };

  const getSslBadge = (status: DomainStatus['sslStatus']) => {
    switch (status) {
      case 'valid':
        return <Badge variant="outline" className="text-accent border-accent/30">SSL Valid</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-warning border-warning/30">SSL Pending</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-destructive border-destructive/30">SSL Expired</Badge>;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Disalin ke clipboard');
  };

  const activeDomains = domainStatuses.filter(d => d.status === 'active').length;
  const pendingDomains = domainStatuses.filter(d => d.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Kelola Domain</h1>
        <p className="text-muted-foreground">Pantau dan kelola domain sekolah yang terhubung</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{domainStatuses.length}</p>
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
              <p className="text-2xl font-bold">{activeDomains}</p>
              <p className="text-sm text-muted-foreground">Domain Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-warning/10">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingDomains}</p>
              <p className="text-sm text-muted-foreground">Menunggu Verifikasi</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DNS Info */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-1">Konfigurasi DNS untuk Sekolah Baru</p>
              <p className="text-sm text-muted-foreground mb-3">
                Instruksikan sekolah untuk menambahkan A Record berikut pada DNS mereka:
              </p>
              <div className="flex items-center gap-2 p-3 bg-card rounded-lg">
                <code className="text-sm flex-1">A Record: @ → 185.158.133.1</code>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => copyToClipboard('185.158.133.1')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
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
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Cek Ulang Semua
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Status Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Sekolah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SSL</TableHead>
                <TableHead>Terakhir Dicek</TableHead>
                <TableHead className="w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDomains.map((domain) => (
                <TableRow key={domain.schoolId}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{domain.schoolName}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(domain.status)}
                  </TableCell>
                  <TableCell>
                    {getSslBadge(domain.sslStatus)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{domain.lastChecked}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(`https://${domain.domain}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toast.info('Mengecek status domain...')}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManagement;
