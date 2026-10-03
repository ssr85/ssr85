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
    PostgrestVersion: "14.18"
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
      content_queue: {
        Row: {
          action_type: Database["public"]["Enums"]["content_action_type"]
          brief_data: Json | null
          created_at: string
          draft_content_markdown: string | null
          existing_page_url: string | null
          id: string
          primary_keywords: string[]
          priority_score: number
          published_post_id: string | null
          published_url: string | null
          review_notes: string | null
          secondary_keywords: string[] | null
          seo_meta: Json | null
          status: Database["public"]["Enums"]["content_lifecycle_status"]
          target_slug: string | null
          target_topic: string
          updated_at: string
        }
        Insert: {
          action_type?: Database["public"]["Enums"]["content_action_type"]
          brief_data?: Json | null
          created_at?: string
          draft_content_markdown?: string | null
          existing_page_url?: string | null
          id?: string
          primary_keywords?: string[]
          priority_score?: number
          published_post_id?: string | null
          published_url?: string | null
          review_notes?: string | null
          secondary_keywords?: string[] | null
          seo_meta?: Json | null
          status?: Database["public"]["Enums"]["content_lifecycle_status"]
          target_slug?: string | null
          target_topic: string
          updated_at?: string
        }
        Update: {
          action_type?: Database["public"]["Enums"]["content_action_type"]
          brief_data?: Json | null
          created_at?: string
          draft_content_markdown?: string | null
          existing_page_url?: string | null
          id?: string
          primary_keywords?: string[]
          priority_score?: number
          published_post_id?: string | null
          published_url?: string | null
          review_notes?: string | null
          secondary_keywords?: string[] | null
          seo_meta?: Json | null
          status?: Database["public"]["Enums"]["content_lifecycle_status"]
          target_slug?: string | null
          target_topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          client_ip: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          recaptcha_score: number | null
          requirement: string
        }
        Insert: {
          client_ip?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          recaptcha_score?: number | null
          requirement: string
        }
        Update: {
          client_ip?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          recaptcha_score?: number | null
          requirement?: string
        }
        Relationships: []
      }
      keyword_metrics: {
        Row: {
          ads_monthly_volume: number | null
          average_position: number
          clicks: number
          country: string | null
          created_at: string
          ctr: number
          device: string | null
          id: string
          impressions: number
          page_url: string
          query: string
          recorded_date: string
        }
        Insert: {
          ads_monthly_volume?: number | null
          average_position?: number
          clicks?: number
          country?: string | null
          created_at?: string
          ctr?: number
          device?: string | null
          id?: string
          impressions?: number
          page_url: string
          query: string
          recorded_date?: string
        }
        Update: {
          ads_monthly_volume?: number | null
          average_position?: number
          clicks?: number
          country?: string | null
          created_at?: string
          ctr?: number
          device?: string | null
          id?: string
          impressions?: number
          page_url?: string
          query?: string
          recorded_date?: string
        }
        Relationships: []
      }
      page_performance: {
        Row: {
          active_users: number
          avg_engagement_time_sec: number | null
          bounce_rate: number | null
          conversions: number | null
          created_at: string
          engagement_rate: number | null
          id: string
          page_path: string
          page_views: number
          recorded_date: string
        }
        Insert: {
          active_users?: number
          avg_engagement_time_sec?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          page_path: string
          page_views?: number
          recorded_date?: string
        }
        Update: {
          active_users?: number
          avg_engagement_time_sec?: number | null
          bounce_rate?: number | null
          conversions?: number | null
          created_at?: string
          engagement_rate?: number | null
          id?: string
          page_path?: string
          page_views?: number
          recorded_date?: string
        }
        Relationships: []
      }
      service_leads: {
        Row: {
          client_ip: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          lead_status: string
          name: string
          phone: string | null
          referring_query: string | null
          requirement: string
          source_url: string | null
          target_service: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          client_ip?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          lead_status?: string
          name: string
          phone?: string | null
          referring_query?: string | null
          requirement: string
          source_url?: string | null
          target_service: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          client_ip?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_status?: string
          name?: string
          phone?: string | null
          referring_query?: string | null
          requirement?: string
          source_url?: string | null
          target_service?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      content_action_type: "CREATE" | "IMPROVE" | "CONSOLIDATE"
      content_lifecycle_status:
        | "DISCOVERED"
        | "PLANNED"
        | "DRAFTED"
        | "IN_REVIEW"
        | "PUBLISHED"
        | "ARCHIVED"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
    Enums: {
      app_role: ["admin", "user"],
      content_action_type: ["CREATE", "IMPROVE", "CONSOLIDATE"],
      content_lifecycle_status: [
        "DISCOVERED",
        "PLANNED",
        "DRAFTED",
        "IN_REVIEW",
        "PUBLISHED",
        "ARCHIVED",
      ],
    },
  },
} as const
