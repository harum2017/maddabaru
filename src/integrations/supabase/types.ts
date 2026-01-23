export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      gallery: {
        Row: {
          author_id: string | null
          category: string | null
          created_at: string | null
          id: number
          image_url: string
          school_id: number
          title: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          image_url: string
          school_id: number
          title: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          image_url?: string
          school_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: number
          image_url: string | null
          school_id: number
          status: Database["public"]["Enums"]["post_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: number
          image_url?: string | null
          school_id: number
          status?: Database["public"]["Enums"]["post_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: number
          image_url?: string | null
          school_id?: number
          status?: Database["public"]["Enums"]["post_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          school_id: number | null
          staff_id: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          school_id?: number | null
          staff_id?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          school_id?: number | null
          staff_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      school_registrations: {
        Row: {
          address: string | null
          contact_person: string | null
          contact_phone: string | null
          created_at: string | null
          domain: string | null
          email: string | null
          id: number
          level: Database["public"]["Enums"]["school_level"] | null
          notes: string | null
          phone: string | null
          registration_date: string | null
          school_name: string
          status: Database["public"]["Enums"]["registration_status"] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          domain?: string | null
          email?: string | null
          id?: number
          level?: Database["public"]["Enums"]["school_level"] | null
          notes?: string | null
          phone?: string | null
          registration_date?: string | null
          school_name: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          created_at?: string | null
          domain?: string | null
          email?: string | null
          id?: number
          level?: Database["public"]["Enums"]["school_level"] | null
          notes?: string | null
          phone?: string | null
          registration_date?: string | null
          school_name?: string
          status?: Database["public"]["Enums"]["registration_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      schools: {
        Row: {
          about: string | null
          accreditation: string | null
          address: string | null
          created_at: string | null
          domain: string
          email: string | null
          founded_year: number | null
          hero_images: string[] | null
          id: number
          is_active: boolean | null
          level: Database["public"]["Enums"]["school_level"]
          logo: string | null
          mission: string[] | null
          name: string
          npsn: string | null
          phone: string | null
          profile_image: string | null
          student_count: number | null
          theme_color: string | null
          updated_at: string | null
          vision: string | null
        }
        Insert: {
          about?: string | null
          accreditation?: string | null
          address?: string | null
          created_at?: string | null
          domain: string
          email?: string | null
          founded_year?: number | null
          hero_images?: string[] | null
          id?: number
          is_active?: boolean | null
          level: Database["public"]["Enums"]["school_level"]
          logo?: string | null
          mission?: string[] | null
          name: string
          npsn?: string | null
          phone?: string | null
          profile_image?: string | null
          student_count?: number | null
          theme_color?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Update: {
          about?: string | null
          accreditation?: string | null
          address?: string | null
          created_at?: string | null
          domain?: string
          email?: string | null
          founded_year?: number | null
          hero_images?: string[] | null
          id?: number
          is_active?: boolean | null
          level?: Database["public"]["Enums"]["school_level"]
          logo?: string | null
          mission?: string[] | null
          name?: string
          npsn?: string | null
          phone?: string | null
          profile_image?: string | null
          student_count?: number | null
          theme_color?: string | null
          updated_at?: string | null
          vision?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          address: string | null
          birth_date: string | null
          birth_place: string | null
          bpjs_kesehatan: string | null
          bpjs_ketenagakerjaan: string | null
          children_count: number | null
          class_or_subject: string | null
          created_at: string | null
          education_level: string | null
          email: string | null
          email_personal: string | null
          employment_status:
            | Database["public"]["Enums"]["employment_status"]
            | null
          father_name: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: number
          is_public: boolean | null
          major: string | null
          marriage_status: string | null
          mother_name: string | null
          name: string
          nik: string | null
          nip: string | null
          npwp: string | null
          nuptk: string | null
          phone: string | null
          photo_url: string | null
          position: string | null
          rank_grade: string | null
          school_id: number
          sk_number: string | null
          spouse_name: string | null
          taspen: string | null
          tmt_employment: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          bpjs_kesehatan?: string | null
          bpjs_ketenagakerjaan?: string | null
          children_count?: number | null
          class_or_subject?: string | null
          created_at?: string | null
          education_level?: string | null
          email?: string | null
          email_personal?: string | null
          employment_status?:
            | Database["public"]["Enums"]["employment_status"]
            | null
          father_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: number
          is_public?: boolean | null
          major?: string | null
          marriage_status?: string | null
          mother_name?: string | null
          name: string
          nik?: string | null
          nip?: string | null
          npwp?: string | null
          nuptk?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          rank_grade?: string | null
          school_id: number
          sk_number?: string | null
          spouse_name?: string | null
          taspen?: string | null
          tmt_employment?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          bpjs_kesehatan?: string | null
          bpjs_ketenagakerjaan?: string | null
          children_count?: number | null
          class_or_subject?: string | null
          created_at?: string | null
          education_level?: string | null
          email?: string | null
          email_personal?: string | null
          employment_status?:
            | Database["public"]["Enums"]["employment_status"]
            | null
          father_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: number
          is_public?: boolean | null
          major?: string | null
          marriage_status?: string | null
          mother_name?: string | null
          name?: string
          nik?: string | null
          nip?: string | null
          npwp?: string | null
          nuptk?: string | null
          phone?: string | null
          photo_url?: string | null
          position?: string | null
          rank_grade?: string | null
          school_id?: number
          sk_number?: string | null
          spouse_name?: string | null
          taspen?: string | null
          tmt_employment?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string | null
          birth_date: string | null
          birth_place: string | null
          class: string | null
          created_at: string | null
          entry_semester: string | null
          entry_year: string | null
          father_name: string | null
          father_occupation: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          guardian_name: string | null
          guardian_phone: string | null
          id: number
          mother_name: string | null
          mother_occupation: string | null
          name: string
          nis: string | null
          nisn: string | null
          parent_name: string | null
          parent_phone: string | null
          previous_school: string | null
          religion: string | null
          school_id: number
          status: Database["public"]["Enums"]["student_status"] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          class?: string | null
          created_at?: string | null
          entry_semester?: string | null
          entry_year?: string | null
          father_name?: string | null
          father_occupation?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: number
          mother_name?: string | null
          mother_occupation?: string | null
          name: string
          nis?: string | null
          nisn?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          previous_school?: string | null
          religion?: string | null
          school_id: number
          status?: Database["public"]["Enums"]["student_status"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          birth_place?: string | null
          class?: string | null
          created_at?: string | null
          entry_semester?: string | null
          entry_year?: string | null
          father_name?: string | null
          father_occupation?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          guardian_name?: string | null
          guardian_phone?: string | null
          id?: number
          mother_name?: string | null
          mother_occupation?: string | null
          name?: string
          nis?: string | null
          nisn?: string | null
          parent_name?: string | null
          parent_phone?: string | null
          previous_school?: string | null
          religion?: string | null
          school_id?: number
          status?: Database["public"]["Enums"]["student_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_school: {
        Args: { _school_id: number; _user_id: string }
        Returns: boolean
      }
      get_user_school_id: { Args: { _user_id: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "admin_sekolah" | "operator"
      employment_status:
        | "PNS"
        | "PPPK"
        | "Honorer"
        | "Tetap Yayasan"
        | "Tidak Tetap Yayasan"
      gender_type: "L" | "P"
      post_status: "draft" | "published"
      registration_status: "pending" | "approved" | "rejected"
      school_level: "SD" | "SMP" | "SMA" | "SMK"
      student_status: "aktif" | "pindah" | "lulus" | "keluar"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin_sekolah", "operator"],
      employment_status: [
        "PNS",
        "PPPK",
        "Honorer",
        "Tetap Yayasan",
        "Tidak Tetap Yayasan",
      ],
      gender_type: ["L", "P"],
      post_status: ["draft", "published"],
      registration_status: ["pending", "approved", "rejected"],
      school_level: ["SD", "SMP", "SMA", "SMK"],
      student_status: ["aktif", "pindah", "lulus", "keluar"],
    },
  },
} as const
