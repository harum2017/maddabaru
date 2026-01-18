// Dummy data untuk development - struktur sama dengan production

// Jenjang sekolah
export type SchoolLevel = 'SD' | 'SMP' | 'SMA' | 'SMK';

export interface School {
  id: number;
  name: string;
  domain: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  theme_color: string;
  hero_images: string[];
  profile_image?: string;
  vision: string;
  mission: string[];
  about: string;
  is_active: boolean;
  founded_year?: number;
  accreditation?: string;
  student_count?: number;
  level: SchoolLevel;
}

export interface Staff {
  id: number;
  school_id: number;
  name: string;
  position: string;
  class_or_subject: string;
  nip: string;
  phone: string;
  address: string;
  is_public: boolean;
  photo?: string;
}

export interface User {
  id: number;
  staff_id: number;
  school_id: number;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN_SEKOLAH' | 'OPERATOR';
  name: string;
}

export interface Student {
  id: number;
  school_id: number;
  name: string;
  class: string;
  nis: string;
  nisn?: string;
  gender: 'L' | 'P';
  birth_place?: string;
  birth_date?: string;
  religion?: string;
  address?: string;
  parent_name: string;
  parent_phone: string;
  father_name?: string;
  father_occupation?: string;
  mother_name?: string;
  mother_occupation?: string;
  guardian_name?: string;
  guardian_phone?: string;
  previous_school?: string;
  entry_year?: string;
  entry_semester?: string;
  status?: 'aktif' | 'pindah' | 'lulus' | 'keluar';
}

export interface SchoolRegistration {
  id: number;
  school_name: string;
  domain: string;
  level: SchoolLevel;
  address: string;
  phone: string;
  email: string;
  contact_person: string;
  contact_phone: string;
  status: 'pending' | 'approved' | 'rejected';
  registration_date: string;
  notes?: string;
}

export interface Post {
  id: number;
  school_id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  status: 'draft' | 'published';
  created_at: string;
  author: string;
  category: string;
}

export interface GalleryItem {
  id: number;
  school_id: number;
  title: string;
  image: string;
  category: string;
  created_at: string;
}

// Helper: Get classes by school level
export const getClassesByLevel = (level: SchoolLevel): string[] => {
  switch (level) {
    case 'SD':
      // SD: Kelas 1-6, masing-masing A & B
      return [
        'I-A', 'I-B',
        'II-A', 'II-B',
        'III-A', 'III-B',
        'IV-A', 'IV-B',
        'V-A', 'V-B',
        'VI-A', 'VI-B'
      ];
    case 'SMP':
      // SMP: Kelas 7-9 dengan banyak rombel (A-G)
      return [
        '7-A', '7-B', '7-C', '7-D', '7-E', '7-F', '7-G',
        '8-A', '8-B', '8-C', '8-D', '8-E', '8-F', '8-G',
        '9-A', '9-B', '9-C', '9-D', '9-E', '9-F', '9-G'
      ];
    case 'SMA':
      // SMA: Kelas X-XII dengan peminatan IPA/IPS
      return [
        'X IPA 1', 'X IPA 2', 'X IPA 3',
        'X IPS 1', 'X IPS 2',
        'XI IPA 1', 'XI IPA 2', 'XI IPA 3',
        'XI IPS 1', 'XI IPS 2',
        'XII IPA 1', 'XII IPA 2', 'XII IPA 3',
        'XII IPS 1', 'XII IPS 2'
      ];
    case 'SMK':
      // SMK: Kelas X-XII dengan jurusan
      return [
        'X TKJ 1', 'X TKJ 2',
        'X RPL 1', 'X RPL 2',
        'X TSM 1',
        'X TBSM 1',
        'XI TKJ 1', 'XI TKJ 2',
        'XI RPL 1', 'XI RPL 2',
        'XI TSM 1',
        'XI TBSM 1',
        'XII TKJ 1', 'XII TKJ 2',
        'XII RPL 1', 'XII RPL 2',
        'XII TSM 1',
        'XII TBSM 1'
      ];
    default:
      return [];
  }
};

// Helper: Get grade levels by school level
export const getGradeLevelsByLevel = (level: SchoolLevel): string[] => {
  switch (level) {
    case 'SD':
      return ['Kelas I', 'Kelas II', 'Kelas III', 'Kelas IV', 'Kelas V', 'Kelas VI'];
    case 'SMP':
      return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
    case 'SMA':
      return ['Kelas X', 'Kelas XI', 'Kelas XII'];
    case 'SMK':
      return ['Kelas X', 'Kelas XI', 'Kelas XII'];
    default:
      return [];
  }
};

// Helper: Get subjects by school level
export const getSubjectsByLevel = (level: SchoolLevel): string[] => {
  switch (level) {
    case 'SD':
      return [
        'Guru Kelas',
        'Pendidikan Agama',
        'Pendidikan Jasmani',
        'Bahasa Indonesia',
        'Matematika',
        'IPA',
        'IPS',
        'Seni Budaya',
        'Bahasa Inggris',
        'Mulok'
      ];
    case 'SMP':
      return [
        'Bahasa Indonesia',
        'Bahasa Inggris',
        'Matematika',
        'IPA',
        'IPS',
        'Pendidikan Agama',
        'PKn',
        'Seni Budaya',
        'Penjaskes',
        'TIK',
        'Prakarya',
        'Bahasa Daerah'
      ];
    case 'SMA':
      return [
        'Bahasa Indonesia',
        'Bahasa Inggris',
        'Matematika',
        'Fisika',
        'Kimia',
        'Biologi',
        'Ekonomi',
        'Geografi',
        'Sosiologi',
        'Sejarah',
        'Pendidikan Agama',
        'PKn',
        'Seni Budaya',
        'Penjaskes'
      ];
    case 'SMK':
      return [
        'Bahasa Indonesia',
        'Bahasa Inggris',
        'Matematika',
        'Teknik Komputer',
        'Rekayasa Perangkat Lunak',
        'Teknik Jaringan',
        'Teknik Mesin',
        'Teknik Listrik',
        'Pendidikan Agama',
        'PKn',
        'Penjaskes',
        'Kewirausahaan'
      ];
    default:
      return [];
  }
};

// Dummy Schools - 4 jenjang: SD, SMP, SMA, SMK
export const schools: School[] = [
  {
    id: 1,
    name: "SMA Negeri 1 Nusantara",
    domain: "sman1nusantara.sch.id",
    logo: "/placeholder.svg",
    address: "Jl. Pendidikan No. 1, Kota Maju, Jawa Barat 40115",
    phone: "(022) 1234567",
    email: "info@sman1nusantara.sch.id",
    theme_color: "#2563eb",
    hero_images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=600&fit=crop"
    ],
    vision: "Menjadi sekolah unggul yang menghasilkan lulusan berkarakter, berprestasi, dan berdaya saing global.",
    mission: [
      "Menyelenggarakan pendidikan berkualitas berbasis teknologi",
      "Mengembangkan potensi peserta didik secara optimal",
      "Membangun karakter peserta didik yang berakhlak mulia",
      "Menciptakan lingkungan belajar yang kondusif dan inovatif"
    ],
    about: "SMA Negeri 1 Nusantara adalah sekolah menengah atas unggulan yang didirikan pada tahun 1985. Dengan pengalaman lebih dari 35 tahun dalam dunia pendidikan, kami telah meluluskan ribuan alumni yang sukses di berbagai bidang. Sekolah kami memiliki fasilitas lengkap dan tenaga pengajar yang profesional.",
    is_active: true,
    founded_year: 1985,
    accreditation: "A",
    student_count: 1200,
    level: 'SMA'
  },
  {
    id: 2,
    name: "SMK Teknologi Merdeka",
    domain: "smkteknologimerdeka.sch.id",
    logo: "/placeholder.svg",
    address: "Jl. Industri Raya No. 45, Kota Mandiri, Jawa Tengah 50123",
    phone: "(024) 7654321",
    email: "info@smkteknologimerdeka.sch.id",
    theme_color: "#059669",
    hero_images: [
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=600&fit=crop"
    ],
    vision: "Menjadi SMK terdepan dalam mencetak tenaga kerja profesional dan wirausahawan sukses.",
    mission: [
      "Mengembangkan kompetensi keahlian sesuai kebutuhan industri",
      "Membekali siswa dengan keterampilan kewirausahaan",
      "Menjalin kerjasama dengan dunia usaha dan industri",
      "Menghasilkan lulusan yang siap kerja dan mandiri"
    ],
    about: "SMK Teknologi Merdeka adalah sekolah kejuruan yang fokus pada bidang teknologi dan industri. Didukung oleh fasilitas laboratorium modern dan kerjasama dengan berbagai perusahaan ternama. Kami memiliki 5 jurusan unggulan dengan tingkat keterserapan kerja mencapai 95%.",
    is_active: true,
    founded_year: 1998,
    accreditation: "A",
    student_count: 850,
    level: 'SMK'
  },
  {
    id: 3,
    name: "SMP Harapan Bangsa",
    domain: "smpharapanbangsa.sch.id",
    logo: "/placeholder.svg",
    address: "Jl. Pahlawan No. 88, Kota Sejahtera, Jawa Timur 60234",
    phone: "(031) 9876543",
    email: "info@smpharapanbangsa.sch.id",
    theme_color: "#dc2626",
    hero_images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=600&fit=crop"
    ],
    vision: "Membentuk generasi muda yang cerdas, beriman, dan berbudaya untuk masa depan Indonesia.",
    mission: [
      "Memberikan pendidikan dasar menengah yang berkualitas",
      "Menanamkan nilai-nilai keagamaan dan budi pekerti",
      "Mengembangkan bakat dan minat siswa melalui ekstrakurikuler",
      "Membangun kerjasama yang harmonis antara sekolah dan orang tua"
    ],
    about: "SMP Harapan Bangsa adalah sekolah menengah pertama yang berdiri sejak tahun 2005. Kami berkomitmen untuk memberikan pendidikan berkualitas dengan pendekatan yang menyenangkan dan inovatif. Fasilitas modern dan lingkungan yang asri menjadi keunggulan kami.",
    is_active: true,
    founded_year: 2005,
    accreditation: "A",
    student_count: 720,
    level: 'SMP'
  },
  {
    id: 4,
    name: "SD Negeri Cendekia",
    domain: "sdncendekia.sch.id",
    logo: "/placeholder.svg",
    address: "Jl. Merdeka No. 10, Kota Pintar, DKI Jakarta 10110",
    phone: "(021) 5551234",
    email: "info@sdncendekia.sch.id",
    theme_color: "#f59e0b",
    hero_images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=600&fit=crop"
    ],
    vision: "Menjadi sekolah dasar yang unggul dalam membentuk generasi cerdas, kreatif, dan berakhlak mulia.",
    mission: [
      "Menyelenggarakan pembelajaran yang menyenangkan dan bermakna",
      "Mengembangkan potensi akademik dan non-akademik peserta didik",
      "Menanamkan nilai-nilai karakter dan budi pekerti sejak dini",
      "Menciptakan lingkungan sekolah yang aman, nyaman, dan ramah anak"
    ],
    about: "SD Negeri Cendekia adalah sekolah dasar yang berdiri sejak tahun 2000. Kami fokus pada pendidikan karakter dan pengembangan potensi anak dengan metode pembelajaran yang menyenangkan. Sekolah kami dilengkapi dengan fasilitas bermain, perpustakaan anak, dan ruang kreativitas.",
    is_active: true,
    founded_year: 2000,
    accreditation: "A",
    student_count: 480,
    level: 'SD'
  }
];

// Dummy Staff
export const staff: Staff[] = [
  // Staff Sekolah 1 - SMA Negeri 1 Nusantara
  { id: 1, school_id: 1, name: "Dr. Ahmad Wijaya, M.Pd.", position: "Kepala Sekolah", class_or_subject: "-", nip: "196501151990031001", phone: "08123456789", address: "Kota Maju", is_public: true },
  { id: 2, school_id: 1, name: "Dra. Siti Aminah, M.Pd.", position: "Wakil Kepala Sekolah", class_or_subject: "Kurikulum", nip: "197001011992032001", phone: "08123456790", address: "Kota Maju", is_public: true },
  { id: 3, school_id: 1, name: "Siti Rahayu, S.Pd.", position: "Guru", class_or_subject: "Matematika", nip: "197203201995032002", phone: "08234567890", address: "Kota Maju", is_public: true },
  { id: 4, school_id: 1, name: "Budi Santoso, S.Pd.", position: "Guru", class_or_subject: "Fisika", nip: "198005101999031003", phone: "08345678901", address: "Kota Maju", is_public: true },
  { id: 5, school_id: 1, name: "Dewi Lestari, S.Pd.", position: "Guru", class_or_subject: "Bahasa Inggris", nip: "198510152008042004", phone: "08456789012", address: "Kota Maju", is_public: true },
  { id: 6, school_id: 1, name: "Agung Prasetyo, S.Pd.", position: "Guru", class_or_subject: "Bahasa Indonesia", nip: "198705202010011005", phone: "08567890123", address: "Kota Maju", is_public: true },
  { id: 7, school_id: 1, name: "Rini Wulandari, S.Pd.", position: "Guru", class_or_subject: "Kimia", nip: "198908252012042006", phone: "08678901234", address: "Kota Maju", is_public: true },
  { id: 8, school_id: 1, name: "Hendro Kusuma", position: "Tata Usaha", class_or_subject: "-", nip: "199001012010011007", phone: "08789012345", address: "Kota Maju", is_public: true },
  { id: 9, school_id: 1, name: "Rudi Hermawan", position: "Operator Website", class_or_subject: "-", nip: "199203152015011008", phone: "08890123456", address: "Kota Maju", is_public: false },
  
  // Staff Sekolah 2 - SMK Teknologi Merdeka
  { id: 10, school_id: 2, name: "Ir. Bambang Hermawan, M.T.", position: "Kepala Sekolah", class_or_subject: "-", nip: "196708101992031001", phone: "08111222333", address: "Kota Mandiri", is_public: true },
  { id: 11, school_id: 2, name: "Drs. Sugeng Widodo, M.M.", position: "Wakil Kepala Sekolah", class_or_subject: "Kesiswaan", nip: "197205151994031002", phone: "08111222334", address: "Kota Mandiri", is_public: true },
  { id: 12, school_id: 2, name: "Ratna Sari, S.T.", position: "Guru", class_or_subject: "Teknik Komputer", nip: "198203151996032002", phone: "08789012345", address: "Kota Mandiri", is_public: true },
  { id: 13, school_id: 2, name: "Agus Prabowo, S.T.", position: "Guru", class_or_subject: "Teknik Mesin", nip: "198506202000031003", phone: "08890123456", address: "Kota Mandiri", is_public: true },
  { id: 14, school_id: 2, name: "Maya Kusuma, S.Pd.", position: "Guru", class_or_subject: "Bahasa Inggris Teknik", nip: "198709102005042004", phone: "08901234567", address: "Kota Mandiri", is_public: true },
  { id: 15, school_id: 2, name: "Eko Prasetyo, S.T.", position: "Guru", class_or_subject: "Teknik Listrik", nip: "198811152007031005", phone: "08012345678", address: "Kota Mandiri", is_public: true },
  { id: 16, school_id: 2, name: "Sri Wahyuni", position: "Tata Usaha", class_or_subject: "-", nip: "199002202010012006", phone: "08123456780", address: "Kota Mandiri", is_public: true },
  { id: 17, school_id: 2, name: "Dewi Kartika", position: "Operator Website", class_or_subject: "-", nip: "199305102016012007", phone: "08234567801", address: "Kota Mandiri", is_public: false },

  // Staff Sekolah 3 - SMP Harapan Bangsa
  { id: 18, school_id: 3, name: "Drs. Hendra Wijaya, M.M.", position: "Kepala Sekolah", class_or_subject: "-", nip: "196905051993031001", phone: "08333444555", address: "Kota Sejahtera", is_public: true },
  { id: 19, school_id: 3, name: "Hj. Fatimah, S.Pd., M.Pd.", position: "Wakil Kepala Sekolah", class_or_subject: "Kurikulum", nip: "197408081995032002", phone: "08333444556", address: "Kota Sejahtera", is_public: true },
  { id: 20, school_id: 3, name: "Ahmad Fauzi, S.Pd.I", position: "Guru", class_or_subject: "Pendidikan Agama", nip: "198001012002031003", phone: "08444555666", address: "Kota Sejahtera", is_public: true },
  { id: 21, school_id: 3, name: "Nurul Hidayah, S.Pd.", position: "Guru", class_or_subject: "Matematika", nip: "198512152008042004", phone: "08555666777", address: "Kota Sejahtera", is_public: true },
  { id: 22, school_id: 3, name: "Andi Setiawan, S.Pd.", position: "Guru", class_or_subject: "IPA", nip: "198704202010011005", phone: "08666777888", address: "Kota Sejahtera", is_public: true },
  { id: 23, school_id: 3, name: "Lina Marlina, S.Pd.", position: "Guru", class_or_subject: "Bahasa Indonesia", nip: "198909102012042006", phone: "08777888999", address: "Kota Sejahtera", is_public: true },
  { id: 24, school_id: 3, name: "Yusuf Maulana", position: "Tata Usaha", class_or_subject: "-", nip: "199105152014011007", phone: "08888999000", address: "Kota Sejahtera", is_public: true },
  { id: 25, school_id: 3, name: "Putri Rahayu", position: "Operator Website", class_or_subject: "-", nip: "199407202017012008", phone: "08999000111", address: "Kota Sejahtera", is_public: false },

  // Staff Sekolah 4 - SD Negeri Cendekia
  { id: 26, school_id: 4, name: "Dra. Kartini Dewi, M.Pd.", position: "Kepala Sekolah", class_or_subject: "-", nip: "196803151990032001", phone: "08211223344", address: "Kota Pintar", is_public: true },
  { id: 27, school_id: 4, name: "Hj. Nurhasanah, S.Pd.", position: "Wakil Kepala Sekolah", class_or_subject: "Kurikulum", nip: "197506201996032002", phone: "08211223345", address: "Kota Pintar", is_public: true },
  { id: 28, school_id: 4, name: "Rina Susanti, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas I", nip: "198201102005042003", phone: "08322334455", address: "Kota Pintar", is_public: true },
  { id: 29, school_id: 4, name: "Ani Wijayanti, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas II", nip: "198405152008042004", phone: "08433445566", address: "Kota Pintar", is_public: true },
  { id: 30, school_id: 4, name: "Budi Hartono, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas III", nip: "198608202010011005", phone: "08544556677", address: "Kota Pintar", is_public: true },
  { id: 31, school_id: 4, name: "Sari Indrawati, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas IV", nip: "198710252012042006", phone: "08655667788", address: "Kota Pintar", is_public: true },
  { id: 32, school_id: 4, name: "Dedi Kurniawan, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas V", nip: "198901302014011007", phone: "08766778899", address: "Kota Pintar", is_public: true },
  { id: 33, school_id: 4, name: "Maya Sari, S.Pd.", position: "Guru", class_or_subject: "Guru Kelas VI", nip: "199004052016042008", phone: "08877889900", address: "Kota Pintar", is_public: true },
  { id: 34, school_id: 4, name: "Agus Santoso, S.Pd.", position: "Guru", class_or_subject: "Pendidikan Jasmani", nip: "198706102010011009", phone: "08988990011", address: "Kota Pintar", is_public: true },
  { id: 35, school_id: 4, name: "Usman Hidayat", position: "Tata Usaha", class_or_subject: "-", nip: "199205102014011010", phone: "08199001122", address: "Kota Pintar", is_public: true },
  { id: 36, school_id: 4, name: "Wati Lestari", position: "Operator Website", class_or_subject: "-", nip: "199508152018012011", phone: "08200112233", address: "Kota Pintar", is_public: false },
];

// Dummy Students - Lebih lengkap per jenjang
export const students: Student[] = [
  // =====================================================
  // Siswa Sekolah 1 - SMA Negeri 1 Nusantara
  // Kelas: X IPA 1-3, X IPS 1-2, XI IPA 1-3, XI IPS 1-2, XII IPA 1-3, XII IPS 1-2
  // =====================================================
  { id: 1, school_id: 1, name: "Andi Pratama", class: "XII IPA 1", nis: "2021001", gender: "L", parent_name: "Bapak Pratama", parent_phone: "08123456789" },
  { id: 2, school_id: 1, name: "Putri Ayu Lestari", class: "XII IPA 1", nis: "2021002", gender: "P", parent_name: "Ibu Ayu", parent_phone: "08234567890" },
  { id: 3, school_id: 1, name: "Budi Setiawan", class: "XII IPA 2", nis: "2021003", gender: "L", parent_name: "Bapak Setiawan", parent_phone: "08345678901" },
  { id: 4, school_id: 1, name: "Citra Dewi", class: "XII IPA 2", nis: "2021004", gender: "P", parent_name: "Ibu Dewi", parent_phone: "08345678902" },
  { id: 5, school_id: 1, name: "Dimas Arya", class: "XII IPA 3", nis: "2021005", gender: "L", parent_name: "Bapak Arya", parent_phone: "08345678903" },
  { id: 6, school_id: 1, name: "Eka Putri", class: "XII IPS 1", nis: "2021006", gender: "P", parent_name: "Ibu Eka", parent_phone: "08345678904" },
  { id: 7, school_id: 1, name: "Fajar Ramadhan", class: "XII IPS 2", nis: "2021007", gender: "L", parent_name: "Bapak Fajar", parent_phone: "08345678905" },
  { id: 8, school_id: 1, name: "Sari Indah Permata", class: "XI IPA 1", nis: "2022001", gender: "P", parent_name: "Ibu Indah", parent_phone: "08456789012" },
  { id: 9, school_id: 1, name: "Galih Pratama", class: "XI IPA 1", nis: "2022002", gender: "L", parent_name: "Bapak Galih", parent_phone: "08456789013" },
  { id: 10, school_id: 1, name: "Hana Safira", class: "XI IPA 2", nis: "2022003", gender: "P", parent_name: "Ibu Hana", parent_phone: "08456789014" },
  { id: 11, school_id: 1, name: "Ilham Wijaya", class: "XI IPA 3", nis: "2022004", gender: "L", parent_name: "Bapak Ilham", parent_phone: "08456789015" },
  { id: 12, school_id: 1, name: "Deni Kurniawan", class: "XI IPS 1", nis: "2022005", gender: "L", parent_name: "Bapak Kurniawan", parent_phone: "08567890123" },
  { id: 13, school_id: 1, name: "Julia Ningsih", class: "XI IPS 2", nis: "2022006", gender: "P", parent_name: "Ibu Julia", parent_phone: "08567890124" },
  { id: 14, school_id: 1, name: "Maya Sari Indah", class: "X IPA 1", nis: "2023001", gender: "P", parent_name: "Ibu Sari", parent_phone: "08678901234" },
  { id: 15, school_id: 1, name: "Krisna Putra", class: "X IPA 1", nis: "2023002", gender: "L", parent_name: "Bapak Krisna", parent_phone: "08678901235" },
  { id: 16, school_id: 1, name: "Lina Marlina", class: "X IPA 2", nis: "2023003", gender: "P", parent_name: "Ibu Lina", parent_phone: "08678901236" },
  { id: 17, school_id: 1, name: "Muhamad Rizki", class: "X IPA 3", nis: "2023004", gender: "L", parent_name: "Bapak Rizki", parent_phone: "08678901237" },
  { id: 18, school_id: 1, name: "Nadia Putri", class: "X IPS 1", nis: "2023005", gender: "P", parent_name: "Ibu Nadia", parent_phone: "08678901238" },
  { id: 19, school_id: 1, name: "Oscar Pratama", class: "X IPS 2", nis: "2023006", gender: "L", parent_name: "Bapak Oscar", parent_phone: "08678901239" },
  
  // =====================================================
  // Siswa Sekolah 2 - SMK Teknologi Merdeka
  // Kelas: X-XII TKJ, RPL, TSM, TBSM
  // =====================================================
  { id: 20, school_id: 2, name: "Rizky Pratama", class: "XII TKJ 1", nis: "2021101", gender: "L", parent_name: "Bapak Rizky", parent_phone: "08111222333" },
  { id: 21, school_id: 2, name: "Dewi Anggraini", class: "XII TKJ 1", nis: "2021102", gender: "P", parent_name: "Ibu Anggraini", parent_phone: "08222333444" },
  { id: 22, school_id: 2, name: "Adi Nugroho", class: "XII TKJ 2", nis: "2021103", gender: "L", parent_name: "Bapak Adi", parent_phone: "08222333445" },
  { id: 23, school_id: 2, name: "Bella Safitri", class: "XII RPL 1", nis: "2021104", gender: "P", parent_name: "Ibu Bella", parent_phone: "08222333446" },
  { id: 24, school_id: 2, name: "Cahyo Wibowo", class: "XII RPL 2", nis: "2021105", gender: "L", parent_name: "Bapak Cahyo", parent_phone: "08222333447" },
  { id: 25, school_id: 2, name: "Diana Permata", class: "XII TSM 1", nis: "2021106", gender: "P", parent_name: "Ibu Diana", parent_phone: "08222333448" },
  { id: 26, school_id: 2, name: "Fajar Nugroho", class: "XI TSM 1", nis: "2022101", gender: "L", parent_name: "Bapak Nugroho", parent_phone: "08333444555" },
  { id: 27, school_id: 2, name: "Gina Rahayu", class: "XI TKJ 1", nis: "2022102", gender: "P", parent_name: "Ibu Gina", parent_phone: "08333444556" },
  { id: 28, school_id: 2, name: "Hendra Putra", class: "XI TKJ 2", nis: "2022103", gender: "L", parent_name: "Bapak Hendra", parent_phone: "08333444557" },
  { id: 29, school_id: 2, name: "Intan Permata", class: "XI RPL 1", nis: "2022104", gender: "P", parent_name: "Ibu Intan", parent_phone: "08333444558" },
  { id: 30, school_id: 2, name: "Joko Susanto", class: "XI TBSM 1", nis: "2022105", gender: "L", parent_name: "Bapak Joko", parent_phone: "08333444559" },
  { id: 31, school_id: 2, name: "Nadia Putri", class: "X RPL 1", nis: "2023101", gender: "P", parent_name: "Ibu Putri", parent_phone: "08444555666" },
  { id: 32, school_id: 2, name: "Kevin Pratama", class: "X RPL 2", nis: "2023102", gender: "L", parent_name: "Bapak Kevin", parent_phone: "08444555667" },
  { id: 33, school_id: 2, name: "Lisa Anggraini", class: "X TKJ 1", nis: "2023103", gender: "P", parent_name: "Ibu Lisa", parent_phone: "08444555668" },
  { id: 34, school_id: 2, name: "Mahendra Putra", class: "X TKJ 2", nis: "2023104", gender: "L", parent_name: "Bapak Mahendra", parent_phone: "08444555669" },
  { id: 35, school_id: 2, name: "Nina Safitri", class: "X TSM 1", nis: "2023105", gender: "P", parent_name: "Ibu Nina", parent_phone: "08444555670" },
  
  // =====================================================
  // Siswa Sekolah 3 - SMP Harapan Bangsa
  // Kelas: 7A-7G, 8A-8G, 9A-9G
  // =====================================================
  { id: 36, school_id: 3, name: "Ahmad Zaki", class: "9-A", nis: "2021201", gender: "L", parent_name: "Bapak Zaki", parent_phone: "08555666777" },
  { id: 37, school_id: 3, name: "Siti Nurhaliza", class: "9-B", nis: "2021202", gender: "P", parent_name: "Ibu Nurhaliza", parent_phone: "08666777888" },
  { id: 38, school_id: 3, name: "Bagus Pratama", class: "9-C", nis: "2021203", gender: "L", parent_name: "Bapak Bagus", parent_phone: "08666777889" },
  { id: 39, school_id: 3, name: "Cinta Amalia", class: "9-D", nis: "2021204", gender: "P", parent_name: "Ibu Cinta", parent_phone: "08666777890" },
  { id: 40, school_id: 3, name: "Doni Saputra", class: "9-E", nis: "2021205", gender: "L", parent_name: "Bapak Doni", parent_phone: "08666777891" },
  { id: 41, school_id: 3, name: "Evi Susanti", class: "9-F", nis: "2021206", gender: "P", parent_name: "Ibu Evi", parent_phone: "08666777892" },
  { id: 42, school_id: 3, name: "Fandi Ahmad", class: "9-G", nis: "2021207", gender: "L", parent_name: "Bapak Fandi", parent_phone: "08666777893" },
  { id: 43, school_id: 3, name: "Raka Aditya", class: "8-A", nis: "2022201", gender: "L", parent_name: "Bapak Aditya", parent_phone: "08777888999" },
  { id: 44, school_id: 3, name: "Gita Nirmala", class: "8-B", nis: "2022202", gender: "P", parent_name: "Ibu Gita", parent_phone: "08777889000" },
  { id: 45, school_id: 3, name: "Hari Prasetyo", class: "8-C", nis: "2022203", gender: "L", parent_name: "Bapak Hari", parent_phone: "08777889001" },
  { id: 46, school_id: 3, name: "Putri Wulandari", class: "8-D", nis: "2022204", gender: "P", parent_name: "Ibu Wulandari", parent_phone: "08100111222" },
  { id: 47, school_id: 3, name: "Ivan Ramadhan", class: "8-E", nis: "2022205", gender: "L", parent_name: "Bapak Ivan", parent_phone: "08777889003" },
  { id: 48, school_id: 3, name: "Aulia Rahmawati", class: "7-A", nis: "2023201", gender: "P", parent_name: "Ibu Rahmawati", parent_phone: "08888999000" },
  { id: 49, school_id: 3, name: "Kiki Fatimah", class: "7-B", nis: "2023202", gender: "P", parent_name: "Ibu Kiki", parent_phone: "08888999001" },
  { id: 50, school_id: 3, name: "Dimas Prasetyo", class: "7-C", nis: "2023203", gender: "L", parent_name: "Bapak Prasetyo", parent_phone: "08999000111" },
  { id: 51, school_id: 3, name: "Luki Hermawan", class: "7-D", nis: "2023204", gender: "L", parent_name: "Bapak Luki", parent_phone: "08888999003" },
  { id: 52, school_id: 3, name: "Mira Anggraini", class: "7-E", nis: "2023205", gender: "P", parent_name: "Ibu Mira", parent_phone: "08888999004" },
  { id: 53, school_id: 3, name: "Nanda Putra", class: "7-F", nis: "2023206", gender: "L", parent_name: "Bapak Nanda", parent_phone: "08888999005" },
  { id: 54, school_id: 3, name: "Ovi Ramadhani", class: "7-G", nis: "2023207", gender: "P", parent_name: "Ibu Ovi", parent_phone: "08888999006" },

  // =====================================================
  // Siswa Sekolah 4 - SD Negeri Cendekia
  // Kelas: I-A, I-B, II-A, II-B, III-A, III-B, IV-A, IV-B, V-A, V-B, VI-A, VI-B
  // =====================================================
  { id: 55, school_id: 4, name: "Aisya Putri", class: "VI-A", nis: "2018301", gender: "P", parent_name: "Ibu Aisya", parent_phone: "08211223344" },
  { id: 56, school_id: 4, name: "Bima Sakti", class: "VI-A", nis: "2018302", gender: "L", parent_name: "Bapak Bima", parent_phone: "08322334455" },
  { id: 57, school_id: 4, name: "Citra Ayu", class: "VI-B", nis: "2018303", gender: "P", parent_name: "Ibu Citra", parent_phone: "08322334456" },
  { id: 58, school_id: 4, name: "Danu Pratama", class: "VI-B", nis: "2018304", gender: "L", parent_name: "Bapak Danu", parent_phone: "08322334457" },
  { id: 59, school_id: 4, name: "Cantika Sari", class: "V-A", nis: "2019301", gender: "P", parent_name: "Ibu Cantika", parent_phone: "08433445566" },
  { id: 60, school_id: 4, name: "Eko Saputra", class: "V-A", nis: "2019302", gender: "L", parent_name: "Bapak Eko", parent_phone: "08433445567" },
  { id: 61, school_id: 4, name: "Fika Amelia", class: "V-B", nis: "2019303", gender: "P", parent_name: "Ibu Fika", parent_phone: "08433445568" },
  { id: 62, school_id: 4, name: "Dafa Pratama", class: "IV-A", nis: "2020301", gender: "L", parent_name: "Bapak Dafa", parent_phone: "08544556677" },
  { id: 63, school_id: 4, name: "Gina Putri", class: "IV-A", nis: "2020302", gender: "P", parent_name: "Ibu Gina", parent_phone: "08544556678" },
  { id: 64, school_id: 4, name: "Hani Rahayu", class: "IV-B", nis: "2020303", gender: "P", parent_name: "Ibu Hani", parent_phone: "08544556679" },
  { id: 65, school_id: 4, name: "Elsa Maharani", class: "III-A", nis: "2021301", gender: "P", parent_name: "Ibu Elsa", parent_phone: "08655667788" },
  { id: 66, school_id: 4, name: "Ilham Maulana", class: "III-A", nis: "2021302", gender: "L", parent_name: "Bapak Ilham", parent_phone: "08655667789" },
  { id: 67, school_id: 4, name: "Jasmine Putri", class: "III-B", nis: "2021303", gender: "P", parent_name: "Ibu Jasmine", parent_phone: "08655667790" },
  { id: 68, school_id: 4, name: "Farhan Rizky", class: "II-A", nis: "2022301", gender: "L", parent_name: "Bapak Farhan", parent_phone: "08766778899" },
  { id: 69, school_id: 4, name: "Keyla Sari", class: "II-A", nis: "2022302", gender: "P", parent_name: "Ibu Keyla", parent_phone: "08766778900" },
  { id: 70, school_id: 4, name: "Luthfi Ahmad", class: "II-B", nis: "2022303", gender: "L", parent_name: "Bapak Luthfi", parent_phone: "08766778901" },
  { id: 71, school_id: 4, name: "Gita Anjani", class: "I-A", nis: "2023301", gender: "P", parent_name: "Ibu Gita", parent_phone: "08877889900" },
  { id: 72, school_id: 4, name: "Hadi Wijaya", class: "I-A", nis: "2023302", gender: "L", parent_name: "Bapak Hadi", parent_phone: "08988990011" },
  { id: 73, school_id: 4, name: "Mira Salsabila", class: "I-B", nis: "2023303", gender: "P", parent_name: "Ibu Mira", parent_phone: "08877889902" },
  { id: 74, school_id: 4, name: "Nabil Pratama", class: "I-B", nis: "2023304", gender: "L", parent_name: "Bapak Nabil", parent_phone: "08877889903" },
];

// Dummy Posts
export const posts: Post[] = [
  // Berita Sekolah 1 - SMA
  {
    id: 1,
    school_id: 1,
    title: "Siswa SMA Negeri 1 Nusantara Raih Emas di Olimpiade Matematika",
    excerpt: "Prestasi membanggakan kembali diraih oleh siswa-siswi kami dalam ajang kompetisi tingkat nasional.",
    content: "Prestasi membanggakan kembali diraih oleh siswa-siswi SMA Negeri 1 Nusantara. Dalam ajang Olimpiade Matematika Nasional yang diselenggarakan pada tanggal 15-17 Januari 2024, tim kami berhasil meraih medali emas. Keberhasilan ini tidak lepas dari kerja keras siswa dan bimbingan guru-guru matematika yang kompeten.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-01-18",
    author: "Admin",
    category: "Prestasi"
  },
  {
    id: 2,
    school_id: 1,
    title: "Pembukaan Pendaftaran Siswa Baru Tahun Ajaran 2024/2025",
    excerpt: "Pendaftaran siswa baru telah dibuka. Segera daftarkan putra-putri Anda untuk bergabung bersama kami.",
    content: "SMA Negeri 1 Nusantara membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025. Pendaftaran dapat dilakukan secara online melalui website resmi sekolah. Tersedia jalur prestasi akademik dan non-akademik dengan kuota terbatas.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-01-10",
    author: "Admin",
    category: "Pengumuman"
  },
  {
    id: 3,
    school_id: 1,
    title: "Peringatan Hari Pendidikan Nasional",
    excerpt: "Upacara peringatan Hardiknas digelar dengan khidmat di lapangan sekolah.",
    content: "Dalam rangka memperingati Hari Pendidikan Nasional, SMA Negeri 1 Nusantara menggelar upacara bendera dan serangkaian kegiatan edukatif. Tema tahun ini adalah 'Pendidikan Berkualitas untuk Indonesia Maju'.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-05-02",
    author: "Operator",
    category: "Kegiatan"
  },
  
  // Berita Sekolah 2 - SMK
  {
    id: 4,
    school_id: 2,
    title: "SMK Teknologi Merdeka Jalin Kerjasama dengan Perusahaan Multinasional",
    excerpt: "Kerjasama strategis untuk meningkatkan kualitas lulusan dan kesempatan magang bagi siswa.",
    content: "SMK Teknologi Merdeka resmi menjalin kerjasama dengan beberapa perusahaan multinasional untuk program magang dan penempatan kerja. MoU ditandatangani langsung oleh Kepala Sekolah dan perwakilan perusahaan.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-01-15",
    author: "Admin",
    category: "Kerjasama"
  },
  {
    id: 5,
    school_id: 2,
    title: "Peluncuran Lab Robotika Terbaru",
    excerpt: "Fasilitas laboratorium robotika modern untuk mendukung pembelajaran siswa.",
    content: "SMK Teknologi Merdeka dengan bangga meluncurkan laboratorium robotika terbaru yang dilengkapi dengan peralatan canggih. Lab ini akan digunakan untuk pembelajaran praktik dan persiapan kompetisi robotika tingkat nasional.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-01-12",
    author: "Admin",
    category: "Fasilitas"
  },
  {
    id: 6,
    school_id: 2,
    title: "Lulusan SMK Teknologi Merdeka Diterima di Perusahaan Ternama",
    excerpt: "Tingkat keterserapan kerja lulusan mencapai 95% tahun ini.",
    content: "Kabar gembira datang dari alumni SMK Teknologi Merdeka. Dari 200 lulusan tahun ini, 190 di antaranya telah diterima bekerja di berbagai perusahaan ternama. Prestasi ini membuktikan kualitas pendidikan vokasi di sekolah kami.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-06-15",
    author: "Operator",
    category: "Prestasi"
  },
  
  // Berita Sekolah 3 - SMP
  {
    id: 7,
    school_id: 3,
    title: "SMP Harapan Bangsa Gelar Pentas Seni Tahunan",
    excerpt: "Siswa menampilkan berbagai bakat seni dan budaya dalam pentas spektakuler.",
    content: "SMP Harapan Bangsa sukses menggelar pentas seni tahunan dengan tema 'Budaya Indonesia'. Berbagai penampilan seni tradisional dan modern ditampilkan oleh siswa-siswi berbakat. Acara ini dihadiri oleh orang tua siswa dan tamu undangan.",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-02-20",
    author: "Admin",
    category: "Kegiatan"
  },
  {
    id: 8,
    school_id: 3,
    title: "Program Literasi Digital untuk Siswa",
    excerpt: "Pelatihan penggunaan teknologi yang bijak dan produktif bagi generasi muda.",
    content: "Dalam era digital ini, SMP Harapan Bangsa meluncurkan program literasi digital untuk seluruh siswa. Program ini mencakup pelatihan penggunaan internet yang aman, etika bermedia sosial, dan pemanfaatan teknologi untuk pembelajaran.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-03-05",
    author: "Operator",
    category: "Program"
  },
  {
    id: 9,
    school_id: 3,
    title: "Tim Basket SMP Harapan Bangsa Juara Tingkat Kota",
    excerpt: "Prestasi membanggakan dari tim basket putra dalam kejuaraan antar SMP.",
    content: "Tim basket putra SMP Harapan Bangsa berhasil meraih juara pertama dalam kejuaraan basket antar SMP tingkat Kota Sejahtera. Kemenangan ini diraih setelah mengalahkan 15 sekolah peserta lainnya.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-04-10",
    author: "Admin",
    category: "Prestasi"
  },

  // Berita Sekolah 4 - SD
  {
    id: 10,
    school_id: 4,
    title: "Perayaan Hari Anak Nasional di SD Negeri Cendekia",
    excerpt: "Berbagai lomba dan pertunjukan seru mewarnai perayaan Hari Anak Nasional.",
    content: "SD Negeri Cendekia menggelar perayaan Hari Anak Nasional dengan berbagai kegiatan menarik. Lomba mewarnai, fashion show, dan pertunjukan tari menjadi rangkaian acara yang sangat dinantikan siswa-siswi.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-07-23",
    author: "Admin",
    category: "Kegiatan"
  },
  {
    id: 11,
    school_id: 4,
    title: "Program Sarapan Sehat untuk Siswa",
    excerpt: "Sekolah menyediakan sarapan sehat gratis untuk mendukung konsentrasi belajar.",
    content: "SD Negeri Cendekia meluncurkan program sarapan sehat gratis bagi seluruh siswa. Program ini bertujuan memastikan siswa memiliki energi yang cukup untuk belajar dan beraktivitas di sekolah.",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-08-01",
    author: "Admin",
    category: "Program"
  },
  {
    id: 12,
    school_id: 4,
    title: "Kelas Kreativitas: Membuat Kerajinan dari Barang Bekas",
    excerpt: "Siswa belajar mengolah sampah menjadi karya seni yang bernilai.",
    content: "Dalam rangka mengajarkan kepedulian lingkungan, SD Negeri Cendekia mengadakan kelas kreativitas membuat kerajinan dari barang bekas. Siswa antusias membuat berbagai karya dari botol plastik, kardus, dan bahan daur ulang lainnya.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop",
    status: "published",
    created_at: "2024-09-15",
    author: "Operator",
    category: "Kegiatan"
  }
];

// Dummy Gallery
export const gallery: GalleryItem[] = [
  // Galeri Sekolah 1 - SMA
  { id: 1, school_id: 1, title: "Upacara Bendera", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-01-15" },
  { id: 2, school_id: 1, title: "Laboratorium Komputer", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-10" },
  { id: 3, school_id: 1, title: "Perpustakaan", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-08" },
  { id: 4, school_id: 1, title: "Ekstrakurikuler Musik", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop", category: "Ekstrakurikuler", created_at: "2024-01-05" },
  { id: 5, school_id: 1, title: "Lapangan Olahraga", image: "https://images.unsplash.com/photo-1461896836934-bc965c883d62?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-02-01" },
  { id: 6, school_id: 1, title: "Kegiatan Pramuka", image: "https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?w=600&h=400&fit=crop", category: "Ekstrakurikuler", created_at: "2024-02-15" },
  
  // Galeri Sekolah 2 - SMK
  { id: 7, school_id: 2, title: "Workshop Teknik", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-12" },
  { id: 8, school_id: 2, title: "Praktek Industri", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-01-20" },
  { id: 9, school_id: 2, title: "Lab Robotika", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-18" },
  { id: 10, school_id: 2, title: "Wisuda Lulusan", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-06-20" },
  { id: 11, school_id: 2, title: "Lab Komputer", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-02-05" },
  { id: 12, school_id: 2, title: "Kunjungan Industri", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-03-10" },
  
  // Galeri Sekolah 3 - SMP
  { id: 13, school_id: 3, title: "Gedung Sekolah", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-01" },
  { id: 14, school_id: 3, title: "Ruang Kelas", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-02" },
  { id: 15, school_id: 3, title: "Pentas Seni", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-02-20" },
  { id: 16, school_id: 3, title: "Kegiatan Olahraga", image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop", category: "Ekstrakurikuler", created_at: "2024-03-15" },
  { id: 17, school_id: 3, title: "Perpustakaan Modern", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-04-01" },
  { id: 18, school_id: 3, title: "Taman Sekolah", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-04-10" },

  // Galeri Sekolah 4 - SD
  { id: 19, school_id: 4, title: "Ruang Bermain", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-05" },
  { id: 20, school_id: 4, title: "Perpustakaan Anak", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-01-10" },
  { id: 21, school_id: 4, title: "Upacara Bendera", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-02-01" },
  { id: 22, school_id: 4, title: "Kelas Kreativitas", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-02-15" },
  { id: 23, school_id: 4, title: "Olahraga Pagi", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop", category: "Kegiatan", created_at: "2024-03-01" },
  { id: 24, school_id: 4, title: "Taman Bermain", image: "https://images.unsplash.com/photo-1576495169475-6731aec5e3c2?w=600&h=400&fit=crop", category: "Fasilitas", created_at: "2024-03-10" },
];

// Dummy School Registrations
export const schoolRegistrations: SchoolRegistration[] = [
  {
    id: 1,
    school_name: "SMA Negeri 5 Jakarta",
    domain: "sman5jakarta.sch.id",
    level: 'SMA',
    address: "Jl. Sudirman No. 45, Jakarta Pusat",
    phone: "(021) 555-0123",
    email: "info@sman5jakarta.sch.id",
    contact_person: "Drs. Ahmad Santoso",
    contact_phone: "081234567890",
    status: 'pending',
    registration_date: "2024-01-15",
    notes: "Sekolah negeri dengan akreditasi A"
  },
  {
    id: 2,
    school_name: "SMK Teknologi Informasi Bandung",
    domain: "smktibandung.sch.id",
    level: 'SMK',
    address: "Jl. Teknologi No. 12, Bandung",
    phone: "(022) 555-0456",
    email: "admin@smktibandung.sch.id",
    contact_person: "Ir. Siti Nurhaliza",
    contact_phone: "081345678901",
    status: 'pending',
    registration_date: "2024-01-14",
    notes: "Fokus pada jurusan IT dan programming"
  },
  {
    id: 3,
    school_name: "SD Islam Terpadu Surabaya",
    domain: "sditsurabaya.sch.id",
    level: 'SD',
    address: "Jl. Pahlawan No. 78, Surabaya",
    phone: "(031) 555-0789",
    email: "contact@sditsurabaya.sch.id",
    contact_person: "Hj. Fatimah Azzahra",
    contact_phone: "081456789012",
    status: 'approved',
    registration_date: "2024-01-10",
    notes: "Sekolah Islam dengan kurikulum terpadu"
  },
  {
    id: 4,
    school_name: "SMP Plus Medan",
    domain: "smpplusmedan.sch.id",
    level: 'SMP',
    address: "Jl. Thamrin No. 33, Medan",
    phone: "(061) 555-0321",
    email: "info@smpplusmedan.sch.id",
    contact_person: "Dr. Budi Santoso, M.Pd.",
    contact_phone: "081567890123",
    status: 'pending',
    registration_date: "2024-01-13",
    notes: "Sekolah unggulan dengan program akselerasi"
  },
  {
    id: 5,
    school_name: "SMA Swasta Cendekia Yogyakarta",
    domain: "smacendekiayogya.sch.id",
    level: 'SMA',
    address: "Jl. Malioboro No. 56, Yogyakarta",
    phone: "(0274) 555-0654",
    email: "admin@smacendekiayogya.sch.id",
    contact_person: "Dra. Maya Sari, M.Pd.",
    contact_phone: "081678901234",
    status: 'rejected',
    registration_date: "2024-01-08",
    notes: "Domain sudah digunakan sekolah lain"
  }
];

// Dummy users untuk hint di dev mode
export interface DummyUser {
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN_SEKOLAH' | 'OPERATOR';
  name: string;
  schoolId?: number;
}

export const dummyUsers: DummyUser[] = [
  { email: 'superadmin@maddasoft.id', role: 'SUPER_ADMIN', name: 'Super Administrator' },
  { email: 'admin@sman1nusantara.sch.id', role: 'ADMIN_SEKOLAH', name: 'Dra. Siti Aminah, M.Pd.', schoolId: 1 },
  { email: 'operator@sman1nusantara.sch.id', role: 'OPERATOR', name: 'Rudi Hermawan', schoolId: 1 },
  { email: 'admin@smkteknologimerdeka.sch.id', role: 'ADMIN_SEKOLAH', name: 'Ir. Bambang Hermawan, M.T.', schoolId: 2 },
  { email: 'operator@smkteknologimerdeka.sch.id', role: 'OPERATOR', name: 'Dewi Kartika', schoolId: 2 },
  { email: 'admin@smpharapanbangsa.sch.id', role: 'ADMIN_SEKOLAH', name: 'Drs. Hendra Wijaya, M.M.', schoolId: 3 },
  { email: 'operator@smpharapanbangsa.sch.id', role: 'OPERATOR', name: 'Putri Rahayu', schoolId: 3 },
  { email: 'admin@sdncendekia.sch.id', role: 'ADMIN_SEKOLAH', name: 'Dra. Kartini Dewi, M.Pd.', schoolId: 4 },
  { email: 'operator@sdncendekia.sch.id', role: 'OPERATOR', name: 'Wati Lestari', schoolId: 4 },
];

// Helper functions
export const getSchoolById = (id: number): School | undefined => {
  return schools.find(s => s.id === id);
};

export const getSchoolByDomain = (domain: string): School | undefined => {
  const normalizedDomain = domain.toLowerCase().replace(/^www\./, '');
  return schools.find(s => s.domain.toLowerCase() === normalizedDomain);
};

export const getStaffBySchool = (schoolId: number): Staff[] => {
  return staff.filter(s => s.school_id === schoolId && s.is_public);
};

export const getAllStaffBySchool = (schoolId: number): Staff[] => {
  return staff.filter(s => s.school_id === schoolId);
};

export const getPostsBySchool = (schoolId: number): Post[] => {
  return posts.filter(p => p.school_id === schoolId && p.status === 'published');
};

export const getGalleryBySchool = (schoolId: number): GalleryItem[] => {
  return gallery.filter(g => g.school_id === schoolId);
};

export const getActiveSchools = (): School[] => {
  return schools.filter(s => s.is_active);
};

export const getStudentsBySchool = (schoolId: number): Student[] => {
  return students.filter(s => s.school_id === schoolId);
};

export const getDummyUsersBySchool = (schoolId: number): DummyUser[] => {
  return dummyUsers.filter(u => u.schoolId === schoolId);
};

export const getSchoolRegistrations = (): SchoolRegistration[] => {
  return schoolRegistrations;
};

export const getPendingSchoolRegistrations = (): SchoolRegistration[] => {
  return schoolRegistrations.filter(reg => reg.status === 'pending');
};

// Helper: Get school level label in Indonesian
export const getSchoolLevelLabel = (level: SchoolLevel): string => {
  switch (level) {
    case 'SD':
      return 'Sekolah Dasar';
    case 'SMP':
      return 'Sekolah Menengah Pertama';
    case 'SMA':
      return 'Sekolah Menengah Atas';
    case 'SMK':
      return 'Sekolah Menengah Kejuruan';
    default:
      return level;
  }
};
