import React from 'react';
import PlatformHeader from '@/components/platform/PlatformHeader';
import HeroSection from '@/components/platform/HeroSection';
import AboutSection from '@/components/platform/AboutSection';
import SchoolsSection from '@/components/platform/SchoolsSection';
import FeaturesSection from '@/components/platform/FeaturesSection';
import CTASection from '@/components/platform/CTASection';
import PlatformFooter from '@/components/platform/PlatformFooter';

const PlatformLanding: React.FC = () => {
  return (
    <div className="min-h-screen">
      <PlatformHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SchoolsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <PlatformFooter />
    </div>
  );
};

export default PlatformLanding;
