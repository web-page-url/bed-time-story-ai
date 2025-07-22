import { FormData } from '@/types';

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const generateStoryImage = async (formData: FormData, storyText: string): Promise<ImageGenerationResponse> => {
  try {
    // Create a descriptive prompt based on the story and form data
    const imagePrompt = createImagePrompt(formData, storyText);
    
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        model: 'stabilityai/sdxl-turbo:free'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating story image:', error);
    return {
      success: false,
      error: 'Failed to generate story image'
    };
  }
};

const createImagePrompt = (formData: FormData, storyText: string): string => {
  // Extract key elements from the story for the image
  const age = formData.age;
  const gender = formData.gender;
  const interests = formData.interests.join(', ');
  const style = formData.style;
  
  // Create a focused prompt based on the story content and preferences
  let basePrompt = '';
  
  // Determine main character description
  const characterDesc = gender === 'boy' ? 'young boy' : gender === 'girl' ? 'young girl' : 'young child';
  
  // Extract main theme from interests
  let mainTheme = '';
  if (interests.includes('animals') || interests.includes('Animals')) {
    mainTheme = 'with cute animals';
  } else if (interests.includes('space') || interests.includes('Space')) {
    mainTheme = 'in a magical space setting with stars and planets';
  } else if (interests.includes('ocean') || interests.includes('Ocean')) {
    mainTheme = 'in an underwater adventure with sea creatures';
  } else if (interests.includes('magic') || interests.includes('Magic')) {
    mainTheme = 'in a magical fantasy world with sparkles and wonder';
  } else if (interests.includes('dinosaurs') || interests.includes('Dinosaurs')) {
    mainTheme = 'with friendly dinosaurs in a prehistoric setting';
  } else {
    mainTheme = `enjoying ${interests.toLowerCase()}`;
  }
  
  // Adjust style for image generation
  let visualStyle = '';
  switch (style) {
    case 'gentle':
      visualStyle = 'soft, peaceful, calming colors, serene atmosphere';
      break;
    case 'magical':
      visualStyle = 'magical, sparkly, enchanted, glowing effects';
      break;
    case 'adventurous':
      visualStyle = 'exciting, dynamic, vibrant colors, adventure scene';
      break;
    case 'funny':
      visualStyle = 'cheerful, bright colors, playful, joyful';
      break;
    case 'educational':
      visualStyle = 'clear, detailed, informative, bright and engaging';
      break;
    default:
      visualStyle = 'warm, inviting, child-friendly';
  }
  
  basePrompt = `A ${characterDesc} around ${age} years old ${mainTheme}, ${visualStyle}, children's storybook illustration, bedtime story art`;
  
  return basePrompt;
};