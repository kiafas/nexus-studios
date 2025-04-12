export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          avatar_url: string
          youtube_channel_id: string | null
          preferences: Json
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name: string
          avatar_url?: string
          youtube_channel_id?: string | null
          preferences?: Json
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string
          avatar_url?: string
          youtube_channel_id?: string | null
          preferences?: Json
        }
      }
      content_ideas: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string
          tags: string[]
          status: 'draft' | 'published' | 'archived'
          ai_generated: boolean
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description: string
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          ai_generated?: boolean
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          ai_generated?: boolean
          metadata?: Json
        }
      }
      thumbnails: {
        Row: {
          id: string
          created_at: string
          user_id: string
          content_idea_id: string
          image_url: string
          title: string
          template_id: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          content_idea_id: string
          image_url: string
          title: string
          template_id?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          content_idea_id?: string
          image_url?: string
          title?: string
          template_id?: string | null
          metadata?: Json
        }
      }
      analytics: {
        Row: {
          id: string
          created_at: string
          user_id: string
          content_idea_id: string
          video_id: string
          views: number
          likes: number
          comments: number
          watch_time: number
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          content_idea_id: string
          video_id: string
          views?: number
          likes?: number
          comments?: number
          watch_time?: number
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          content_idea_id?: string
          video_id?: string
          views?: number
          likes?: number
          comments?: number
          watch_time?: number
          metadata?: Json
        }
      }
    }
  }
}