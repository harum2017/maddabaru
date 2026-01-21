import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { getClassesByLevel, getStudentsBySchool } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search, Upload, Download, Info, BookOpen, Users, User, MapPin, Heart, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface Student {
  id: number;
  school_id: number;
  name: string;
  class: string;
  nis: string;
  nisn?: string;
  gender: 'L' | 'P';
  birth_place?: string;
  birth_date?: string;
  religion?: string;
  address?: string;
  parent_name: string;
  parent_phone: string;
  father_name?: string;
  father_occupation?: string;
  mother_name?: string;
  mother_occupation?: string;
  guardian_name?: string;
  guardian_phone?: string;
  previous_school?: string;
  entry_year?: string;
  entry_semester?: string;
  status: 'aktif' | 'pindah' | 'lulus' | 'keluar';
}

const StudentManagement: React.FC = () => {
  const { currentSchool } = useDomain();
  
  // Get classes based on school level
  const classes = useMemo(() => {
    if (!currentSchool) return [];
    return getClassesByLevel(currentSchool.level);
  }, [currentSchool]);

  // Get students from dummy data
  const getSchoolStudents = useCallback(() => {
    if (!currentSchool) return [];
    return getStudentsBySchool(currentSchool.id).map(s => ({
      ...s,
      status: s.status || 'aktif',
    })) as Student[];
  }, [currentSchool]);

  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  const initialFormData: Omit<Student, 'id' | 'school_id'> = {
    name: '',
    class: '',
    nis: '',
    nisn: '',
    gender: 'L',
    birth_place: '',
    birth_date: '',
    religion: '',
    address: '',
    parent_name: '',
    parent_phone: '',
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    guardian_name: '',
    guardian_phone: '',
    previous_school: '',
    entry_year: new Date().getFullYear().toString(),
    entry_semester: '1',
    status: 'aktif',
  };

  const [formData, setFormData] = useState(initialFormData);

  // Update students when school changes
  useEffect(() => {
    setStudents(getSchoolStudents());
    setFilterClass('all');
    setSearchTerm('');
  }, [getSchoolStudents]);

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm) || (s.nisn && s.nisn.includes(searchTerm));
    const matchClass = filterClass === 'all' || s.class === filterClass;
    return matchSearch && matchClass;
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({
      ...initialFormData,
      class: classes[0] || '',
    });
    setDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    const { id, school_id, ...rest } = student;
    setFormData(rest);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.class || !formData.nis || !formData.parent_name || !formData.parent_phone) {
      toast.error('Nama, kelas, NIS, Nama Orang Tua, dan No. Telepon wajib diisi');
      return;
    }

    // Validasi Ketat
    if (formData.name.length < 3) {
      toast.error('Nama Lengkap minimal 3 karakter');
      return;
    }

    if (!/^\d+$/.test(formData.nis)) {
      toast.error('NIS hanya boleh berisi angka');
      return;
    }

    if (formData.nisn && !/^\d{10}$/.test(formData.nisn)) {
      toast.error('NISN harus 10 digit angka');
      return;
    }

    if (!/^\d{10,15}$/.test(formData.parent_phone)) {
      toast.error('Nomor Telepon Orang Tua harus 10-15 digit angka');
      return;
    }

    if (editingStudent) {
      setStudents(prev => prev.map(s => 
        s.id === editingStudent.id ? { ...s, ...formData } : s
      ));
      toast.success('Data Buku Induk siswa berhasil diperbarui');
    } else {
      const newStudent: Student = {
        id: Math.max(...students.map(s => s.id), 0) + 1,
        school_id: currentSchool?.id || 1,
        ...formData,
      };
      setStudents(prev => [...prev, newStudent]);
      toast.success('Data Buku Induk siswa baru berhasil ditambahkan');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    toast.success('Siswa berhasil dihapus');
  };

  const handleImport = () => {
    toast.info('Fitur import akan segera tersedia');
  };

  const handleExport = () => {
    toast.info('Fitur export akan segera tersedia');
  };

  // Get level-specific info
  const getLevelInfo = () => {
    if (!currentSchool) return null;
    switch (currentSchool.level) {
      case 'SD':
        return {
          title: 'Manajemen Siswa SD',
          desc: 'Kelola data siswa Kelas I sampai VI',
          grades: '6 tingkatan kelas (I-VI)',
        };
      case 'SMP':
        return {
          title: 'Manajemen Siswa SMP',
          desc: 'Kelola data siswa Kelas 7 sampai 9',
          grades: '3 tingkatan dengan banyak rombel (7A-9G)',
        };
      case 'SMA':
        return {
          title: 'Manajemen Siswa SMA',
          desc: 'Kelola data siswa Kelas X sampai XII',
          grades: '3 tingkatan dengan peminatan IPA/IPS',
        };
      case 'SMK':
        return {
          title: 'Manajemen Siswa SMK',
          desc: 'Kelola data siswa Kelas X sampai XII',
          grades: '3 tingkatan dengan berbagai jurusan',
        };
      default:
        return null;
    }
  };

  const levelInfo = getLevelInfo();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{levelInfo?.title || 'Manajemen Siswa'}</h1>
          <p className="text-muted-foreground">{levelInfo?.desc || 'Kelola data siswa dan kelas'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Siswa
          </Button>
        </div>
      </div>

      {/* Level Info Card */}
      {levelInfo && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-primary">Jenjang: {currentSchool?.level}</p>
                <p className="text-sm text-muted-foreground">{levelInfo.grades}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{students.length}</p>
            <p className="text-sm text-muted-foreground">Total Siswa</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{students.filter(s => s.status === 'aktif').length}</p>
            <p className="text-sm text-muted-foreground">Siswa Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{students.filter(s => s.gender === 'L').length}</p>
            <p className="text-sm text-muted-foreground">Laki-laki</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{students.filter(s => s.gender === 'P').length}</p>
            <p className="text-sm text-muted-foreground">Perempuan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau NIS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {classes.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIS/NISN</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>L/P</TableHead>
                  <TableHead>Orang Tua/Wali</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="font-mono text-sm">
                        <div>{student.nis}</div>
                        <div className="text-muted-foreground">{student.nisn || '-'}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{student.parent_name}</div>
                        <div className="text-muted-foreground">{student.parent_phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'aktif' ? 'default' : 'outline'}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(student)} title="Edit Buku Induk">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Tidak ada data siswa
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {editingStudent ? 'Edit Buku Induk Siswa' : 'Tambah Buku Induk Siswa Baru'}
            </DialogTitle>
            <DialogDescription>
              Lengkapi data sesuai format Buku Induk Siswa Nasional
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Diri
              </TabsTrigger>
              <TabsTrigger value="parent" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Keluarga
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Pendidikan
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Alamat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Ahmad Fauzan"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>NIS *</Label>
                    <Input
                      value={formData.nis}
                      onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>NISN</Label>
                    <Input
                      value={formData.nisn}
                      onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tempat Lahir</Label>
                  <Input
                    value={formData.birth_place}
                    onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Lahir</Label>
                  <Input
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <Select 
                    value={formData.gender} 
                    onValueChange={(val: 'L' | 'P') => setFormData({ ...formData, gender: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Agama</Label>
                  <Select 
                    value={formData.religion} 
                    onValueChange={(val) => setFormData({ ...formData, religion: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Agama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Kristen">Kristen</SelectItem>
                      <SelectItem value="Katolik">Katolik</SelectItem>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Buddha">Buddha</SelectItem>
                      <SelectItem value="Konghucu">Konghucu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status Siswa</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(val: 'aktif' | 'pindah' | 'lulus' | 'keluar') => setFormData({ ...formData, status: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="pindah">Pindah</SelectItem>
                      <SelectItem value="lulus">Lulus</SelectItem>
                      <SelectItem value="keluar">Keluar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="parent" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <User className="w-4 h-4" /> Data Ayah
                  </h3>
                  <div className="space-y-2">
                    <Label>Nama Ayah Kandung</Label>
                    <Input
                      value={formData.father_name}
                      onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pekerjaan Ayah</Label>
                    <Input
                      value={formData.father_occupation}
                      onChange={(e) => setFormData({ ...formData, father_occupation: e.target.value })}
                    />
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <User className="w-4 h-4" /> Data Ibu
                  </h3>
                  <div className="space-y-2">
                    <Label>Nama Ibu Kandung</Label>
                    <Input
                      value={formData.mother_name}
                      onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pekerjaan Ibu</Label>
                    <Input
                      value={formData.mother_occupation}
                      onChange={(e) => setFormData({ ...formData, mother_occupation: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Orang Tua/Wali (Penanggung Jawab) *</Label>
                    <Input
                      value={formData.parent_name}
                      onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>No. Telepon Aktif *</Label>
                    <Input
                      value={formData.parent_phone}
                      onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kelas Sekarang *</Label>
                  <Select 
                    value={formData.class} 
                    onValueChange={(val) => setFormData({ ...formData, class: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Asal Sekolah Sebelumnya</Label>
                  <Input
                    value={formData.previous_school}
                    onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tahun Masuk</Label>
                  <Input
                    value={formData.entry_year}
                    onChange={(e) => setFormData({ ...formData, entry_year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester Masuk</Label>
                  <Select 
                    value={formData.entry_semester} 
                    onValueChange={(val) => setFormData({ ...formData, entry_semester: val })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Ganjil (1)</SelectItem>
                      <SelectItem value="2">Genap (2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Alamat Lengkap</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={4}
                  placeholder="Jl. Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingStudent ? 'Simpan Perubahan Buku Induk' : 'Simpan Data Buku Induk'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
