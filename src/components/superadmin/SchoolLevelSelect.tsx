import React from 'react';
import { SchoolLevel } from '@/data/dummyData';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { GraduationCap, BookOpen, Wrench, Building } from 'lucide-react';

interface SchoolLevelSelectProps {
  value: SchoolLevel;
  onChange: (value: SchoolLevel) => void;
  label?: string;
  required?: boolean;
}

const levelOptions: {
  value: SchoolLevel;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    value: 'SD',
    label: 'SD',
    description: 'Sekolah Dasar (Kelas I - VI)',
    icon: BookOpen,
    color: 'text-amber-600',
  },
  {
    value: 'SMP',
    label: 'SMP',
    description: 'Sekolah Menengah Pertama (Kelas VII - IX)',
    icon: Building,
    color: 'text-red-600',
  },
  {
    value: 'SMA',
    label: 'SMA',
    description: 'Sekolah Menengah Atas (Kelas X - XII)',
    icon: GraduationCap,
    color: 'text-blue-600',
  },
  {
    value: 'SMK',
    label: 'SMK',
    description: 'Sekolah Menengah Kejuruan (Kelas X - XII)',
    icon: Wrench,
    color: 'text-emerald-600',
  },
];

const SchoolLevelSelect: React.FC<SchoolLevelSelectProps> = ({
  value,
  onChange,
  label = 'Jenjang Pendidikan',
  required = false,
}) => {
  return (
    <div className="space-y-3">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as SchoolLevel)}
        className="grid grid-cols-2 gap-3"
      >
        {levelOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;
          
          return (
            <label
              key={option.value}
              className={`
                flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all
                ${isSelected 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                  : 'border-border hover:border-muted-foreground/30 hover:bg-muted/50'
                }
              `}
            >
              <RadioGroupItem value={option.value} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${option.color}`} />
                  <span className="font-semibold">{option.label}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </p>
              </div>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SchoolLevelSelect;
