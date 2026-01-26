import React from 'react';
import { Badge } from '@/components/ui/badge';
import { SchoolLevel } from '@/data/dummyData';
import { GraduationCap, BookOpen, Wrench, Building } from 'lucide-react';

interface SchoolLevelBadgeProps {
  level: SchoolLevel;
  showIcon?: boolean;
  size?: 'sm' | 'default';
}

const levelConfig: Record<SchoolLevel, { 
  label: string; 
  fullLabel: string;
  variant: 'default' | 'secondary' | 'outline' | 'destructive';
  className: string;
  icon: React.ElementType;
}> = {
  SD: {
    label: 'SD',
    fullLabel: 'Sekolah Dasar',
    variant: 'outline',
    className: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    icon: BookOpen,
  },
  SMP: {
    label: 'SMP',
    fullLabel: 'Sekolah Menengah Pertama',
    variant: 'outline',
    className: 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    icon: Building,
  },
  SMA: {
    label: 'SMA',
    fullLabel: 'Sekolah Menengah Atas',
    variant: 'outline',
    className: 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    icon: GraduationCap,
  },
  SMK: {
    label: 'SMK',
    fullLabel: 'Sekolah Menengah Kejuruan',
    variant: 'outline',
    className: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    icon: Wrench,
  },
};

const SchoolLevelBadge: React.FC<SchoolLevelBadgeProps> = ({ 
  level, 
  showIcon = false,
  size = 'default' 
}) => {
  const config = levelConfig[level];
  const Icon = config.icon;
  
  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${size === 'sm' ? 'text-xs px-1.5 py-0' : ''}`}
      title={config.fullLabel}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} mr-1`} />}
      {config.label}
    </Badge>
  );
};

export default SchoolLevelBadge;
