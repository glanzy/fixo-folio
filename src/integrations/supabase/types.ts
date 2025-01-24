export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billing: {
        Row: {
          created_at: string | null
          delivery_charge: number | null
          discount: number | null
          id: number
          payment_status: string | null
          service_charge: number
          service_id: string | null
          total_amount: number
          warranty_period: number | null
        }
        Insert: {
          created_at?: string | null
          delivery_charge?: number | null
          discount?: number | null
          id?: never
          payment_status?: string | null
          service_charge: number
          service_id?: string | null
          total_amount: number
          warranty_period?: number | null
        }
        Update: {
          created_at?: string | null
          delivery_charge?: number | null
          discount?: number | null
          id?: never
          payment_status?: string | null
          service_charge?: number
          service_id?: string | null
          total_amount?: number
          warranty_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["service_id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string
          created_at: string | null
          mobile: string
          name: string
          preferred_date: string
          preferred_time: string
          service_id: string
        }
        Insert: {
          address: string
          created_at?: string | null
          mobile: string
          name: string
          preferred_date: string
          preferred_time: string
          service_id: string
        }
        Update: {
          address?: string
          created_at?: string | null
          mobile?: string
          name?: string
          preferred_date?: string
          preferred_time?: string
          service_id?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string | null
          device_model: string
          device_name: string | null
          device_type: string
          id: number
          problem_description: string
          service_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_model: string
          device_name?: string | null
          device_type: string
          id?: never
          problem_description: string
          service_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_model?: string
          device_name?: string | null
          device_type?: string
          id?: never
          problem_description?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["service_id"]
          },
        ]
      }
      feedback: {
        Row: {
          created_at: string | null
          email: string | null
          feedback_text: string
          id: number
          name: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          feedback_text: string
          id?: never
          name?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          feedback_text?: string
          id?: never
          name?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      repair_images: {
        Row: {
          id: number
          image_type: string
          image_url: string
          service_id: string | null
          spare_part_serial: string | null
          uploaded_at: string | null
        }
        Insert: {
          id?: never
          image_type: string
          image_url: string
          service_id?: string | null
          spare_part_serial?: string | null
          uploaded_at?: string | null
        }
        Update: {
          id?: never
          image_type?: string
          image_url?: string
          service_id?: string | null
          spare_part_serial?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repair_images_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["service_id"]
          },
        ]
      }
      service_tracking: {
        Row: {
          completed: boolean | null
          id: number
          notes: string | null
          service_id: string | null
          status: string
          status_date: string | null
        }
        Insert: {
          completed?: boolean | null
          id?: never
          notes?: string | null
          service_id?: string | null
          status: string
          status_date?: string | null
        }
        Update: {
          completed?: boolean | null
          id?: never
          notes?: string | null
          service_id?: string | null
          status?: string
          status_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_tracking_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["service_id"]
          },
        ]
      }
      warranty_claims: {
        Row: {
          claim_description: string
          claim_status: string | null
          created_at: string | null
          id: number
          service_id: string | null
        }
        Insert: {
          claim_description: string
          claim_status?: string | null
          created_at?: string | null
          id?: never
          service_id?: string | null
        }
        Update: {
          claim_description?: string
          claim_status?: string | null
          created_at?: string | null
          id?: never
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "warranty_claims_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["service_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
