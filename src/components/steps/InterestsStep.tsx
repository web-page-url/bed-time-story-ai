import React from 'react';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormData } from '@/types';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

interface InterestsStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
  onPrev: () => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ formData, setFormData, onNext, onPrev }) => {
  const canProceed = formData.interests.length > 0;
  
  const interests = [
    { key: 'animals', emoji: '🐾' },
    { key: 'spaceStars', emoji: '🌟' },
    { key: 'oceanSeaLife', emoji: '🌊' },
    { key: 'dinosaurs', emoji: '🦕' },
    { key: 'magicFantasy', emoji: '✨' },
    { key: 'sports', emoji: '⚽' },
    { key: 'music', emoji: '🎵' },
    { key: 'artDrawing', emoji: '🎨' },
    { key: 'natureForest', emoji: '🌲' },
    { key: 'superheroes', emoji: '🦸' },
    { key: 'vehiclesTransportation', emoji: '🚗' },
    { key: 'cookingFood', emoji: '🍳' },
    { key: 'scienceExperiments', emoji: '🔬' },
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : prev.interests.length < 3 
          ? [...prev.interests, interest]
          : prev.interests
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-float">
              <Star className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 gradient-text">
            {t('interestsTitle')}
          </h1>
          <p className="text-gray-600">{t('interestsSubtitle')}</p>
          <div className="mt-2 text-sm text-indigo-600 font-medium">
            Selected: {formData.interests.length}/3
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {interests.map((interest) => {
            const isSelected = formData.interests.includes(t(interest.key));
            const isDisabled = !isSelected && formData.interests.length >= 3;
            
            return (
              <button
                key={interest.key}
                onClick={() => handleInterestToggle(t(interest.key))}
                disabled={isDisabled}
                className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 text-center font-medium text-sm flex flex-col items-center gap-2 transform hover:scale-[1.02] ${
                  isSelected
                    ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 shadow-md'
                    : isDisabled
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{interest.emoji}</span>
                <span className="leading-tight">{t(interest.key)}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onPrev}
            variant="outline"
            size="lg"
            icon={ArrowLeft}
            className="flex-1"
          >
            {t('backButton')}
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            className="flex-2"
          >
            {t('continueButton')}
          </Button>
        </div>

        <div className="mt-8">
          <ProgressBar current={3} total={5} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            ✨ Created with ❤️ by <span className="font-semibold text-indigo-600">Anubhav</span> ✨
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InterestsStep;