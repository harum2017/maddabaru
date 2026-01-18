import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { Target, CheckCircle2 } from 'lucide-react';

const SchoolVisionMission: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) return null;

  return (
    <section id="vision" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visi & Misi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Landasan yang menjadi arah dan pedoman seluruh kegiatan di sekolah kami
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${currentSchool.theme_color}15` }}
            >
              <Target className="w-8 h-8" style={{ color: currentSchool.theme_color }} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Visi</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              "{currentSchool.vision}"
            </p>
          </div>
          
          {/* Misi */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
              style={{ backgroundColor: `${currentSchool.theme_color}15` }}
            >
              <CheckCircle2 className="w-8 h-8" style={{ color: currentSchool.theme_color }} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Misi</h3>
            <ul className="space-y-4">
              {currentSchool.mission.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                    style={{ 
                      backgroundColor: `${currentSchool.theme_color}15`,
                      color: currentSchool.theme_color 
                    }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolVisionMission;
