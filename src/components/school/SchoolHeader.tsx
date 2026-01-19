import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomain } from '@/contexts/DomainContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, LogIn } from 'lucide-react';

const SchoolHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentSchool, simulatedSchoolId } = useDomain();
  const navigate = useNavigate();

  if (!currentSchool) return null;

  const navItems = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Profil', href: '#profile' },
    { label: 'Visi Misi', href: '#vision' },
    { label: 'Guru & Staff', href: '#staff' },
    { label: 'Berita', href: '#news' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Kontak', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    // Preserve school_id in URL if in dev mode
    const loginUrl = simulatedSchoolId 
      ? `/school-login?school_id=${simulatedSchoolId}` 
      : '/school-login';
    navigate(loginUrl);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{currentSchool.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{currentSchool.email}</span>
            </div>
          </div>
          <div>
            <span className="text-background/70">Website Resmi {currentSchool.name}</span>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {currentSchool.logo && !currentSchool.logo.includes('placeholder') ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center border border-border">
                  <img 
                    src={currentSchool.logo} 
                    alt={`Logo ${currentSchool.name}`} 
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = "w-full h-full flex items-center justify-center font-bold";
                        fallback.style.backgroundColor = `${currentSchool.theme_color}15`;
                        fallback.style.color = currentSchool.theme_color;
                        fallback.innerText = currentSchool.name.charAt(0);
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                  style={{ 
                    backgroundColor: `${currentSchool.theme_color}15`,
                    color: currentSchool.theme_color 
                  }}
                >
                  {currentSchool.name.charAt(0)}
                </div>
              )}
              <div className="hidden sm:block">
                <p className="font-bold text-foreground leading-tight line-clamp-1 max-w-[200px] lg:max-w-[300px]">
                  {currentSchool.name}
                </p>
                <p className="text-xs text-muted-foreground">{currentSchool.domain}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button 
                size="sm"
                onClick={handleLoginClick}
                style={{ backgroundColor: currentSchool.theme_color }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login Admin
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 text-left text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 px-4">
                  <Button 
                    className="w-full"
                    onClick={handleLoginClick}
                    style={{ backgroundColor: currentSchool.theme_color }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login Admin
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SchoolHeader;
