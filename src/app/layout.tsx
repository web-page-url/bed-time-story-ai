import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bedtime Story AI - Magical Stories for Sweet Dreams",
  description: "Create personalized, AI-powered bedtime stories for children. Choose age, interests, and themes to generate unique tales that spark imagination and teach valuable lessons.",
  keywords: "bedtime stories, AI stories, children stories, personalized tales, kids entertainment, bedtime, children, parenting, storytelling, AI generated stories",
  authors: [{ name: "Anubhav" }],
  creator: "Anubhav",
  publisher: "Anubhav",
  metadataBase: new URL('https://bed-time-story-ai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bedtime Story AI - Magical Stories for Sweet Dreams",
    description: "Create personalized, AI-powered bedtime stories for children. Choose age, interests, and themes to generate unique tales that spark imagination and teach valuable lessons.",
    url: 'https://bed-time-story-ai.vercel.app',
    siteName: 'Bedtime Story AI',
    images: [
      {
        url: '/bed-time-story-1.0.jpg',
        width: 1200,
        height: 630,
        alt: 'Bedtime Story AI - Create magical personalized bedtime stories for children',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bedtime Story AI - Magical Stories for Sweet Dreams",
    description: "Create personalized, AI-powered bedtime stories for children. Choose age, interests, and themes to generate unique tales that spark imagination and teach valuable lessons.",
    images: ['/bed-time-story-1.0.jpg'],
    creator: '@anubhav',
    site: '@bedtimestoryai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bedtime Story AI',
    description: 'Create personalized, AI-powered bedtime stories for children. Choose age, interests, and themes to generate unique tales that spark imagination and teach valuable lessons.',
    url: 'https://bed-time-story-ai.vercel.app',
    applicationCategory: 'Entertainment',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Person',
      name: 'Anubhav',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    image: 'https://bed-time-story-ai.vercel.app/bed-time-story-1.0.jpg',
    screenshot: 'https://bed-time-story-ai.vercel.app/bed-time-story-1.0.jpg',
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Additional Social Media Meta Tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />

        {/* Facebook specific */}
        <meta property="fb:app_id" content="your-facebook-app-id" />

        {/* WhatsApp specific */}
        <meta property="og:image:alt" content="Bedtime Story AI - Create magical personalized bedtime stories for children" />

        {/* LinkedIn specific */}
        <meta name="linkedin:owner" content="anubhav" />

        {/* Additional Twitter tags */}
        <meta name="twitter:image:alt" content="Bedtime Story AI - Create magical personalized bedtime stories for children" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/bed-time-story-1.0.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}