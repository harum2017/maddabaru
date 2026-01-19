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
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Artistic Background Layer */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[140px] animate-pulse duration-[10s]" />
        <div className="absolute top-[25%] right-[-10%] w-[40%] h-[60%] bg-accent/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[15%] w-[60%] h-[50%] bg-blue-500/15 rounded-full blur-[160px]" />
        
        {/* Artistic Canvas Texture */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }} 
        />

        {/* Dynamic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px' 
          }} 
        />
      </div>

      <PlatformHeader />
      <main className="space-y-0 relative z-10">
        <div className="relative">
          <HeroSection />
        </div>
        <div className="relative border-y-2 border-border/80 bg-background/50 backdrop-blur-sm shadow-inner">
          <AboutSection />
        </div>
        <div className="relative py-10">
          <SchoolsSection />
        </div>
        <div className="relative border-y-2 border-border/90 bg-background/70 backdrop-blur-md shadow-lg">
          <FeaturesSection />
        </div>
        <div className="relative py-6">
          <CTASection />
        </div>
      </main>
      <PlatformFooter />
    </div>
  );
};

export default PlatformLanding;
