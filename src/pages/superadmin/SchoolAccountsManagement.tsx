import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Tabs removed - Super Admin only manages Admin Sekolah
import { 
  schools as initialSchools, 
  staff as initialStaff,
  dummyUsers,
  DummyUser,
  Staff
} from '@/data/dummyData';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserCog,
  Users,
  Building2,
  Shield,
  HelpCircle,
  KeyRound,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

interface SchoolAccount {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN_SEKOLAH';
  schoolId: number;
  schoolName: string;
  position: string;
  createdAt: string;
}

const SchoolAccountsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');
  // Super Admin only manages Admin Sekolah accounts
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SchoolAccount | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<SchoolAccount | null>(null);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [accountToReset, setAccountToReset] = useState<SchoolAccount | null>(null);

  // Convert dummy users to school accounts - ONLY Admin Sekolah
  const [accounts, setAccounts] = useState<SchoolAccount[]>(() => {
    return dummyUsers
      .filter(u => u.role === 'ADMIN_SEKOLAH')
      .map((u, index) => {
        const school = initialSchools.find(s => s.id === u.schoolId);
        const staffMember = initialStaff.find(s => s.school_id === u.schoolId && s.name === u.name);
        return {
          id: index + 1,
          email: u.email,
          name: u.name,
          role: 'ADMIN_SEKOLAH' as const,
          schoolId: u.schoolId!,
          schoolName: school?.name || 'Unknown',
          position: staffMember?.position || 'Admin Sekolah',
          createdAt: '2024-01-01',
        };
      });
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    schoolId: '',
    position: '',
  });

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.schoolName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSchool = schoolFilter === 'all' || account.schoolId.toString() === schoolFilter;
    
    return matchesSearch && matchesSchool;
  });

  const handleAddAccount = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.schoolId) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    // Check if email already exists
    if (accounts.some(a => a.email.toLowerCase() === formData.email.toLowerCase())) {
      toast.error('Email sudah terdaftar');
      return;
    }

    const school = initialSchools.find(s => s.id === parseInt(formData.schoolId));
    
    const newAccount: SchoolAccount = {
      id: Math.max(...accounts.map(a => a.id), 0) + 1,
      email: formData.email,
      name: formData.name,
      role: 'ADMIN_SEKOLAH',
      schoolId: parseInt(formData.schoolId),
      schoolName: school?.name || 'Unknown',
      position: formData.position || 'Admin Sekolah',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAccounts([...accounts, newAccount]);
    toast.success('Admin Sekolah berhasil ditambahkan. Akun otomatis terdaftar sebagai staff.');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditAccount = () => {
    if (!editingAccount) return;
    
    if (!formData.name || !formData.email) {
      toast.error('Harap lengkapi field yang wajib diisi');
      return;
    }

    setAccounts(accounts.map(a => 
      a.id === editingAccount.id 
        ? { 
            ...a, 
            name: formData.name,
            email: formData.email,
            position: formData.position,
          }
        : a
    ));
    toast.success('Akun berhasil diperbarui');
    setEditingAccount(null);
    resetForm();
  };

  const handleDeleteAccount = () => {
    if (!accountToDelete) return;
    setAccounts(accounts.filter(a => a.id !== accountToDelete.id));
    toast.success('Akun berhasil dihapus');
    setIsDeleteDialogOpen(false);
    setAccountToDelete(null);
  };

  const handleResetPassword = () => {
    if (!accountToReset) return;
    // In real app, this would send a password reset email or generate new password
    toast.success(`Password untuk ${accountToReset.email} berhasil direset. Password baru: admin123`);
    setIsResetPasswordDialogOpen(false);
    setAccountToReset(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      schoolId: '',
      position: '',
    });
  };

  const openEditDialog = (account: SchoolAccount) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      email: account.email,
      password: '',
      schoolId: account.schoolId.toString(),
      position: account.position,
    });
  };

  const openDeleteDialog = (account: SchoolAccount) => {
    setAccountToDelete(account);
    setIsDeleteDialogOpen(true);
  };

  const openResetPasswordDialog = (account: SchoolAccount) => {
    setAccountToReset(account);
    setIsResetPasswordDialogOpen(true);
  };

  const renderAccountTable = (accountList: SchoolAccount[], type: 'admin' | 'operator') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Sekolah</TableHead>
          <TableHead>Jabatan</TableHead>
          <TableHead className="w-[100px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountList.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              Tidak ada {type === 'admin' ? 'admin' : 'operator'} yang ditemukan
            </TableCell>
          </TableRow>
        ) : (
          accountList.map((account) => (
            <TableRow key={account.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    type === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {type === 'admin' ? <UserCog className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">Dibuat: {account.createdAt}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{account.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  <Building2 className="w-3 h-3 mr-1" />
                  {account.schoolName}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-sm">{account.position}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(account)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openResetPasswordDialog(account)}>
                      <KeyRound className="w-4 h-4 mr-2" />
                      Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => openDeleteDialog(account)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Kelola Admin Sekolah
          </h1>
          <p className="text-muted-foreground">
            Buat dan kelola akun Admin untuk setiap sekolah
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Tambah Admin Sekolah
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800">Alur Pembuatan Akun</p>
              <p className="text-blue-700 mt-1">
                1. Sekolah mendaftar ke platform → 2. Super Admin membuat akun Admin Sekolah → 
                3. Admin Sekolah otomatis terdaftar sebagai Staff → 4. Admin <strong>menunjuk</strong> pegawai sebagai Operator
              </p>
              <p className="text-blue-600 mt-2 text-xs italic">
                ⚠️ Super Admin tidak dapat membuat Operator langsung. Penunjukan Operator dilakukan oleh Admin Sekolah dari daftar pegawai.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, email, atau sekolah..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger className="w-[200px]">
                <Building2 className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Sekolah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Sekolah</SelectItem>
                {initialSchools.map(school => (
                  <SelectItem key={school.id} value={school.id.toString()}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Admin Sekolah List - No tabs, only Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            Daftar Admin Sekolah ({filteredAccounts.length})
          </CardTitle>
          <CardDescription>
            Admin Sekolah memiliki akses penuh untuk mengelola data sekolah dan dapat menunjuk Operator dari pegawai
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderAccountTable(filteredAccounts, 'admin')}
        </CardContent>
      </Card>

      {/* Add Account Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Admin Sekolah</DialogTitle>
            <DialogDescription>
              Buat akun Admin Sekolah baru. Admin akan otomatis terdaftar sebagai staff dan dapat menunjuk Operator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">📋 Alur Penunjukan:</p>
              <p className="text-xs text-blue-700 mt-1">
                Super Admin → Admin Sekolah → Admin menunjuk Operator dari pegawai
              </p>
            </div>
            <div className="space-y-2">
              <Label>Sekolah <span className="text-destructive">*</span></Label>
              <Select 
                value={formData.schoolId} 
                onValueChange={(value) => setFormData({ ...formData, schoolId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih sekolah" />
                </SelectTrigger>
                <SelectContent>
                  {initialSchools.map(school => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-name">Nama Lengkap <span className="text-destructive">*</span></Label>
              <Input
                id="add-name"
                placeholder="Nama lengkap pegawai"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-position">Jabatan di Sekolah</Label>
              <Input
                id="add-position"
                placeholder="Contoh: Wakil Kepala Sekolah, Tata Usaha"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Akun akan otomatis terdaftar sebagai staff di sekolah tersebut
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="add-email"
                type="email"
                placeholder="email@sekolah.sch.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-password">Password <span className="text-destructive">*</span></Label>
              <Input
                id="add-password"
                type="password"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
              Batal
            </Button>
            <Button onClick={handleAddAccount}>Tambah Akun</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Account Dialog */}
      <Dialog open={!!editingAccount} onOpenChange={(open) => !open && setEditingAccount(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Akun</DialogTitle>
            <DialogDescription>
              Perbarui informasi akun
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Lengkap <span className="text-destructive">*</span></Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Jabatan</Label>
              <Input
                id="edit-position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditingAccount(null); resetForm(); }}>
              Batal
            </Button>
            <Button onClick={handleEditAccount}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Akun</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus akun <strong>{accountToDelete?.name}</strong>?
              Akun tidak akan bisa mengakses sistem lagi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Hapus Akun
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mereset password untuk <strong>{accountToReset?.email}</strong>?
              Password baru akan dikirim ke email pengguna.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleResetPassword}>
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolAccountsManagement;
