export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ContentStatus = 'draft' | 'published' | 'archived';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          youtube_channel_id: string | null;
          preferences: Json;
          subscription_tier: SubscriptionTier;
          subscription_start_date: string | null;
          subscription_end_date: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          youtube_channel_id?: string | null;
          preferences?: Json;
          subscription_tier?: SubscriptionTier;
          subscription_start_date?: string | null;
          subscription_end_date?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          youtube_channel_id?: string | null;
          preferences?: Json;
          subscription_tier?: SubscriptionTier;
          subscription_start_date?: string | null;
          subscription_end_date?: string | null;
        };
      };
      content_ideas: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          title: string;
          description: string | null;
          tags: string[];
          status: ContentStatus;
          ai_generated: boolean;
          metadata: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          title: string;
          description?: string | null;
          tags?: string[];
          status?: ContentStatus;
          ai_generated?: boolean;
          metadata?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          tags?: string[];
          status?: ContentStatus;
          ai_generated?: boolean;
          metadata?: Json;
        };
      };
      thumbnails: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          content_idea_id: string;
          title: string | null;
          image_url: string;
          template_data: Json | null;
          ai_generated: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          content_idea_id: string;
          title?: string | null;
          image_url: string;
          template_data?: Json | null;
          ai_generated?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          content_idea_id?: string;
          title?: string | null;
          image_url?: string;
          template_data?: Json | null;
          ai_generated?: boolean;
        };
      };
      analytics: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          content_idea_id: string;
          thumbnail_id: string;
          views: number;
          likes: number;
          comments: number;
          engagement_rate: number | null;
          metadata: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          content_idea_id: string;
          thumbnail_id: string;
          views?: number;
          likes?: number;
          comments?: number;
          engagement_rate?: number | null;
          metadata?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          content_idea_id?: string;
          thumbnail_id?: string;
          views?: number;
          likes?: number;
          comments?: number;
          engagement_rate?: number | null;
          metadata?: Json;
        };
      };
    };
  };
};