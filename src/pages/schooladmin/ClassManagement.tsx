import React, { useState, useMemo, useEffect } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { SchoolLevel } from '@/data/dummyData';
import { Plus, Trash2, Edit2, Save, X, HelpCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// Interface untuk struktur kelas
interface ClassSection {
  id: string;
  name: string; // e.g., "A", "B", "IPA 1", "TKJ 1"
}

interface GradeLevel {
  id: string;
  name: string; // e.g., "Kelas I", "Kelas VII", "Kelas X"
  romanNumeral: string; // e.g., "I", "VII", "X"
  sections: ClassSection[];
}

// Default grade levels berdasarkan jenjang
const getDefaultGradeLevels = (level: SchoolLevel): GradeLevel[] => {
  switch (level) {
    case 'SD':
      return [
        { id: '1', name: 'Kelas I', romanNumeral: 'I', sections: [{ id: '1a', name: 'A' }, { id: '1b', name: 'B' }] },
        { id: '2', name: 'Kelas II', romanNumeral: 'II', sections: [{ id: '2a', name: 'A' }, { id: '2b', name: 'B' }] },
        { id: '3', name: 'Kelas III', romanNumeral: 'III', sections: [{ id: '3a', name: 'A' }, { id: '3b', name: 'B' }] },
        { id: '4', name: 'Kelas IV', romanNumeral: 'IV', sections: [{ id: '4a', name: 'A' }, { id: '4b', name: 'B' }] },
        { id: '5', name: 'Kelas V', romanNumeral: 'V', sections: [{ id: '5a', name: 'A' }, { id: '5b', name: 'B' }] },
        { id: '6', name: 'Kelas VI', romanNumeral: 'VI', sections: [{ id: '6a', name: 'A' }, { id: '6b', name: 'B' }] },
      ];
    case 'SMP':
      return [
        { id: '7', name: 'Kelas VII', romanNumeral: 'VII', sections: Array.from({ length: 7 }, (_, i) => ({ id: `7${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
        { id: '8', name: 'Kelas VIII', romanNumeral: 'VIII', sections: Array.from({ length: 7 }, (_, i) => ({ id: `8${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
        { id: '9', name: 'Kelas IX', romanNumeral: 'IX', sections: Array.from({ length: 7 }, (_, i) => ({ id: `9${String.fromCharCode(97 + i)}`, name: String.fromCharCode(65 + i) })) },
      ];
    case 'SMA':
      return [
        { id: 'x', name: 'Kelas X', romanNumeral: 'X', sections: [
          { id: 'x-ipa1', name: 'IPA 1' }, { id: 'x-ipa2', name: 'IPA 2' }, { id: 'x-ipa3', name: 'IPA 3' },
          { id: 'x-ips1', name: 'IPS 1' }, { id: 'x-ips2', name: 'IPS 2' },
        ]},
        { id: 'xi', name: 'Kelas XI', romanNumeral: 'XI', sections: [
          { id: 'xi-ipa1', name: 'IPA 1' }, { id: 'xi-ipa2', name: 'IPA 2' }, { id: 'xi-ipa3', name: 'IPA 3' },
          { id: 'xi-ips1', name: 'IPS 1' }, { id: 'xi-ips2', name: 'IPS 2' },
        ]},
        { id: 'xii', name: 'Kelas XII', romanNumeral: 'XII', sections: [
          { id: 'xii-ipa1', name: 'IPA 1' }, { id: 'xii-ipa2', name: 'IPA 2' }, { id: 'xii-ipa3', name: 'IPA 3' },
          { id: 'xii-ips1', name: 'IPS 1' }, { id: 'xii-ips2', name: 'IPS 2' },
        ]},
      ];
    case 'SMK':
      return [
        { id: 'x', name: 'Kelas X', romanNumeral: 'X', sections: [
          { id: 'x-tkj1', name: 'TKJ 1' }, { id: 'x-tkj2', name: 'TKJ 2' },
          { id: 'x-rpl1', name: 'RPL 1' }, { id: 'x-rpl2', name: 'RPL 2' },
          { id: 'x-tsm1', name: 'TSM 1' }, { id: 'x-tbsm1', name: 'TBSM 1' },
        ]},
        { id: 'xi', name: 'Kelas XI', romanNumeral: 'XI', sections: [
          { id: 'xi-tkj1', name: 'TKJ 1' }, { id: 'xi-tkj2', name: 'TKJ 2' },
          { id: 'xi-rpl1', name: 'RPL 1' }, { id: 'xi-rpl2', name: 'RPL 2' },
          { id: 'xi-tsm1', name: 'TSM 1' }, { id: 'xi-tbsm1', name: 'TBSM 1' },
        ]},
        { id: 'xii', name: 'Kelas XII', romanNumeral: 'XII', sections: [
          { id: 'xii-tkj1', name: 'TKJ 1' }, { id: 'xii-tkj2', name: 'TKJ 2' },
          { id: 'xii-rpl1', name: 'RPL 1' }, { id: 'xii-rpl2', name: 'RPL 2' },
          { id: 'xii-tsm1', name: 'TSM 1' }, { id: 'xii-tbsm1', name: 'TBSM 1' },
        ]},
      ];
    default:
      return [];
  }
};

const ClassManagement: React.FC = () => {
  const { currentSchool } = useDomain();
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
  const [helpOpen, setHelpOpen] = useState(false);
  
  // Dialog states
  const [addSectionDialogOpen, setAddSectionDialogOpen] = useState(false);
  const [editSectionDialogOpen, setEditSectionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Form states
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [newSectionName, setNewSectionName] = useState('');
  const [editingSection, setEditingSection] = useState<{ gradeId: string; section: ClassSection } | null>(null);
  const [deletingSection, setDeletingSection] = useState<{ gradeId: string; sectionId: string; sectionName: string } | null>(null);

  // Initialize grade levels based on school level
  useEffect(() => {
    if (currentSchool?.level) {
      setGradeLevels(getDefaultGradeLevels(currentSchool.level));
    }
  }, [currentSchool]);

  // Get jenjang label
  const getLevelLabel = (level?: SchoolLevel): string => {
    switch (level) {
      case 'SD': return 'Sekolah Dasar';
      case 'SMP': return 'Sekolah Menengah Pertama';
      case 'SMA': return 'Sekolah Menengah Atas';
      case 'SMK': return 'Sekolah Menengah Kejuruan';
      default: return 'Sekolah';
    }
  };

  // Calculate total classes
  const totalClasses = useMemo(() => {
    return gradeLevels.reduce((acc, grade) => acc + grade.sections.length, 0);
  }, [gradeLevels]);

  // Handle add section
  const handleAddSection = () => {
    if (!newSectionName.trim() || !selectedGradeId) {
      toast.error('Nama rombel tidak boleh kosong');
      return;
    }

    setGradeLevels(prev => prev.map(grade => {
      if (grade.id === selectedGradeId) {
        // Check if section already exists
        const exists = grade.sections.some(s => s.name.toLowerCase() === newSectionName.toLowerCase());
        if (exists) {
          toast.error('Rombel sudah ada');
          return grade;
        }
        return {
          ...grade,
          sections: [...grade.sections, { 
            id: `${grade.id}-${newSectionName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, 
            name: newSectionName 
          }]
        };
      }
      return grade;
    }));

    toast.success(`Rombel "${newSectionName}" berhasil ditambahkan`);
    setNewSectionName('');
    setAddSectionDialogOpen(false);
  };

  // Handle edit section
  const handleEditSection = () => {
    if (!editingSection || !newSectionName.trim()) {
      toast.error('Nama rombel tidak boleh kosong');
      return;
    }

    setGradeLevels(prev => prev.map(grade => {
      if (grade.id === editingSection.gradeId) {
        return {
          ...grade,
          sections: grade.sections.map(s => 
            s.id === editingSection.section.id 
              ? { ...s, name: newSectionName }
              : s
          )
        };
      }
      return grade;
    }));

    toast.success('Rombel berhasil diperbarui');
    setNewSectionName('');
    setEditingSection(null);
    setEditSectionDialogOpen(false);
  };

  // Handle delete section
  const handleDeleteSection = () => {
    if (!deletingSection) return;

    setGradeLevels(prev => prev.map(grade => {
      if (grade.id === deletingSection.gradeId) {
        return {
          ...grade,
          sections: grade.sections.filter(s => s.id !== deletingSection.sectionId)
        };
      }
      return grade;
    }));

    toast.success(`Rombel "${deletingSection.sectionName}" berhasil dihapus`);
    setDeletingSection(null);
    setDeleteDialogOpen(false);
  };

  // Open add dialog
  const openAddDialog = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    setNewSectionName('');
    setAddSectionDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (gradeId: string, section: ClassSection) => {
    setEditingSection({ gradeId, section });
    setNewSectionName(section.name);
    setEditSectionDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (gradeId: string, sectionId: string, sectionName: string) => {
    setDeletingSection({ gradeId, sectionId, sectionName });
    setDeleteDialogOpen(true);
  };

  // Get full class name
  const getFullClassName = (grade: GradeLevel, section: ClassSection) => {
    return `${grade.romanNumeral}-${section.name}`;
  };

  if (!currentSchool) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Memuat data sekolah...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="w-7 h-7" />
            Manajemen Kelas
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola rombongan belajar (rombel) untuk {getLevelLabel(currentSchool.level)}
          </p>
        </div>
        <Button variant="outline" onClick={() => setHelpOpen(true)}>
          <HelpCircle className="w-4 h-4 mr-2" />
          Bantuan
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Jenjang</CardDescription>
            <CardTitle className="text-xl">{currentSchool.level}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Jumlah Tingkat</CardDescription>
            <CardTitle className="text-xl">{gradeLevels.length} Tingkat</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Rombel</CardDescription>
            <CardTitle className="text-xl">{totalClasses} Kelas</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Grade Levels */}
      <div className="space-y-4">
        {gradeLevels.map((grade) => (
          <Card key={grade.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{grade.name}</CardTitle>
                  <CardDescription>{grade.sections.length} rombel</CardDescription>
                </div>
                <Button size="sm" onClick={() => openAddDialog(grade.id)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah Rombel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {grade.sections.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Belum ada rombel. Klik "Tambah Rombel" untuk menambahkan.</p>
                ) : (
                  grade.sections.map((section) => (
                    <Badge 
                      key={section.id} 
                      variant="secondary"
                      className="px-3 py-2 text-sm cursor-pointer hover:bg-accent group relative"
                    >
                      <span className="mr-2">{getFullClassName(grade, section)}</span>
                      <div className="inline-flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(grade.id, section);
                          }}
                          className="hover:text-primary"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(grade.id, section.id, getFullClassName(grade, section));
                          }}
                          className="hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Section Dialog */}
      <Dialog open={addSectionDialogOpen} onOpenChange={setAddSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Rombel Baru</DialogTitle>
            <DialogDescription>
              Tambahkan rombongan belajar baru untuk {gradeLevels.find(g => g.id === selectedGradeId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">Nama Rombel</label>
            <Input
              placeholder="Contoh: C, D, IPA 4, TKJ 3"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Hasil: {gradeLevels.find(g => g.id === selectedGradeId)?.romanNumeral}-{newSectionName || '...'}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSectionDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddSection}>
              <Plus className="w-4 h-4 mr-1" />
              Tambah
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={editSectionDialogOpen} onOpenChange={setEditSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rombel</DialogTitle>
            <DialogDescription>
              Ubah nama rombongan belajar
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm font-medium mb-2 block">Nama Rombel</label>
            <Input
              placeholder="Nama rombel"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEditSection()}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Hasil: {gradeLevels.find(g => g.id === editingSection?.gradeId)?.romanNumeral}-{newSectionName || '...'}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSectionDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditSection}>
              <Save className="w-4 h-4 mr-1" />
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Rombel?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus rombel "{deletingSection?.sectionName}"? 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSection} className="bg-destructive hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Bantuan Manajemen Kelas</DialogTitle>
            <DialogDescription>
              Panduan pengelolaan rombongan belajar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Apa itu Rombel?</h4>
              <p className="text-muted-foreground">
                Rombongan Belajar (Rombel) adalah kelompok siswa dalam satu tingkat kelas. 
                Contoh: Kelas VII-A, VII-B, atau X IPA 1, X IPA 2.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Tingkat vs Rombel</h4>
              <p className="text-muted-foreground">
                <strong>Tingkat</strong> adalah level kelas (I-VI untuk SD, VII-IX untuk SMP, X-XII untuk SMA/SMK). 
                Tingkat sudah ditentukan berdasarkan jenjang sekolah dan tidak bisa diubah.
              </p>
              <p className="text-muted-foreground mt-1">
                <strong>Rombel</strong> adalah pembagian kelas per tingkat (A, B, C, atau IPA 1, IPS 1, dll). 
                Rombel bisa ditambah, diubah, atau dihapus sesuai kebutuhan.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Cara Menambah Rombel</h4>
              <p className="text-muted-foreground">
                Klik tombol "Tambah Rombel" pada tingkat yang diinginkan, lalu masukkan nama rombel baru.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-1">Cara Edit/Hapus Rombel</h4>
              <p className="text-muted-foreground">
                Arahkan kursor ke badge rombel untuk melihat tombol edit dan hapus.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassManagement;
