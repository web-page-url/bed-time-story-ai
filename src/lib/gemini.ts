import { FormData } from '@/types';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export const generateStory = async (formData: FormData): Promise<string> => {
  // Check if API key is available
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please check your environment variables.');
  }

  const prompt = `Create a beautiful bedtime story for a ${formData.age}-year-old ${formData.gender} who loves ${formData.interests.join(', ')}. 

The story should be:
- Written in a ${formData.style} style
- Teach the lesson: ${formData.lesson}
- Appropriate for bedtime (calming ending)
- The Language Should be easy to Understand
- Engaging but not overstimulating
- Around 400-600 words long
- Include a gentle moral lesson naturally woven into the narrative
- Use age-appropriate vocabulary
- Have a soothing, peaceful conclusion perfect for bedtime

Please write only the story content, no title or additional formatting. Make it magical and memorable!`;

  try {
    console.log('Making request to Gemini API...');

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    console.log('API Response:', data);

    // Check for API errors in response
    if (data.error) {
      throw new Error(`Gemini API Error: ${data.error.message}`);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No story generated - empty candidates array');
    }

    const candidate = data.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('No story content in response');
    }

    const story = candidate.content.parts[0].text;
    if (!story || story.trim().length === 0) {
      throw new Error('Empty story generated');
    }

    return story.trim();
  } catch (error) {
    console.error('Error generating story:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to generate story. Please try again.');
  }
};