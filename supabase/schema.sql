-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  youtube_channel_id TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE
);

-- Content ideas table
CREATE TABLE content_ideas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  status content_status DEFAULT 'draft',
  ai_generated BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Thumbnails table
CREATE TABLE thumbnails (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_idea_id UUID REFERENCES content_ideas(id) ON DELETE CASCADE,
  title TEXT,
  image_url TEXT NOT NULL,
  template_data JSONB,
  ai_generated BOOLEAN DEFAULT false
);

-- Analytics table
CREATE TABLE analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_idea_id UUID REFERENCES content_ideas(id) ON DELETE CASCADE,
  thumbnail_id UUID REFERENCES thumbnails(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  engagement_rate DECIMAL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE thumbnails ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Content ideas policies
CREATE POLICY "Users can view their own content ideas" ON content_ideas
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create content ideas" ON content_ideas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own content ideas" ON content_ideas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content ideas" ON content_ideas
  FOR DELETE USING (auth.uid() = user_id);

-- Thumbnails policies
CREATE POLICY "Users can view their own thumbnails" ON thumbnails
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create thumbnails" ON thumbnails
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own thumbnails" ON thumbnails
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own thumbnails" ON thumbnails
  FOR DELETE USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view their own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create analytics" ON analytics
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "System can update analytics" ON analytics
  FOR UPDATE USING (auth.role() = 'service_role');