import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import SchoolHeader from '@/components/school/SchoolHeader';
import SchoolHero from '@/components/school/SchoolHero';
import SchoolProfile from '@/components/school/SchoolProfile';
import SchoolVisionMission from '@/components/school/SchoolVisionMission';
import SchoolStaff from '@/components/school/SchoolStaff';
import SchoolNews from '@/components/school/SchoolNews';
import SchoolGallery from '@/components/school/SchoolGallery';
import SchoolContact from '@/components/school/SchoolContact';
import SchoolFooter from '@/components/school/SchoolFooter';

const SchoolWebsite: React.FC = () => {
  const { currentSchool } = useDomain();

  if (!currentSchool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">404</h1>
          <p className="text-muted-foreground">Sekolah tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SchoolHeader />
      <main>
        <SchoolHero />
        <SchoolProfile />
        <SchoolVisionMission />
        <SchoolStaff />
        <SchoolNews />
        <SchoolGallery />
        <SchoolContact />
      </main>
      <SchoolFooter />
    </div>
  );
};

export default SchoolWebsite;
