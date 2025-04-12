import { google } from 'googleapis';

if (!process.env.YOUTUBE_API_KEY) {
  throw new Error('Missing environment variable YOUTUBE_API_KEY');
}

export const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoStats(videoId: string) {
  try {
    const response = await youtube.videos.list({
      part: ['statistics', 'snippet'],
      id: [videoId],
    });

    return response.data.items?.[0] || null;
  } catch (error) {
    console.error('Error fetching video stats:', error);
    throw error;
  }
}

export async function getChannelStats(channelId: string) {
  try {
    const response = await youtube.channels.list({
      part: ['statistics', 'snippet'],
      id: [channelId],
    });

    return response.data.items?.[0] || null;
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    throw error;
  }
}