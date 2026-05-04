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
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      countries: {
        Row: {
          country_code: string
          country_name: string
          is_active: boolean
        }
        Insert: {
          country_code: string
          country_name: string
          is_active?: boolean
        }
        Update: {
          country_code?: string
          country_name?: string
          is_active?: boolean
        }
        Relationships: []
      }
      gi_entries: {
        Row: {
          aliases: Json
          all_gi_names: Json
          category: string
          country: string
          country_code: string
          created_at: string
          gi_id: string
          gi_type_primary: string
          gi_types_all: Json
          horeca_use: string | null
          is_data_thin: boolean
          packaging_formats: Json
          primary_gi_name: string
          seasonal_months: Json
          source_layer: string
          tasting_notes: string | null
          updated_at: string
        }
        Insert: {
          aliases?: Json
          all_gi_names?: Json
          category: string
          country: string
          country_code: string
          created_at?: string
          gi_id: string
          gi_type_primary: string
          gi_types_all?: Json
          horeca_use?: string | null
          is_data_thin?: boolean
          packaging_formats?: Json
          primary_gi_name: string
          seasonal_months?: Json
          source_layer?: string
          tasting_notes?: string | null
          updated_at?: string
        }
        Update: {
          aliases?: Json
          all_gi_names?: Json
          category?: string
          country?: string
          country_code?: string
          created_at?: string
          gi_id?: string
          gi_type_primary?: string
          gi_types_all?: Json
          horeca_use?: string | null
          is_data_thin?: boolean
          packaging_formats?: Json
          primary_gi_name?: string
          seasonal_months?: Json
          source_layer?: string
          tasting_notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gi_entries_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
        ]
      }
      heritage_products: {
        Row: {
          cluster: string | null
          country: string
          country_code: string
          created_at: string
          cross_reference_layer: string | null
          gi_id_link: string | null
          heritage_id: string
          horeca_use: string | null
          name: string
          producer_count_estimate: number | null
          producer_count_raw: string | null
          region: string | null
          registry: string | null
          scale: string | null
          source_layer: string
          updated_at: string
        }
        Insert: {
          cluster?: string | null
          country: string
          country_code: string
          created_at?: string
          cross_reference_layer?: string | null
          gi_id_link?: string | null
          heritage_id: string
          horeca_use?: string | null
          name: string
          producer_count_estimate?: number | null
          producer_count_raw?: string | null
          region?: string | null
          registry?: string | null
          scale?: string | null
          source_layer?: string
          updated_at?: string
        }
        Update: {
          cluster?: string | null
          country?: string
          country_code?: string
          created_at?: string
          cross_reference_layer?: string | null
          gi_id_link?: string | null
          heritage_id?: string
          horeca_use?: string | null
          name?: string
          producer_count_estimate?: number | null
          producer_count_raw?: string | null
          region?: string | null
          registry?: string | null
          scale?: string | null
          source_layer?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "heritage_products_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
          {
            foreignKeyName: "heritage_products_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "gi_entries"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "heritage_products_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_gi_with_prices"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "heritage_products_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_gi_with_producers"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "heritage_products_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_seasonal_gi"
            referencedColumns: ["gi_id"]
          },
        ]
      }
      price_benchmarks: {
        Row: {
          cluster: string | null
          confidence: string
          country: string
          country_code: string
          created_at: string
          eur_high: number | null
          eur_low: number | null
          eur_typical: number | null
          format: string | null
          gi_id_link: string | null
          gi_or_category: string
          sku_id: string
          source_layer: string
          source_logic: string | null
          tier: string
          unit: string
          updated_at: string
          valid_until: string
        }
        Insert: {
          cluster?: string | null
          confidence: string
          country: string
          country_code: string
          created_at?: string
          eur_high?: number | null
          eur_low?: number | null
          eur_typical?: number | null
          format?: string | null
          gi_id_link?: string | null
          gi_or_category: string
          sku_id: string
          source_layer?: string
          source_logic?: string | null
          tier: string
          unit: string
          updated_at?: string
          valid_until?: string
        }
        Update: {
          cluster?: string | null
          confidence?: string
          country?: string
          country_code?: string
          created_at?: string
          eur_high?: number | null
          eur_low?: number | null
          eur_typical?: number | null
          format?: string | null
          gi_id_link?: string | null
          gi_or_category?: string
          sku_id?: string
          source_layer?: string
          source_logic?: string | null
          tier?: string
          unit?: string
          updated_at?: string
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_benchmarks_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
          {
            foreignKeyName: "price_benchmarks_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "gi_entries"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "price_benchmarks_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_gi_with_prices"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "price_benchmarks_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_gi_with_producers"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "price_benchmarks_gi_id_link_fkey"
            columns: ["gi_id_link"]
            isOneToOne: false
            referencedRelation: "v_seasonal_gi"
            referencedColumns: ["gi_id"]
          },
        ]
      }
      producer_gi_links: {
        Row: {
          gi_id: string
          producer_id: string
          raw_gi_name: string
        }
        Insert: {
          gi_id: string
          producer_id: string
          raw_gi_name: string
        }
        Update: {
          gi_id?: string
          producer_id?: string
          raw_gi_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "producer_gi_links_gi_id_fkey"
            columns: ["gi_id"]
            isOneToOne: false
            referencedRelation: "gi_entries"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "producer_gi_links_gi_id_fkey"
            columns: ["gi_id"]
            isOneToOne: false
            referencedRelation: "v_gi_with_prices"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "producer_gi_links_gi_id_fkey"
            columns: ["gi_id"]
            isOneToOne: false
            referencedRelation: "v_gi_with_producers"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "producer_gi_links_gi_id_fkey"
            columns: ["gi_id"]
            isOneToOne: false
            referencedRelation: "v_seasonal_gi"
            referencedColumns: ["gi_id"]
          },
          {
            foreignKeyName: "producer_gi_links_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "producers"
            referencedColumns: ["producer_id"]
          },
          {
            foreignKeyName: "producer_gi_links_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "v_gi_with_producers"
            referencedColumns: ["producer_id"]
          },
        ]
      }
      producers: {
        Row: {
          cluster: string | null
          commercial_notes: string | null
          country: string
          country_code: string
          created_at: string
          export_to_eu: boolean | null
          gis_associated_raw: Json
          parent_company: string | null
          producer_id: string
          producer_name: string
          region_town: string | null
          source_layer: string
          tier: string
          updated_at: string
          website: string | null
        }
        Insert: {
          cluster?: string | null
          commercial_notes?: string | null
          country: string
          country_code: string
          created_at?: string
          export_to_eu?: boolean | null
          gis_associated_raw?: Json
          parent_company?: string | null
          producer_id: string
          producer_name: string
          region_town?: string | null
          source_layer?: string
          tier: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          cluster?: string | null
          commercial_notes?: string | null
          country?: string
          country_code?: string
          created_at?: string
          export_to_eu?: boolean | null
          gis_associated_raw?: Json
          parent_company?: string | null
          producer_id?: string
          producer_name?: string
          region_town?: string | null
          source_layer?: string
          tier?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producers_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
        ]
      }
    }
    Views: {
      v_gi_with_prices: {
        Row: {
          category: string | null
          country_code: string | null
          eur_high: number | null
          eur_low: number | null
          eur_typical: number | null
          format: string | null
          gi_id: string | null
          gi_type_primary: string | null
          is_data_thin: boolean | null
          price_confidence: string | null
          price_tier: string | null
          primary_gi_name: string | null
          sku_id: string | null
          unit: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gi_entries_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
        ]
      }
      v_gi_with_producers: {
        Row: {
          category: string | null
          country_code: string | null
          export_to_eu: boolean | null
          gi_id: string | null
          primary_gi_name: string | null
          producer_id: string | null
          producer_name: string | null
          producer_tier: string | null
          website: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gi_entries_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
        ]
      }
      v_seasonal_gi: {
        Row: {
          category: string | null
          country_code: string | null
          gi_id: string | null
          primary_gi_name: string | null
          seasonal_months: Json | null
        }
        Insert: {
          category?: string | null
          country_code?: string | null
          gi_id?: string | null
          primary_gi_name?: string | null
          seasonal_months?: Json | null
        }
        Update: {
          category?: string | null
          country_code?: string | null
          gi_id?: string | null
          primary_gi_name?: string | null
          seasonal_months?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "gi_entries_country_code_fkey"
            columns: ["country_code"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["country_code"]
          },
        ]
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
