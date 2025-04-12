import { supabase } from './config';
import { Database } from './types';

type Tables = Database['public']['Tables'];

// User Management
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as Tables['users']['Row'];
}

// Content Ideas Management
export async function getContentIdeas(userId: string) {
  const { data, error } = await supabase
    .from('content_ideas')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Tables['content_ideas']['Row'][];
}

export async function createContentIdea(idea: Tables['content_ideas']['Insert']) {
  const { data, error } = await supabase
    .from('content_ideas')
    .insert(idea)
    .select()
    .single();

  if (error) throw error;
  return data as Tables['content_ideas']['Row'];
}

// Thumbnails Management
export async function getThumbnails(contentIdeaId: string) {
  const { data, error } = await supabase
    .from('thumbnails')
    .select('*')
    .eq('content_idea_id', contentIdeaId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Tables['thumbnails']['Row'][];
}

export async function createThumbnail(thumbnail: Tables['thumbnails']['Insert']) {
  const { data, error } = await supabase
    .from('thumbnails')
    .insert(thumbnail)
    .select()
    .single();

  if (error) throw error;
  return data as Tables['thumbnails']['Row'];
}

// Analytics Management
export async function getAnalytics(userId: string, period: 'day' | 'week' | 'month' = 'week') {
  const { data, error } = await supabase
    .from('analytics')
    .select(`
      *,
      content_ideas (title),
      thumbnails (title)
    `)
    .eq('user_id', userId)
    .gte('created_at', getPeriodStart(period))
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as (Tables['analytics']['Row'] & {
    content_ideas: { title: string };
    thumbnails: { title: string | null };
  })[];
}

// Utility Functions
function getPeriodStart(period: 'day' | 'week' | 'month'): string {
  const date = new Date();
  switch (period) {
    case 'day':
      date.setDate(date.getDate() - 1);
      break;
    case 'week':
      date.setDate(date.getDate() - 7);
      break;
    case 'month':
      date.setMonth(date.getMonth() - 1);
      break;
  }
  return date.toISOString();
}