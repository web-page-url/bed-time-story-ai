'use client';

import React, { useState } from 'react';
import { FormData } from '@/types';
import { generateStory } from '@/lib/gemini';
import { t } from '@/lib/translations';

// Step Components
import AgeStep from './steps/AgeStep';
import GenderStep from './steps/GenderStep';
import InterestsStep from './steps/InterestsStep';
import StyleStep from './steps/StyleStep';
import LessonStep from './steps/LessonStep';
import LoadingStep from './steps/LoadingStep';
import StoryStep from './steps/StoryStep';

// UI Components
import DarkModeToggle from './ui/DarkModeToggle';
import MagicalSparkles from './ui/MagicalSparkles';

const BedtimeStoryGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyText, setStoryText] = useState('');
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    interests: [],
    style: '',
    lesson: ''
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [storyImage, setStoryImage] = useState<string>('');

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setCurrentStep(5); // Loading step

    try {
      // Generate the story first
      const story = await generateStory(formData);
      setStoryText(story);
      
      // Generate the story image
      try {
        const { generateStoryImage } = await import('@/lib/imageGeneration');
        const imageResult = await generateStoryImage(formData, story);
        
        if (imageResult.success && imageResult.imageUrl) {
          setStoryImage(imageResult.imageUrl);
        } else {
          console.warn('Image generation failed:', imageResult.error);
        }
      } catch (imageError) {
        console.warn('Image generation module failed to load:', imageError);
        // Continue without image - story is still valid
      }
      
      setCurrentStep(6); // Story display step
    } catch (error) {
      console.error('Error generating story:', error);
      alert(t('errorMessage'));
      setCurrentStep(4); // Go back to lesson step
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setStoryText('');
    setStoryImage('');
    setIsGenerating(false);
    setFormData({
      age: '',
      gender: '',
      interests: [],
      style: '',
      lesson: ''
    });
  };

  // Render current step with magical effects
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AgeStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
          />
        );
      
      case 1:
        return (
          <GenderStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 2:
        return (
          <InterestsStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 3:
        return (
          <StyleStep
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      
      case 4:
        return (
          <LessonStep
            formData={formData}
            setFormData={setFormData}
            onGenerate={handleGenerateStory}
            onPrev={prevStep}
            isGenerating={isGenerating}
          />
        );
      
      case 5:
        return <LoadingStep />;
      
      case 6:
        return (
          <StoryStep
            storyText={storyText}
            storyImage={storyImage}
            onReset={resetForm}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Magical Sparkles Background */}
      <MagicalSparkles />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Current Step Content */}
      {renderCurrentStep()}
    </>
  );
};

export default BedtimeStoryGenerator;