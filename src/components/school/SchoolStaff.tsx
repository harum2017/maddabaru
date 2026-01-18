import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { getStaffBySchool } from '@/data/dummyData';
import { User } from 'lucide-react';

const SchoolStaff: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) return null;

  const staffList = getStaffBySchool(currentSchool.id);

  return (
    <section id="staff" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Guru & Tenaga Pendidik</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tim pendidik profesional yang berdedikasi untuk mencerdaskan generasi bangsa
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffList.map((member, index) => (
            <div 
              key={member.id}
              className="bg-card rounded-xl border border-border overflow-hidden card-hover group"
            >
              <div 
                className="h-48 flex items-center justify-center"
                style={{ backgroundColor: `${currentSchool.theme_color}10` }}
              >
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentSchool.theme_color}20` }}
                >
                  <User className="w-12 h-12" style={{ color: currentSchool.theme_color }} />
                </div>
              </div>
              <div className="p-4 text-center">
                <h4 className="font-semibold mb-1 line-clamp-1">{member.name}</h4>
                <p 
                  className="text-sm font-medium mb-1"
                  style={{ color: currentSchool.theme_color }}
                >
                  {member.position}
                </p>
                {member.class_or_subject !== '-' && (
                  <p className="text-xs text-muted-foreground">{member.class_or_subject}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolStaff;
