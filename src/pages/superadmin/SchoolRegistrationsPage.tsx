import React, { useState } from 'react';
import { getSchoolRegistrations, getPendingSchoolRegistrations, SchoolRegistration } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, Eye, Building2, Phone, Mail, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

const SchoolRegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState(getSchoolRegistrations());
  const [selectedRegistration, setSelectedRegistration] = useState<SchoolRegistration | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRegistrations = registrations.filter(reg => {
    if (filterStatus === 'all') return true;
    return reg.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: number) => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === id ? { ...reg, status: 'approved' as const } : reg
    ));
    toast.success('Pendaftaran sekolah telah disetujui');
  };

  const handleReject = (id: number) => {
    setRegistrations(prev => prev.map(reg =>
      reg.id === id ? { ...reg, status: 'rejected' as const } : reg
    ));
    toast.success('Pendaftaran sekolah telah ditolak');
  };

  const handleViewDetails = (registration: SchoolRegistration) => {
    setSelectedRegistration(registration);
    setIsDetailDialogOpen(true);
  };

  const pendingCount = getPendingSchoolRegistrations().length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pendaftaran Sekolah</h1>
          <p className="text-muted-foreground">
            Kelola pendaftaran sekolah yang ingin bergabung dengan platform
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {pendingCount} menunggu persetujuan
          </Badge>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendaftaran</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sudah Diproses</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(r => r.status !== 'pending').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter">Filter Status:</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Sekolah</TableHead>
                  <TableHead>Jenjang</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{registration.school_name}</div>
                        <div className="text-sm text-muted-foreground">{registration.domain}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{registration.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{registration.contact_person}</div>
                        <div className="text-muted-foreground">{registration.contact_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(registration.registration_date).toLocaleDateString('id-ID')}</TableCell>
                    <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(registration)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {registration.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(registration.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleReject(registration.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pendaftaran Sekolah</DialogTitle>
            <DialogDescription>
              Informasi lengkap pendaftaran sekolah
            </DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Nama Sekolah</Label>
                  <p className="text-sm">{selectedRegistration.school_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Domain</Label>
                  <p className="text-sm">{selectedRegistration.domain}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Jenjang</Label>
                  <p className="text-sm">{selectedRegistration.level}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedRegistration.status)}</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Alamat
                </Label>
                <p className="text-sm">{selectedRegistration.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telepon
                  </Label>
                  <p className="text-sm">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <p className="text-sm">{selectedRegistration.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Contact Person
                  </Label>
                  <p className="text-sm">{selectedRegistration.contact_person}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">No. HP Contact</Label>
                  <p className="text-sm">{selectedRegistration.contact_phone}</p>
                </div>
              </div>

              {selectedRegistration.notes && (
                <div>
                  <Label className="text-sm font-medium">Catatan</Label>
                  <p className="text-sm">{selectedRegistration.notes}</p>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Tanggal Pendaftaran</Label>
                <p className="text-sm">{new Date(selectedRegistration.registration_date).toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolRegistrationsPage;