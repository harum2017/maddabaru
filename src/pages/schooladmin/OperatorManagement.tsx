import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, UserCog, Key, Users, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { staff as allStaff, Staff } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';

interface Operator {
  id: number;
  staffId: number;
  name: string;
  email: string;
  position: string;
  isActive: boolean;
  lastLogin: string;
  permissions: {
    news: boolean;
    gallery: boolean;
    pages: boolean;
  };
}

const OperatorManagement: React.FC = () => {
  const { user } = useAuth();
  const schoolId = user?.schoolId || 1;
  
  // Get staff for this school (excluding those already set as operators or admin)
  const schoolStaff = allStaff.filter(s => s.school_id === schoolId);
  
  const [operators, setOperators] = useState<Operator[]>(() => {
    // Initialize with existing operator staff
    const operatorStaff = schoolStaff.find(s => s.position === 'Operator Website');
    if (operatorStaff) {
      return [{
        id: 1,
        staffId: operatorStaff.id,
        name: operatorStaff.name,
        email: `operator@sekolah${schoolId}.sch.id`,
        position: operatorStaff.position,
        isActive: true,
        lastLogin: '2024-01-18 10:30',
        permissions: { news: true, gallery: true, pages: true }
      }];
    }
    return [];
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [formData, setFormData] = useState({
    staffId: '',
    isActive: true,
    permissions: { news: true, gallery: true, pages: true },
  });

  // Get available staff (not already operators)
  const availableStaff = schoolStaff.filter(s => 
    !operators.some(op => op.staffId === s.id) && 
    s.position !== 'Kepala Sekolah' // Exclude principal
  );

  const handleAdd = () => {
    setEditingOperator(null);
    setFormData({
      staffId: '',
      isActive: true,
      permissions: { news: true, gallery: true, pages: true },
    });
    setDialogOpen(true);
  };

  const handleEdit = (operator: Operator) => {
    setEditingOperator(operator);
    setFormData({
      staffId: operator.staffId.toString(),
      isActive: operator.isActive,
      permissions: operator.permissions,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingOperator && !formData.staffId) {
      toast.error('Pilih pegawai yang akan dijadikan operator');
      return;
    }

    if (editingOperator) {
      setOperators(prev => prev.map(o => 
        o.id === editingOperator.id 
          ? { ...o, isActive: formData.isActive, permissions: formData.permissions }
          : o
      ));
      toast.success('Data operator berhasil diperbarui');
    } else {
      const selectedStaff = schoolStaff.find(s => s.id === parseInt(formData.staffId));
      if (!selectedStaff) {
        toast.error('Pegawai tidak ditemukan');
        return;
      }
      
      const newOperator: Operator = {
        id: Math.max(...operators.map(o => o.id), 0) + 1,
        staffId: selectedStaff.id,
        name: selectedStaff.name,
        email: `${selectedStaff.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}@sekolah${schoolId}.sch.id`,
        position: selectedStaff.position,
        isActive: formData.isActive,
        lastLogin: '-',
        permissions: formData.permissions,
      };
      setOperators(prev => [...prev, newOperator]);
      toast.success(`${selectedStaff.name} berhasil ditunjuk sebagai Operator`);
    }
    setDialogOpen(false);
  };

  const handleRemove = (id: number) => {
    const operator = operators.find(o => o.id === id);
    setOperators(prev => prev.filter(o => o.id !== id));
    toast.success(`${operator?.name} tidak lagi menjadi Operator`);
  };

  const handleResetPassword = (operator: Operator) => {
    toast.success(`Link reset password telah dikirim ke ${operator.email}`);
  };

  const toggleActive = (id: number) => {
    setOperators(prev => prev.map(o => 
      o.id === id ? { ...o, isActive: !o.isActive } : o
    ));
    toast.success('Status operator diperbarui');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Operator</h1>
          <p className="text-muted-foreground">Tunjuk pegawai sebagai operator konten website</p>
        </div>
        <Button onClick={handleAdd} disabled={availableStaff.length === 0}>
          <Plus className="w-4 h-4 mr-2" />
          Tunjuk Operator
        </Button>
      </div>

      {/* Info Card - Alur */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800">Alur Penunjukan Operator</p>
              <p className="text-sm text-blue-700 mt-1">
                Admin Sekolah menunjuk pegawai (Guru/TU) yang sudah terdaftar untuk menjadi Operator. 
                Operator dapat mengelola konten website tanpa akses ke data internal sekolah.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card - About */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <UserCog className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Tentang Operator</p>
              <p className="text-sm text-muted-foreground">
                Operator adalah pegawai sekolah yang dapat mengelola konten publik website seperti berita, galeri, dan halaman statis.
                Operator tidak memiliki akses ke data internal sekolah (pegawai, siswa, dll).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Daftar Operator
          </CardTitle>
          <CardDescription>Total {operators.length} operator terdaftar dari {schoolStaff.length} pegawai</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan Asli</TableHead>
                  <TableHead>Hak Akses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{operator.name}</p>
                        <p className="text-xs text-muted-foreground">{operator.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{operator.position}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {operator.permissions.news && <Badge variant="secondary" className="text-xs">Berita</Badge>}
                        {operator.permissions.gallery && <Badge variant="secondary" className="text-xs">Galeri</Badge>}
                        {operator.permissions.pages && <Badge variant="secondary" className="text-xs">Halaman</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={operator.isActive} 
                        onCheckedChange={() => toggleActive(operator.id)}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {operator.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Reset Password"
                          onClick={() => handleResetPassword(operator)}
                        >
                          <Key className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(operator)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive"
                          onClick={() => handleRemove(operator.id)}
                          title="Cabut status operator"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {operators.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Belum ada operator yang ditunjuk. Klik "Tunjuk Operator" untuk memilih dari daftar pegawai.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assign/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingOperator ? 'Edit Hak Akses Operator' : 'Tunjuk Operator Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingOperator 
                ? 'Perbarui hak akses operator' 
                : 'Pilih pegawai yang akan dijadikan operator website'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!editingOperator && (
              <div>
                <Label>Pilih Pegawai *</Label>
                <Select
                  value={formData.staffId}
                  onValueChange={(value) => setFormData({ ...formData, staffId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pegawai..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStaff.length === 0 ? (
                      <SelectItem value="none" disabled>
                        Tidak ada pegawai tersedia
                      </SelectItem>
                    ) : (
                      availableStaff.map((s) => (
                        <SelectItem key={s.id} value={s.id.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{s.name}</span>
                            <span className="text-muted-foreground text-xs">({s.position})</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Pegawai yang dipilih akan mendapat akses ke panel operator
                </p>
              </div>
            )}
            
            {editingOperator && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">{editingOperator.name}</p>
                <p className="text-xs text-muted-foreground">{editingOperator.position}</p>
              </div>
            )}
            
            <div className="space-y-3">
              <Label>Hak Akses Konten</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Kelola Berita</span>
                  <Switch 
                    checked={formData.permissions.news}
                    onCheckedChange={(checked) => setFormData({ 
                      ...formData, 
                      permissions: { ...formData.permissions, news: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Kelola Galeri</span>
                  <Switch 
                    checked={formData.permissions.gallery}
                    onCheckedChange={(checked) => setFormData({ 
                      ...formData, 
                      permissions: { ...formData.permissions, gallery: checked }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Kelola Halaman</span>
                  <Switch 
                    checked={formData.permissions.pages}
                    onCheckedChange={(checked) => setFormData({ 
                      ...formData, 
                      permissions: { ...formData.permissions, pages: checked }
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Aktifkan akses operator</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingOperator ? 'Simpan Perubahan' : 'Tunjuk Sebagai Operator'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperatorManagement;