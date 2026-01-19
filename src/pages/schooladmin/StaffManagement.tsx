import React, { useState } from 'react';
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
  Briefcase
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
import { staff as initialStaff, Staff } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { toast } from 'sonner';

const StaffManagement: React.FC = () => {
  const { user } = useAuth();
  const { simulatedSchoolId } = useDomain();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;

  const [staffList, setStaffList] = useState<Staff[]>(
    initialStaff.filter(s => s.school_id === schoolId)
  );
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
    address: '',
    is_public: true,
  });

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
      address: '',
      is_public: true,
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
      setStaffList(prev => prev.filter(s => s.id !== id));
      toast.success('Data pegawai berhasil dihapus');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...formData } as Staff : s));
      toast.success('Data pegawai berhasil diperbarui');
    } else {
      const newStaff: Staff = {
        ...formData as Staff,
        id: Math.max(...staffList.map(s => s.id), 0) + 1,
        school_id: schoolId,
        is_public: true
      };
      setStaffList(prev => [newStaff, ...prev]);
      toast.success('Pegawai baru berhasil ditambahkan');
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase">Manajemen Pegawai (SIMPEG)</h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">Sistem Informasi Manajemen Kepegawaian</p>
        </div>
        <Button onClick={handleOpenAddDialog} className="gap-2 font-black rounded-none border-b-4 border-r-4 border-black/20 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-tight">
          <UserPlus className="w-4 h-4" />
          Tambah Pegawai
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Cari Nama, NIP, atau Jabatan..." 
            className="pl-10 rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px] rounded-none border-2 border-black font-black uppercase text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-2 border-black font-black uppercase">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="PNS">PNS</SelectItem>
            <SelectItem value="PPPK">PPPK</SelectItem>
            <SelectItem value="Honorer">Honorer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black hover:bg-black">
              <TableRow className="hover:bg-black border-b-2 border-white/20">
                <TableHead className="text-white font-black uppercase tracking-widest text-[10px]">Pegawai</TableHead>
                <TableHead className="text-white font-black uppercase tracking-widest text-[10px]">Identitas (NIP/NIK)</TableHead>
                <TableHead className="text-white font-black uppercase tracking-widest text-[10px]">Jabatan & Tugas</TableHead>
                <TableHead className="text-white font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="text-right text-white font-black uppercase tracking-widest text-[10px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <TableRow key={staff.id} className="border-b-2 border-black/10 hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-none border-2 border-black bg-primary/10 flex items-center justify-center font-black text-primary">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-sm uppercase tracking-tighter">{staff.name}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{staff.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-tighter">NIP: {staff.nip || '-'}</p>
                        <p className="text-[11px] font-bold text-muted-foreground">NIK: {staff.nik || '-'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-tighter">{staff.position}</p>
                        <p className="text-[11px] font-bold text-primary uppercase">{staff.class_or_subject}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-none border-2 border-black font-black text-[9px] uppercase tracking-widest ${
                        staff.employment_status === 'PNS' ? 'bg-blue-500 text-white' : 
                        staff.employment_status === 'PPPK' ? 'bg-green-500 text-white' : 
                        'bg-yellow-400 text-black'
                      }`}>
                        {staff.employment_status || 'Honorer'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-black hover:text-white rounded-none">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-none border-2 border-black font-black uppercase text-[10px]">
                          <DropdownMenuItem className="gap-2 focus:bg-primary focus:text-white" onClick={() => handleEdit(staff)}>
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit Data
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive focus:text-white" onClick={() => handleDelete(staff.id)}>
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
                  <TableCell colSpan={5} className="h-32 text-center font-black text-muted-foreground uppercase tracking-widest text-xs">
                    Data pegawai tidak ditemukan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-4 border-black rounded-none shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 bg-black text-white">
              <DialogTitle className="text-xl font-black uppercase tracking-tighter">
                {editingStaff ? 'EDIT DATA PEGAWAI' : 'TAMBAH PEGAWAI BARU'}
              </DialogTitle>
              <DialogDescription className="text-white/60 font-bold uppercase text-[10px] tracking-widest">
                Pastikan data yang diisi sesuai dengan dokumen kepegawaian (Simpeg/BKPSDM).
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="personal" className="w-full">
              <div className="px-6 border-b-4 border-black bg-muted/30">
                <TabsList className="h-12 bg-transparent p-0 gap-4">
                  <TabsTrigger 
                    value="personal" 
                    className="rounded-none border-b-4 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent font-black uppercase text-[10px] tracking-widest px-0"
                  >
                    <User className="w-3.5 h-3.5 mr-2" />
                    Data Diri
                  </TabsTrigger>
                  <TabsTrigger 
                    value="employment" 
                    className="rounded-none border-b-4 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent font-black uppercase text-[10px] tracking-widest px-0"
                  >
                    <Briefcase className="w-3.5 h-3.5 mr-2" />
                    Kepegawaian
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education" 
                    className="rounded-none border-b-4 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent font-black uppercase text-[10px] tracking-widest px-0"
                  >
                    <GraduationCap className="w-3.5 h-3.5 mr-2" />
                    Pendidikan
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <TabsContent value="personal" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Nama Lengkap (Tanpa Gelar)</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">NIK (No. Induk Kependudukan)</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.nik}
                        onChange={(e) => setFormData({...formData, nik: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Tempat Lahir</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.birth_place}
                        onChange={(e) => setFormData({...formData, birth_place: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Tanggal Lahir</Label>
                      <Input 
                        type="date" 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.birth_date}
                        onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Jenis Kelamin</Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(v: 'L' | 'P') => setFormData({...formData, gender: v})}
                      >
                        <SelectTrigger className="rounded-none border-2 border-black font-black uppercase text-xs">
                          <SelectValue placeholder="Pilih Gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-2 border-black font-black uppercase">
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">No. Telepon/WA</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Alamat Lengkap</Label>
                    <Input 
                      className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required 
                    />
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">NIP / NIY / NUPTK</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.nip}
                        onChange={(e) => setFormData({...formData, nip: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Status Kepegawaian</Label>
                      <Select 
                        value={formData.employment_status} 
                        onValueChange={(v: any) => setFormData({...formData, employment_status: v})}
                      >
                        <SelectTrigger className="rounded-none border-2 border-black font-black uppercase text-xs">
                          <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-2 border-black font-black uppercase">
                          <SelectItem value="PNS">PNS</SelectItem>
                          <SelectItem value="PPPK">PPPK</SelectItem>
                          <SelectItem value="Honorer">Honorer</SelectItem>
                          <SelectItem value="Tetap Yayasan">Tetap Yayasan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Jabatan</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        placeholder="Contoh: Guru Madya / Wakasek"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Tugas Utama (Mata Pelajaran/Kelas)</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        placeholder="Contoh: Matematika / Guru Kelas I"
                        value={formData.class_or_subject}
                        onChange={(e) => setFormData({...formData, class_or_subject: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Golongan / Pangkat</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        placeholder="Contoh: III/a - Penata Muda"
                        value={formData.rank_grade}
                        onChange={(e) => setFormData({...formData, rank_grade: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">TMT Kepegawaian</Label>
                      <Input 
                        type="date" 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        value={formData.tmt_employment}
                        onChange={(e) => setFormData({...formData, tmt_employment: e.target.value})}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-0 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Pendidikan Terakhir</Label>
                      <Select 
                        value={formData.education_level} 
                        onValueChange={(v: any) => setFormData({...formData, education_level: v})}
                      >
                        <SelectTrigger className="rounded-none border-2 border-black font-black uppercase text-xs">
                          <SelectValue placeholder="Pilih Jenjang" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-2 border-black font-black uppercase">
                          <SelectItem value="SMA">SMA / Sederajat</SelectItem>
                          <SelectItem value="D3">Diploma (D3)</SelectItem>
                          <SelectItem value="S1">Sarjana (S1 / D4)</SelectItem>
                          <SelectItem value="S2">Magister (S2)</SelectItem>
                          <SelectItem value="S3">Doktor (S3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest">Jurusan / Program Studi</Label>
                      <Input 
                        className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-primary" 
                        placeholder="Contoh: Pendidikan Matematika"
                        value={formData.major}
                        onChange={(e) => setFormData({...formData, major: e.target.value})}
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="p-6 bg-muted/30 border-t-4 border-black flex justify-end gap-3">
              <Button type="button" variant="outline" className="rounded-none border-2 border-black font-black uppercase tracking-tight" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="rounded-none border-b-4 border-r-4 border-black/20 font-black uppercase tracking-tight px-8">
                {editingStaff ? 'Simpan Perubahan' : 'Simpan Pegawai'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement;