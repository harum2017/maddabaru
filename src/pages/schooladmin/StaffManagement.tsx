import React, { useState } from 'react';
import { staff as allStaff, Staff } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
import { Plus, Pencil, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const StaffManagement: React.FC = () => {
  const { user } = useAuth();
  const { simulatedSchoolId } = useDomain();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;
  
  const [staffList, setStaffList] = useState<Staff[]>(
    allStaff.filter(s => s.school_id === schoolId)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    class_or_subject: '',
    nip: '',
    phone: '',
    address: '',
    is_public: true,
  });

  const filteredStaff = staffList.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      position: '',
      class_or_subject: '',
      nip: '',
      phone: '',
      address: '',
      is_public: true,
    });
    setDialogOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      position: staff.position,
      class_or_subject: staff.class_or_subject,
      nip: staff.nip,
      phone: staff.phone,
      address: staff.address,
      is_public: staff.is_public,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.position) {
      toast.error('Nama dan posisi wajib diisi');
      return;
    }

    if (editingStaff) {
      setStaffList(prev => prev.map(s => 
        s.id === editingStaff.id 
          ? { ...s, ...formData }
          : s
      ));
      toast.success('Data pegawai berhasil diperbarui');
    } else {
      const newStaff: Staff = {
        id: Math.max(...staffList.map(s => s.id), 0) + 1,
        school_id: schoolId,
        ...formData,
      };
      setStaffList(prev => [...prev, newStaff]);
      toast.success('Pegawai baru berhasil ditambahkan');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
    toast.success('Pegawai berhasil dihapus');
  };

  const togglePublic = (id: number) => {
    setStaffList(prev => prev.map(s => 
      s.id === id ? { ...s, is_public: !s.is_public } : s
    ));
    toast.success('Status visibilitas diperbarui');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Pegawai</h1>
          <p className="text-muted-foreground">Kelola data guru dan tenaga kependidikan</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pegawai
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau posisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Mapel/Kelas</TableHead>
                  <TableHead>NIP</TableHead>
                  <TableHead>Publik</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.position}</TableCell>
                    <TableCell>{s.class_or_subject}</TableCell>
                    <TableCell className="font-mono text-sm">{s.nip}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublic(s.id)}
                      >
                        {s.is_public ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleDelete(s.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStaff.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Tidak ada data pegawai
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
              {editingStaff ? 'Edit Pegawai' : 'Tambah Pegawai Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingStaff ? 'Perbarui data pegawai' : 'Isi data pegawai baru'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Lengkap *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Ahmad Wijaya, M.Pd."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Posisi *</Label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Guru"
                />
              </div>
              <div>
                <Label>Mapel/Kelas</Label>
                <Input
                  value={formData.class_or_subject}
                  onChange={(e) => setFormData({ ...formData, class_or_subject: e.target.value })}
                  placeholder="Matematika"
                />
              </div>
            </div>
            <div>
              <Label>NIP</Label>
              <Input
                value={formData.nip}
                onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                placeholder="196501151990031001"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>No. Telepon</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="08123456789"
                />
              </div>
              <div>
                <Label>Alamat</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Kota Maju"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_public}
                onCheckedChange={(checked) => setFormData({ ...formData, is_public: checked })}
              />
              <Label>Tampilkan di website publik</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingStaff ? 'Simpan Perubahan' : 'Tambah Pegawai'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement;
