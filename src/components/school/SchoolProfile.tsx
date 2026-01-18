import React from 'react';
import { useDomain } from '@/contexts/DomainContext';

const SchoolProfile: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) return null;

  return (
    <section id="profile" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tentang <span style={{ color: currentSchool.theme_color }}>{currentSchool.name}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {currentSchool.about}
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold" style={{ color: currentSchool.theme_color }}>35+</p>
                <p className="text-sm text-muted-foreground">Tahun Berdiri</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold" style={{ color: currentSchool.theme_color }}>1000+</p>
                <p className="text-sm text-muted-foreground">Total Alumni</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold" style={{ color: currentSchool.theme_color }}>50+</p>
                <p className="text-sm text-muted-foreground">Tenaga Pendidik</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop"
                alt={`Gedung ${currentSchool.name}`}
                className="w-full"
              />
            </div>
            <div 
              className="absolute -bottom-6 -left-6 p-6 rounded-xl shadow-lg"
              style={{ backgroundColor: currentSchool.theme_color }}
            >
              <p className="text-2xl font-bold text-background">Akreditasi A</p>
              <p className="text-background/80 text-sm">Terakreditasi Unggul</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolProfile;
