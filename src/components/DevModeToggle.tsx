import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import { schools } from '@/data/dummyData';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Monitor, Building2, Globe } from 'lucide-react';

const DevModeToggle: React.FC = () => {
  const { isDevMode, simulatedSchoolId, setSimulatedSchoolId, currentSchool, isPlatformDomain } = useDomain();

  // Hanya tampilkan di mode development
  if (!isDevMode) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-card shadow-lg border-2 border-primary/20 hover:border-primary/40"
          >
            <Monitor className="w-4 h-4 mr-2" />
            <span className="text-xs font-medium">
              {isPlatformDomain ? 'Platform' : currentSchool?.name?.substring(0, 15) + '...'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Mode Development
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setSimulatedSchoolId(null)}
            className={isPlatformDomain ? 'bg-primary/10' : ''}
          >
            <Globe className="w-4 h-4 mr-2" />
            <div>
              <p className="font-medium">Domain Platform</p>
              <p className="text-xs text-muted-foreground">Landing page platform</p>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Simulasi Domain Sekolah
          </DropdownMenuLabel>
          
          {schools.map((school) => (
            <DropdownMenuItem 
              key={school.id}
              onClick={() => setSimulatedSchoolId(school.id)}
              className={simulatedSchoolId === school.id ? 'bg-primary/10' : ''}
            >
              <Building2 className="w-4 h-4 mr-2 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium truncate">{school.name}</p>
                <p className="text-xs text-muted-foreground truncate">{school.domain}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DevModeToggle;
