export type ContentActionType = 'CREATE' | 'IMPROVE' | 'CONSOLIDATE';
export type ContentLifecycleStatus = 'DISCOVERED' | 'PLANNED' | 'DRAFTED' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export interface KeywordMetric {
  id?: string;
  query: string;
  page_url: string;
  impressions: number;
  clicks: number;
  ctr: number;
  average_position: number;
  ads_monthly_volume?: number;
  country?: string;
  device?: string;
  recorded_date?: string;
}

export interface PagePerformance {
  id?: string;
  page_path: string;
  page_views: number;
  active_users: number;
  engagement_rate: number;
  avg_engagement_time_sec: number;
  bounce_rate: number;
  conversions: number;
  recorded_date?: string;
}

export interface ContentQueueItem {
  id?: string;
  target_topic: string;
  target_slug?: string;
  action_type: ContentActionType;
  status: ContentLifecycleStatus;
  priority_score: number;
  primary_keywords: string[];
  secondary_keywords?: string[];
  existing_page_url?: string;
  brief_data?: Record<string, unknown>;
  draft_content_markdown?: string;
  published_post_id?: string;
  published_url?: string;
  seo_meta?: {
    title: string;
    description: string;
    canonical?: string;
    schemaType?: string;
  };
  review_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceLead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  target_service: string;
  requirement: string;
  source_url?: string;
  referring_query?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  lead_status?: string;
  created_at?: string;
}
