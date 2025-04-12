'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/ui/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { generateContentIdea } from '@/lib/openai';

const formSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  contentType: z.string().min(1, 'Content type is required'),
});

export default function IdeasPage() {
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      targetAudience: '',
      contentType: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const prompt = `Generate a YouTube video idea about ${values.topic} for ${values.targetAudience}. The content type should be ${values.contentType}. Include a catchy title and brief description.`;
      const idea = await generateContentIdea(prompt);
      setGeneratedIdea(idea);
    } catch (error) {
      console.error('Error generating idea:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Content Ideas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Idea</CardTitle>
            <CardDescription>Fill in the details to generate a content idea</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Technology trends, Gaming tips" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tech enthusiasts, Gamers" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tutorial, Review, Vlog" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Icons.content className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.content className="mr-2 h-4 w-4" />
                  )}
                  Generate Idea
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Idea</CardTitle>
            <CardDescription>Your AI-generated content idea will appear here</CardDescription>
          </CardHeader>
          <CardContent>
            {generatedIdea ? (
              <div className="whitespace-pre-wrap">{generatedIdea}</div>
            ) : (
              <p className="text-sm text-muted-foreground">Fill out the form to generate a new idea</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}