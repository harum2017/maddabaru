import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { getGalleryBySchool } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SchoolGallery: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) return null;

  const galleryItems = getGalleryBySchool(currentSchool.id);

  return (
    <section id="gallery" className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Galeri Kegiatan</h2>
            <p className="text-muted-foreground">
              Dokumentasi berbagai kegiatan dan fasilitas sekolah
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            Lihat Semua
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryItems.slice(0, 4).map((item, index) => (
            <div 
              key={item.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <img 
                src={item.image}
                alt={item.title}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  index === 0 ? 'h-full min-h-[300px]' : 'h-48'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block"
                    style={{ backgroundColor: currentSchool.theme_color }}
                  >
                    {item.category}
                  </span>
                  <p className="text-background font-medium">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolGallery;
