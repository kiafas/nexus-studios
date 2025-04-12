import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing environment variable OPENAI_API_KEY');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ThumbnailParams {
  title: string;
  description: string;
  style: string;
}

export async function generateThumbnail({ title, description, style }: ThumbnailParams) {
  try {
    const prompt = `Create a YouTube thumbnail with the following details:
Title: ${title}
Description: ${description}
Style: ${style}
Make it visually appealing and optimized for YouTube's thumbnail dimensions.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      response_format: 'url',
    });

    return response.data[0]?.url || '';
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}