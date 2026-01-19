import React, { useState, useEffect } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { getDataService } from '@/services/repositories';
import type { Post } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const SchoolNews: React.FC = () => {
  const { currentSchool } = useDomain();
  const [newsList, setNewsList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      if (!currentSchool) {
        setLoading(false);
        return;
      }
      try {
        const dataService = getDataService();
        const data = await dataService.post.getPostsBySchool(currentSchool.id);
        setNewsList(data);
      } catch (error) {
        console.error('[SchoolNews] Error loading news:', error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [currentSchool]);

  if (!currentSchool || loading) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="news" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Berita & Pengumuman</h2>
            <p className="text-muted-foreground">
              Informasi terbaru seputar kegiatan dan prestasi sekolah
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.slice(0, 3).map((post) => (
            <article 
              key={post.id}
              className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto gap-2"
                  style={{ color: currentSchool.theme_color }}
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolNews;
