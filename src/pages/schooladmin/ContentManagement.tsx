import React, { useState } from 'react';
import { posts as allPosts, Post, getPostsBySchool } from '@/data/dummyData';
import { useAuth } from '@/contexts/AuthContext';
import { useDomain } from '@/contexts/DomainContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Plus, Pencil, Trash2, Eye, FileText, Send, Save } from 'lucide-react';
import { toast } from 'sonner';

const ContentManagement: React.FC = () => {
  const { user } = useAuth();
  const { simulatedSchoolId } = useDomain();
  const schoolId = user?.schoolId || simulatedSchoolId || 1;

  const [postsList, setPostsList] = useState<Post[]>(
    allPosts.filter(p => p.school_id === schoolId)
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
  });

  const publishedPosts = postsList.filter(p => p.status === 'published');
  const draftPosts = postsList.filter(p => p.status === 'draft');

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      status: 'draft',
    });
    setDialogOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      status: post.status,
    });
    setDialogOpen(true);
  };

  const handleSave = (publishNow: boolean = false) => {
    if (!formData.title || !formData.content) {
      toast.error('Judul dan konten wajib diisi');
      return;
    }

    const status = publishNow ? 'published' : formData.status;

    if (editingPost) {
      setPostsList(prev => prev.map(p => 
        p.id === editingPost.id 
          ? { ...p, ...formData, status, created_at: new Date().toISOString().split('T')[0] }
          : p
      ));
      toast.success(publishNow ? 'Berita berhasil dipublikasikan' : 'Berita berhasil diperbarui');
    } else {
      const newPost: Post = {
        id: Math.max(...postsList.map(p => p.id), 0) + 1,
        school_id: schoolId,
        ...formData,
        status,
        created_at: new Date().toISOString().split('T')[0],
        author: 'Admin',
        category: 'Berita',
      };
      setPostsList(prev => [...prev, newPost]);
      toast.success(publishNow ? 'Berita berhasil dipublikasikan' : 'Draft berhasil disimpan');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setPostsList(prev => prev.filter(p => p.id !== id));
    toast.success('Berita berhasil dihapus');
  };

  const handlePublish = (post: Post) => {
    setPostsList(prev => prev.map(p => 
      p.id === post.id ? { ...p, status: 'published' } : p
    ));
    toast.success('Berita berhasil dipublikasikan');
  };

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2"
          variant={post.status === 'published' ? 'default' : 'secondary'}
        >
          {post.status === 'published' ? 'Published' : 'Draft'}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
        <p className="text-xs text-muted-foreground mb-4">{post.created_at}</p>
        <div className="flex gap-2">
          {post.status === 'draft' && (
            <Button size="sm" variant="default" onClick={() => handlePublish(post)}>
              <Send className="w-3 h-3 mr-1" />
              Publish
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
            <Pencil className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-destructive"
            onClick={() => handleDelete(post.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Konten Publik</h1>
          <p className="text-muted-foreground">Kelola berita dan konten website</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Berita
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{publishedPosts.length}</p>
              <p className="text-sm text-muted-foreground">Terpublikasi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{draftPosts.length}</p>
              <p className="text-sm text-muted-foreground">Draft</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Terpublikasi ({publishedPosts.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({draftPosts.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="published" className="mt-4">
          {publishedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publishedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Belum ada berita yang dipublikasikan
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          {draftPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Tidak ada draft berita
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? 'Edit Berita' : 'Buat Berita Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingPost ? 'Perbarui konten berita' : 'Tulis berita baru untuk website'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul Berita *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Judul berita yang menarik..."
              />
            </div>
            <div>
              <Label>Ringkasan</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan singkat berita..."
                rows={2}
              />
            </div>
            <div>
              <Label>URL Gambar</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label>Konten *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Isi lengkap berita..."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="secondary" onClick={() => handleSave(false)}>
              <Save className="w-4 h-4 mr-2" />
              Simpan Draft
            </Button>
            <Button onClick={() => handleSave(true)}>
              <Send className="w-4 h-4 mr-2" />
              Publikasikan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManagement;
