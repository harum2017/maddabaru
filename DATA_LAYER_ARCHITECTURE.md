/**
 * DATA LAYER ARCHITECTURE DOCUMENTATION
 * 
 * Menjelaskan arsitektur baru untuk pemisahan DEV/PROD data source.
 */

# Data Service Architecture - DEV to PROD Ready

## 🎯 Tujuan

Memisahkan DEV data (dummy) dari PROD data (real database) dengan:
1. **Single interface** untuk semua repository
2. **Central config** untuk switch DEV/PROD
3. **Zero UI changes** - komponen tidak tahu sumber data
4. **Future proof** - siap untuk database migration

---

## 📚 Struktur

```
src/
├── services/
│   ├── config.ts                    # 🔧 Central DEV/PROD switch
│   └── repositories/
│       ├── types.ts                 # 📋 Interface definitions
│       ├── dev.ts                   # ✅ DEV implementation (dummy data)
│       ├── prod.ts                  # 🚀 PROD implementation (skeleton)
│       ├── index.ts                 # 🏭 Factory & singleton
│       └── USAGE.md                 # 📖 Usage examples
│
├── data/
│   └── dummyData.ts                 # 📦 Dummy data (tetap ada)
│
├── contexts/
│   └── DomainContext.tsx            # ✨ Sudah refactored
│
└── components/
    ├── platform/SchoolsSection.tsx  # ✨ Sudah refactored
    └── school/
        ├── SchoolStaff.tsx          # ✨ Sudah refactored
        ├── SchoolNews.tsx           # ✨ Sudah refactored
        └── SchoolGallery.tsx        # ✨ Sudah refactored
```

---

## 🔌 How It Works

### 1. Central Configuration (`src/services/config.ts`)

```typescript
// Menentukan sumber data via environment variable
export const DATA_SOURCE = getDataSourceType(); // 'DEV' atau 'PROD'

// Contoh di .env:
VITE_DATA_SOURCE=DEV    // Development: menggunakan dummy data
VITE_DATA_SOURCE=PROD   // Production: menggunakan database asli
```

### 2. Repository Interfaces (`src/services/repositories/types.ts`)

Mendefinisikan kontrak yang harus diimplementasikan oleh DEV dan PROD:

```typescript
// Interface untuk School Repository
interface ISchoolRepository {
  getSchoolById(id: number): Promise<School | undefined>;
  getSchoolByDomain(domain: string): Promise<School | undefined>;
  getActiveSchools(): Promise<School[]>;
}

// Semua repository mengikuti pattern async/Promise
// Ini penting untuk konsistensi: DEV juga return Promise
```

### 3. DEV Implementation (`src/services/repositories/dev.ts`)

Menggunakan dummy data dari `@/data/dummyData.ts`:

```typescript
class DevSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number) {
    return dummyData.getSchoolById(id);  // Synchronous -> wrapped Promise
  }
  
  async getSchoolByDomain(domain: string) {
    return dummyData.getSchoolByDomain(domain);
  }
  
  // ... etc
}
```

### 4. PROD Implementation (`src/services/repositories/prod.ts`)

Skeleton untuk Supabase/database asli (nanti):

```typescript
class ProdSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number) {
    // TODO: Call Supabase API
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('id', id)
      .single();
  }
  
  // ... etc
}
```

### 5. Factory Pattern (`src/services/repositories/index.ts`)

Memilih implementasi berdasarkan config:

```typescript
export function getDataService(): IDataService {
  if (isDevMode()) {
    return createDevDataService();  // Dummy data
  } else if (isProdMode()) {
    return createProdDataService(); // Real database
  }
}
```

---

## 💡 Cara Menggunakan

### SEBELUM (Direct dummy data access)
```typescript
// ❌ Component tahu sumber data
import { getPostsBySchool } from '@/data/dummyData';

const posts = getPostsBySchool(schoolId);  // Synchronous
```

### SESUDAH (Via data service)
```typescript
// ✅ Component tidak tahu sumber data
import { getDataService } from '@/services/repositories';

const dataService = getDataService();
const posts = await dataService.post.getPostsBySchool(schoolId);  // Async
```

---

## ✨ Refactored Components

Sudah diupdate untuk menggunakan data service:

1. **DomainContext** - Fetch school by ID atau domain
2. **SchoolsSection** - List semua sekolah aktif
3. **SchoolStaff** - Fetch staff dari sekolah
4. **SchoolNews** - Fetch posts dari sekolah
5. **SchoolGallery** - Fetch gallery dari sekolah

Pattern untuk semua:
```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const load = async () => {
    try {
      const dataService = getDataService();
      const result = await dataService.{repository}.{method}(...);
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  load();
}, [dependencies]);
```

---

## 🔄 Migrasi ke Database Asli (Nanti)

Ketika waktunya ganti ke database asli:

### Langkah 1: Setup Supabase
```env
VITE_DATA_SOURCE=PROD
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
```

### Langkah 2: Implementasikan PROD repositories
```typescript
// Di src/services/repositories/prod.ts
class ProdSchoolRepository implements ISchoolRepository {
  async getSchoolById(id: number) {
    const { data } = await supabase
      .from('schools')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  }
  // ... etc untuk semua methods
}
```

### Langkah 3: Done!
- Tidak perlu ubah component manapun
- Tidak perlu ubah UI
- Semua akan otomatis pakai database asli

---

## 📊 Interface Hierarchy

```
IDataService (Main facade)
├── school: ISchoolRepository
├── staff: IStaffRepository
├── student: IStudentRepository
├── post: IPostRepository
├── gallery: IGalleryRepository
├── class: IClassRepository
└── registration: IRegistrationRepository

Setiap repository diimplementasikan oleh:
├── DevXxxRepository (menggunakan dummy data)
└── ProdXxxRepository (menggunakan database - nanti)
```

---

## 🎯 Kontrak Interface

Semua repository methods:
- Return `Promise` (untuk async consistency)
- Tidak ada conditional logic di component
- Type-safe dengan TypeScript
- Easy to mock untuk testing

```typescript
// Example: getPostsBySchool
interface IPostRepository {
  getPostsBySchool(schoolId: number): Promise<Post[]>;
}

// DEV implementation
async getPostsBySchool(schoolId: number) {
  return dummyData.getPostsBySchool(schoolId);  // Wrapped in Promise
}

// PROD implementation (nanti)
async getPostsBySchool(schoolId: number) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('school_id', schoolId);
  return data;
}
```

---

## ✅ Current Status

- ✅ DEV mode: Fully working dengan dummy data
- ✅ PROD mode: Skeleton ready untuk database
- ✅ Config: Central di `src/services/config.ts`
- ✅ Interface: Defined di `src/services/repositories/types.ts`
- ✅ Components: Refactored untuk use data service
- ✅ Build: Success, no errors

---

## 🚀 Next Steps (Nanti)

1. Setup Supabase project
2. Create database schema (match dummyData interfaces)
3. Implement PROD repositories
4. Update .env dengan Supabase credentials
5. Change `VITE_DATA_SOURCE=DEV` → `VITE_DATA_SOURCE=PROD`
6. Deploy & test

---

## 📝 Notes

- Dummy data tetap di `src/data/dummyData.ts` untuk reference
- DEV implementation wrap synchronous calls dalam Promise
- Semua method async untuk consistency
- Zero breaking changes untuk UI
- Lovable compatible - hanya service layer berubah
