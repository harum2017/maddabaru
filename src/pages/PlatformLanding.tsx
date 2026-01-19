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
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-80">
        <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-primary/30 rounded-full blur-[160px] animate-pulse duration-[12s]" />
        <div className="absolute top-[20%] right-[-15%] w-[50%] h-[70%] bg-accent/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[70%] h-[60%] bg-blue-500/20 rounded-full blur-[180px]" />
        
        {/* Artistic Canvas Texture & Water Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25, 50 50 T 100 50' fill='none' stroke='currentColor' stroke-width='1.5' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px, 120px 80px'
          }} 
        />

        {/* Sharper Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.06]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      <PlatformHeader />
      <main className="space-y-0 relative z-10">
        <div className="relative border-b-2 border-border/90">
          <HeroSection />
        </div>
        <div className="relative border-b-2 border-border bg-background/60 backdrop-blur-md shadow-2xl">
          <AboutSection />
        </div>
        <div className="relative py-2 border-b-2 border-border/80">
          <SchoolsSection />
        </div>
        <div className="relative border-b-2 border-primary/20 bg-background/80 backdrop-blur-xl shadow-2xl">
          <FeaturesSection />
        </div>
        <div className="relative">
          <CTASection />
        </div>
      </main>
      <PlatformFooter />
    </div>
  );
};

export default PlatformLanding;
