import { NextRequest, NextResponse } from 'next/server';

// Get API key from environment variables
const API_KEY = process.env.IMAGEROUTER_API_KEY;
const API_URL = 'https://api.imagerouter.io/v1/openai/images/generations';

// Validate API key on startup
if (!API_KEY) {
  console.error('❌ IMAGEROUTER_API_KEY environment variable is not set!');
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!API_KEY) {
      console.error('❌ API key not configured');
      return NextResponse.json(
        { success: false, error: 'API configuration error. Please check server setup.' },
        { status: 500 }
      );
    }

    const { prompt, model = 'stabilityai/sdxl-turbo:free' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Enhance the prompt for better bedtime story illustration results
    const enhancedPrompt = `${prompt}, children's book illustration style, soft pastel colors, dreamy atmosphere, magical and whimsical, bedtime story art, gentle lighting, cozy and warm feeling, high quality digital art, suitable for children`;

    console.log('Generating image with prompt:', enhancedPrompt);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        model: model,
        n: 1,
        size: '1024x1024',
      }),
    });

    if (!response.ok) {
      console.error('API Response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('Image generation response:', data);

    // Check if the response has the expected structure
    if (data && data.data && data.data.length > 0 && data.data[0].url) {
      return NextResponse.json({
        success: true,
        imageUrl: data.data[0].url,
        prompt: prompt,
      });
    } else {
      console.error('Unexpected API response structure:', data);
      return NextResponse.json(
        { success: false, error: 'Invalid response from image generation API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}