import React, { useState, useEffect } from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SchoolHero: React.FC = () => {
  const { currentSchool } = useDomain();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = currentSchool?.hero_images || [];

  useEffect(() => {
    if (!currentSchool || heroImages.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSchool, heroImages.length]);

  if (!currentSchool) return null;

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section id="hero" className="relative h-[70vh] min-h-[500px] pt-28 md:pt-24">
      {/* Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`${currentSchool.name} - Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-foreground/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-background">
            <p 
              className="text-sm font-medium mb-3 px-3 py-1 rounded-full inline-block"
              style={{ backgroundColor: `${currentSchool.theme_color}90` }}
            >
              Selamat Datang di Website Resmi
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-up">
              {currentSchool.name}
            </h1>
            <p className="text-lg md:text-xl text-background/90 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {currentSchool.vision}
            </p>
            <div className="flex items-center gap-3 text-background/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{currentSchool.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? 'bg-background w-8' 
                      : 'bg-background/50 hover:bg-background/70'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center text-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center text-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolHero;
