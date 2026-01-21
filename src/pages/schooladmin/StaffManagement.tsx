import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  UserPlus, 
  Mail, 
  Phone, 
  Shield, 
  FileText,
  BadgeCheck,
  User,
  GraduationCap,
  Briefcase,
  Users,
  CreditCard,
  Heart,
  Camera,
  Upload
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Staff } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { useStaff } from '@/contexts/StaffContext';
import { toast } from 'sonner';

const StaffManagement: React.FC = () => {
  const { user } = useAuth();
  const { simulatedSchoolId } = useDomain();
  const { staffList: allStaff, updateStaff, addStaff, deleteStaff } = useStaff();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter staff by school
  const staffList = allStaff.filter(s => s.school_id === schoolId);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Staff>>({
    name: '',
    nip: '',
    nik: '',
    position: '',
    class_or_subject: '',
    employment_status: 'Honorer',
    gender: 'L',
    phone: '',
    email: '',
    address: '',
    is_public: true,
    photo: '',
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
        toast.success('Foto profil berhasil diunggah');
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nip.includes(searchQuery) ||
    s.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddDialog = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      nip: '',
      nik: '',
      position: '',
      class_or_subject: '',
      employment_status: 'Honorer',
      gender: 'L',
      phone: '',
      email: '',
      address: '',
      is_public: true,
      photo: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData(staff);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
      deleteStaff(id);
      toast.success('Data pegawai berhasil dihapus');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Form yang Ketat
    if (!formData.name || formData.name.length < 3) {
      toast.error('Nama Lengkap minimal 3 karakter');
      return;
    }

    if (formData.nip && !/^\d+$/.test(formData.nip)) {
      toast.error('NIP/NIY hanya boleh berisi angka');
      return;
    }

    if (formData.nik && (!/^\d{16}$/.test(formData.nik))) {
      toast.error('NIK harus 16 digit angka');
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Format Email Personal tidak valid');
      return;
    }

    if (!formData.phone || !/^\d{10,15}$/.test(formData.phone)) {
      toast.error('Nomor Telepon harus 10-15 digit angka');
      return;
    }

    if (editingStaff) {
      updateStaff(editingStaff.id, formData);
      toast.success('Data pegawai berhasil diperbarui');
    } else {
      const newStaff: Staff = {
        ...formData as Staff,
        id: Math.max(...allStaff.map(s => s.id), 0) + 1,
        school_id: schoolId,
        is_public: true
      };
      addStaff(newStaff);
      toast.success('Pegawai baru berhasil ditambahkan');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pegawai</h1>
          <p className="text-muted-foreground">Kelola data guru dan tenaga kependidikan sekolah Anda.</p>
        </div>
        <Button onClick={handleOpenAddDialog} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Tambah Pegawai
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari Nama, NIP, atau Jabatan..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="PNS">PNS</SelectItem>
                <SelectItem value="PPPK">PPPK</SelectItem>
                <SelectItem value="Honorer">Honorer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pegawai</TableHead>
                  <TableHead>Identitas</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border shrink-0">
                            {staff.photo ? (
                              <img src={staff.photo} alt={staff.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-bold text-primary">{staff.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{staff.name}</p>
                            <p className="text-xs text-muted-foreground">{staff.email || staff.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs space-y-0.5">
                          <p className="font-medium">NIP: {staff.nip || '-'}</p>
                          <p className="text-muted-foreground">NIK: {staff.nik || '-'}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <p className="font-medium">{staff.position}</p>
                          <p className="text-muted-foreground">{staff.class_or_subject}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          staff.employment_status === 'PNS' ? 'default' : 
                          staff.employment_status === 'PPPK' ? 'outline' : 
                          'secondary'
                        }>
                          {staff.employment_status || 'Honorer'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => handleEdit(staff)}>
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(staff.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      Data pegawai tidak ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6">
              <DialogTitle>
                {editingStaff ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
              </DialogTitle>
              <DialogDescription>
                Lengkapi seluruh informasi kepegawaian sesuai standar Simpeg/BKPSDM.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="personal" className="w-full">
              <div className="px-6 border-b">
                <TabsList className="h-10 bg-transparent p-0 gap-6 overflow-x-auto overflow-y-hidden custom-scrollbar">
                  <TabsTrigger value="personal" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-semibold whitespace-nowrap">
                    Data Diri
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-semibold whitespace-nowrap">
                    Kepegawaian
                  </TabsTrigger>
                  <TabsTrigger value="family" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-semibold whitespace-nowrap">
                    Keluarga
                  </TabsTrigger>
                  <TabsTrigger value="insurance" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 font-semibold whitespace-nowrap">
                    Asuransi & Pajak
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <TabsContent value="personal" className="mt-0 space-y-6">
                  {/* Photo Upload Section */}
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-muted border-2 border-dashed border-primary/20 flex items-center justify-center">
                        {formData.photo ? (
                          <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Foto Profil</p>
                      <p className="text-xs text-muted-foreground">Format: JPG, PNG. Maks 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Lengkap</Label>
                      <Input value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>NIK</Label>
                      <Input value={formData.nik || ''} onChange={(e) => setFormData({...formData, nik: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Tempat Lahir</Label>
                      <Input value={formData.birth_place || ''} onChange={(e) => setFormData({...formData, birth_place: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal Lahir</Label>
                      <Input type="date" value={formData.birth_date || ''} onChange={(e) => setFormData({...formData, birth_date: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Jenis Kelamin</Label>
                      <Select value={formData.gender || 'L'} onValueChange={(v: any) => setFormData({...formData, gender: v})}>
                        <SelectTrigger><SelectValue placeholder="Pilih Gender" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Personal</Label>
                      <Input type="email" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Telepon/WA</Label>
                      <Input value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Status Pernikahan</Label>
                      <Select value={formData.marriage_status || ''} onValueChange={(v: any) => setFormData({...formData, marriage_status: v})}>
                        <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Menikah">Menikah</SelectItem>
                          <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                          <SelectItem value="Cerai Hidup">Cerai Hidup</SelectItem>
                          <SelectItem value="Cerai Mati">Cerai Mati</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat Lengkap</Label>
                    <Input value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>NIP / NIY / NUPTK</Label>
                      <Input value={formData.nip || ''} onChange={(e) => setFormData({...formData, nip: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Status Kepegawaian</Label>
                      <Select value={formData.employment_status || 'Honorer'} onValueChange={(v: any) => setFormData({...formData, employment_status: v})}>
                        <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PNS">PNS</SelectItem>
                          <SelectItem value="PPPK">PPPK</SelectItem>
                          <SelectItem value="Honorer">Honorer</SelectItem>
                          <SelectItem value="Tetap Yayasan">Tetap Yayasan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Jabatan</Label>
                      <Input value={formData.position || ''} onChange={(e) => setFormData({...formData, position: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Tugas Utama</Label>
                      <Input value={formData.class_or_subject || ''} onChange={(e) => setFormData({...formData, class_or_subject: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Pangkat/Golongan</Label>
                      <Input value={formData.rank_grade || ''} onChange={(e) => setFormData({...formData, rank_grade: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>TMT Kerja</Label>
                      <Input type="date" value={formData.tmt_employment || ''} onChange={(e) => setFormData({...formData, tmt_employment: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Pendidikan Terakhir</Label>
                      <Select value={formData.education_level || ''} onValueChange={(v: any) => setFormData({...formData, education_level: v})}>
                        <SelectTrigger><SelectValue placeholder="Pilih Jenjang" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SMA">SMA</SelectItem>
                          <SelectItem value="D3">Diploma (D3)</SelectItem>
                          <SelectItem value="S1">Sarjana (S1)</SelectItem>
                          <SelectItem value="S2">Magister (S2)</SelectItem>
                          <SelectItem value="S3">Doktor (S3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Jurusan</Label>
                      <Input value={formData.major || ''} onChange={(e) => setFormData({...formData, major: e.target.value})} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="family" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Suami/Istri</Label>
                      <Input value={formData.spouse_name || ''} onChange={(e) => setFormData({...formData, spouse_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Jumlah Anak</Label>
                      <Input type="number" value={formData.children_count ?? ''} onChange={(e) => setFormData({...formData, children_count: parseInt(e.target.value) || 0})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Nama Ayah Kandung</Label>
                      <Input value={formData.father_name || ''} onChange={(e) => setFormData({...formData, father_name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Nama Ibu Kandung</Label>
                      <Input value={formData.mother_name || ''} onChange={(e) => setFormData({...formData, mother_name: e.target.value})} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insurance" className="mt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>No. NPWP</Label>
                      <Input value={formData.npwp || ''} onChange={(e) => setFormData({...formData, npwp: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Kartu Taspen</Label>
                      <Input value={formData.taspen || ''} onChange={(e) => setFormData({...formData, taspen: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>BPJS Ketenagakerjaan</Label>
                      <Input value={formData.bpjs_ketenagakerjaan || ''} onChange={(e) => setFormData({...formData, bpjs_ketenagakerjaan: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>BPJS Kesehatan</Label>
                      <Input value={formData.bpjs_kesehatan || ''} onChange={(e) => setFormData({...formData, bpjs_kesehatan: e.target.value})} />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <DialogFooter className="p-6 border-t gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button type="submit">{editingStaff ? 'Simpan Perubahan' : 'Simpan Data'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement;