import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bedtime Story AI - Magical Stories for Sweet Dreams',
    short_name: 'Bedtime Story AI',
    description: 'Create personalized, AI-powered bedtime stories for children. Choose age, interests, and themes to generate unique tales that spark imagination and teach valuable lessons.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    orientation: 'portrait',
    categories: ['entertainment', 'education', 'kids'],
    lang: 'en',
    icons: [
      {
        src: '/bed-time-story-1.0.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'maskable'
      },
      {
        src: '/bed-time-story-1.0.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/bed-time-story-1.0.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
        form_factor: 'wide'
      }
    ]
  }
}