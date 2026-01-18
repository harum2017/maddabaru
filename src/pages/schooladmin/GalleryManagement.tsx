import React, { useState } from 'react';
import { gallery as allGallery, GalleryItem, getGalleryBySchool } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Image, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const categories = ['Kegiatan', 'Fasilitas', 'Ekstrakurikuler', 'Prestasi', 'Lainnya'];

const GalleryManagement: React.FC = () => {
  const { user } = useAuth();
  const { simulatedSchoolId } = useDomain();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    allGallery.filter(g => g.school_id === schoolId)
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'Kegiatan',
  });

  const filteredGallery = galleryItems.filter(g => 
    filterCategory === 'all' || g.category === filterCategory
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      image: '',
      category: 'Kegiatan',
    });
    setDialogOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image,
      category: item.category,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.image) {
      toast.error('Judul dan URL gambar wajib diisi');
      return;
    }

    if (editingItem) {
      setGalleryItems(prev => prev.map(g => 
        g.id === editingItem.id ? { ...g, ...formData } : g
      ));
      toast.success('Foto berhasil diperbarui');
    } else {
      const newItem: GalleryItem = {
        id: Math.max(...galleryItems.map(g => g.id), 0) + 1,
        school_id: schoolId,
        ...formData,
        created_at: new Date().toISOString().split('T')[0],
      };
      setGalleryItems(prev => [...prev, newItem]);
      toast.success('Foto berhasil ditambahkan');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
    toast.success('Foto berhasil dihapus');
  };

  // Count per category
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = galleryItems.filter(g => g.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Galeri</h1>
          <p className="text-muted-foreground">Kelola foto dan dokumentasi sekolah</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Foto
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={filterCategory === 'all' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setFilterCategory('all')}
        >
          Semua ({galleryItems.length})
        </Button>
        {categories.map(cat => (
          <Button 
            key={cat}
            variant={filterCategory === cat ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilterCategory(cat)}
          >
            {cat} ({categoryCounts[cat] || 0})
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-square relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Badge className="absolute top-2 left-2" variant="secondary">
                  {item.category}
                </Badge>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{item.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {filterCategory === 'all' 
                ? 'Belum ada foto di galeri' 
                : `Tidak ada foto dalam kategori ${filterCategory}`
              }
            </p>
            <Button className="mt-4" onClick={handleAdd}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Foto Pertama
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Foto' : 'Upload Foto Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingItem ? 'Perbarui informasi foto' : 'Tambah foto ke galeri'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul Foto *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Upacara Bendera"
              />
            </div>
            <div>
              <Label>Kategori</Label>
              <Select 
                value={formData.category} 
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>URL Gambar *</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Masukkan URL gambar dari sumber eksternal
              </p>
            </div>
            {formData.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img 
                  src={formData.image} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingItem ? 'Simpan Perubahan' : 'Upload Foto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagement;
