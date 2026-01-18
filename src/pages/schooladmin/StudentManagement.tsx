import React, { useState, useMemo } from 'react';
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
import { Plus, Pencil, Trash2, Search, Upload, Download, Info } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: number;
  name: string;
  class: string;
  nis: string;
  gender: 'L' | 'P';
  status: 'active' | 'inactive';
}

const StudentManagement: React.FC = () => {
  const { currentSchool } = useDomain();
  
  // Get classes based on school level
  const classes = useMemo(() => {
    if (!currentSchool) return [];
    return getClassesByLevel(currentSchool.level);
  }, [currentSchool]);

  // Get initial students from dummy data
  const initialStudents = useMemo(() => {
    if (!currentSchool) return [];
    return getStudentsBySchool(currentSchool.id).map(s => ({
      id: s.id,
      name: s.name,
      class: s.class,
      nis: s.nis,
      gender: s.gender,
      status: 'active' as const,
    }));
  }, [currentSchool]);

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    nis: '',
    gender: 'L' as 'L' | 'P',
    status: 'active' as 'active' | 'inactive',
  });

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm);
    const matchClass = filterClass === 'all' || s.class === filterClass;
    return matchSearch && matchClass;
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      class: classes[0] || '',
      nis: '',
      gender: 'L',
      status: 'active',
    });
    setDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      class: student.class,
      nis: student.nis,
      gender: student.gender,
      status: student.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.class || !formData.nis) {
      toast.error('Nama, kelas, dan NIS wajib diisi');
      return;
    }

    if (editingStudent) {
      setStudents(prev => prev.map(s => 
        s.id === editingStudent.id ? { ...s, ...formData } : s
      ));
      toast.success('Data siswa berhasil diperbarui');
    } else {
      const newStudent: Student = {
        id: Math.max(...students.map(s => s.id), 0) + 1,
        ...formData,
      };
      setStudents(prev => [...prev, newStudent]);
      toast.success('Siswa baru berhasil ditambahkan');
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
            <p className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</p>
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
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono">{student.nis}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge variant={student.gender === 'L' ? 'default' : 'secondary'}>
                        {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'outline'}>
                        {student.status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                          <Pencil className="w-4 h-4" />
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? 'Edit Siswa' : 'Tambah Siswa Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingStudent ? 'Perbarui data siswa' : 'Isi data siswa baru'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Lengkap *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ahmad Fauzan"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>NIS *</Label>
                <Input
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  placeholder="2024001"
                />
              </div>
              <div>
                <Label>Kelas *</Label>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Gender</Label>
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
              <div>
                <Label>Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(val: 'active' | 'inactive') => setFormData({ ...formData, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingStudent ? 'Simpan Perubahan' : 'Tambah Siswa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
