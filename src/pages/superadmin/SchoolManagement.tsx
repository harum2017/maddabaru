import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { schools as initialSchools, School } from '@/data/dummyData';
import { useDomain } from '@/contexts/DomainContext';
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Globe,
  Building2,
  Filter,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const SchoolManagement: React.FC = () => {
  const navigate = useNavigate();
  const { setSimulatedSchoolId } = useDomain();
  const [schoolList, setSchoolList] = useState<School[]>(initialSchools);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState<School | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    address: '',
    phone: '',
    email: '',
    theme_color: '#2563eb',
    is_active: true,
    level: 'SMA' as 'SD' | 'SMP' | 'SMA' | 'SMK',
  });

  const filteredSchools = schoolList.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && school.is_active) ||
      (statusFilter === 'inactive' && !school.is_active);
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSchool = () => {
    if (!formData.name || !formData.domain || !formData.email) {
      toast.error('Harap lengkapi field yang wajib diisi');
      return;
    }

    const newSchool: School = {
      id: Math.max(...schoolList.map(s => s.id)) + 1,
      name: formData.name,
      domain: formData.domain,
      logo: '/placeholder.svg',
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      theme_color: formData.theme_color,
      hero_images: [],
      vision: '',
      mission: [],
      about: '',
      is_active: formData.is_active,
      level: formData.level,
    };
    setSchoolList([...schoolList, newSchool]);
    toast.success('Sekolah berhasil ditambahkan');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditSchool = () => {
    if (!editingSchool) return;
    
    if (!formData.name || !formData.domain || !formData.email) {
      toast.error('Harap lengkapi field yang wajib diisi');
      return;
    }

    setSchoolList(schoolList.map(s => 
      s.id === editingSchool.id 
        ? { ...s, ...formData }
        : s
    ));
    toast.success('Sekolah berhasil diperbarui');
    setEditingSchool(null);
    resetForm();
  };

  const handleDeleteSchool = () => {
    if (!schoolToDelete) return;
    setSchoolList(schoolList.filter(s => s.id !== schoolToDelete.id));
    toast.success('Sekolah berhasil dihapus');
    setIsDeleteDialogOpen(false);
    setSchoolToDelete(null);
  };

  const handleToggleStatus = (id: number) => {
    setSchoolList(schoolList.map(s =>
      s.id === id ? { ...s, is_active: !s.is_active } : s
    ));
    const school = schoolList.find(s => s.id === id);
    toast.success(`Status ${school?.name} berhasil diubah`);
  };

  const handleViewWebsite = (schoolId: number) => {
    setSimulatedSchoolId(schoolId);
    navigate('/');
    toast.success('Mode simulasi aktif! Anda sekarang melihat website sekolah.');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      domain: '',
      address: '',
      phone: '',
      email: '',
      theme_color: '#2563eb',
      is_active: true,
      level: 'SMA',
    });
  };

  const openEditDialog = (school: School) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      domain: school.domain,
      address: school.address,
      phone: school.phone,
      email: school.email,
      theme_color: school.theme_color,
      is_active: school.is_active,
      level: school.level,
    });
  };

  const openDeleteDialog = (school: School) => {
    setSchoolToDelete(school);
    setIsDeleteDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kelola Sekolah</h1>
          <p className="text-muted-foreground">Manajemen data sekolah terdaftar di platform</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Sekolah
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Sekolah Baru</DialogTitle>
              <DialogDescription>
                Masukkan data sekolah yang akan didaftarkan ke platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Sekolah <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  placeholder="SMA Negeri 1 Contoh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Domain <span className="text-destructive">*</span></Label>
                <Input
                  id="domain"
                  placeholder="sman1contoh.sch.id"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@sman1contoh.sch.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  placeholder="(021) 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  placeholder="Jl. Pendidikan No. 1"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme_color">Warna Tema</Label>
                <div className="flex gap-2">
                  <Input
                    id="theme_color"
                    type="color"
                    className="w-16 h-10 p-1"
                    value={formData.theme_color}
                    onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                  />
                  <Input
                    value={formData.theme_color}
                    onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Aktifkan Sekolah</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddSchool}>Tambah Sekolah</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau domain sekolah..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Nonaktif</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== 'all') && (
              <Button variant="ghost" size="icon" onClick={clearFilters} title="Hapus filter">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Daftar Sekolah ({filteredSchools.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sekolah</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchools.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Tidak ada sekolah yang sesuai dengan filter'
                      : 'Belum ada sekolah terdaftar'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{
                            backgroundColor: `${school.theme_color}15`,
                            color: school.theme_color
                          }}
                        >
                          {school.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {school.address.split(',')[0]}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{school.domain}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{school.phone}</p>
                        <p className="text-muted-foreground">{school.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={school.is_active}
                        onCheckedChange={() => handleToggleStatus(school.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewWebsite(school.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Lihat Website
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(school)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteDialog(school)}
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
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingSchool} onOpenChange={(open) => !open && setEditingSchool(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Sekolah</DialogTitle>
            <DialogDescription>
              Perbarui data sekolah
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Sekolah <span className="text-destructive">*</span></Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-domain">Domain <span className="text-destructive">*</span></Label>
              <Input
                id="edit-domain"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
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
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Telepon</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Alamat</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-theme">Warna Tema</Label>
              <div className="flex gap-2">
                <Input
                  id="edit-theme"
                  type="color"
                  className="w-16 h-10 p-1"
                  value={formData.theme_color}
                  onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                />
                <Input
                  value={formData.theme_color}
                  onChange={(e) => setFormData({ ...formData, theme_color: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSchool(null)}>
              Batal
            </Button>
            <Button onClick={handleEditSchool}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus Sekolah</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus <strong>{schoolToDelete?.name}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteSchool}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchoolManagement;
