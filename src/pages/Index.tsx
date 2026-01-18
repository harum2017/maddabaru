import React from 'react';
import { useDomain } from '@/contexts/DomainContext';
import PlatformLanding from './PlatformLanding';
import SchoolWebsite from './SchoolWebsite';
import DevModeToggle from '@/components/DevModeToggle';

const Index: React.FC = () => {
  const { isPlatformDomain, isSchoolDomain } = useDomain();

  return (
    <>
      {isPlatformDomain && <PlatformLanding />}
      {isSchoolDomain && <SchoolWebsite />}
      <DevModeToggle />
    </>
  );
};

export default Index;
