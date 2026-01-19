/**
 * CONTOH PENGGUNAAN DATA SERVICE
 * 
 * File ini menunjukkan cara menggunakan Data Service Layer
 * di component atau page tanpa peduli sumber data (DEV/PROD).
 * 
 * PENTING: Component tidak perlu tahu apakah data dari dummy atau real database.
 */

import { useEffect, useState } from 'react';
import { getDataService } from '@/services/repositories';
import type { School } from '@/data/dummyData';

/**
 * EXAMPLE 1: Fetch schools di component
 * 
 * Component tidak peduli data dari mana, hanya menggunakan interface
 */
export function SchoolListExample() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        // Dapatkan data service (akan memilih DEV atau PROD berdasarkan config)
        const dataService = getDataService();
        
        // Gunakan repository interface (sama untuk DEV dan PROD)
        const data = await dataService.school.getActiveSchools();
        
        setSchools(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading schools');
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {schools.map(school => (
        <li key={school.id}>{school.name}</li>
      ))}
    </ul>
  );
}

/**
 * EXAMPLE 2: Fetch school by ID
 */
export function SchoolDetailExample({ schoolId }: { schoolId: number }) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        const dataService = getDataService();
        const data = await dataService.school.getSchoolById(schoolId);
        setSchool(data || null);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [schoolId]);

  if (loading) return <div>Loading...</div>;
  if (!school) return <div>School not found</div>;

  return <div>{school.name}</div>;
}

/**
 * EXAMPLE 3: Fetch staff dari sekolah tertentu
 */
export async function getSchoolStaff(schoolId: number) {
  const dataService = getDataService();
  return dataService.staff.getStaffBySchool(schoolId);
}

/**
 * EXAMPLE 4: Fetch posts dari sekolah
 */
export async function getSchoolNews(schoolId: number) {
  const dataService = getDataService();
  return dataService.post.getPublishedPostsBySchool(schoolId);
}

/**
 * MIGRASI DARI LAMA KE BARU:
 * 
 * SEBELUM (langsung import dummy data):
 * ---
 * import { getPostsBySchool } from '@/data/dummyData';
 * 
 * const posts = getPostsBySchool(schoolId);
 * 
 * SESUDAH (menggunakan data service):
 * ---
 * import { getDataService } from '@/services/repositories';
 * 
 * const dataService = getDataService();
 * const posts = await dataService.post.getPostsBySchool(schoolId);
 * 
 * KEUNTUNGAN:
 * 1. Component tidak tahu sumber data
 * 2. Bisa switch DEV/PROD tanpa rewrite component
 * 3. Testing lebih mudah (bisa mock data service)
 * 4. Future proof untuk database migration
 */
