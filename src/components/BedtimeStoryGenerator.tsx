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

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    setCurrentStep(5); // Loading step

    try {
      const story = await generateStory(formData);
      setStoryText(story);
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
    setIsGenerating(false);
    setFormData({
      age: '',
      gender: '',
      interests: [],
      style: '',
      lesson: ''
    });
  };

  // Render current step
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
          onReset={resetForm}
        />
      );
    
    default:
      return null;
  }
};

export default BedtimeStoryGenerator;