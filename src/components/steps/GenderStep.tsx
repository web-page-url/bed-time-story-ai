import React from 'react';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormData } from '@/types';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

interface GenderStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ formData, setFormData, onNext, onPrev }) => {
  const canProceed = formData.gender !== '';
  
  const genderOptions = [
    { value: 'boy', emoji: '👦', gradient: 'from-blue-400 to-cyan-500' },
    { value: 'girl', emoji: '👧', gradient: 'from-pink-400 to-rose-500' },
    { value: 'other', emoji: '🧒', gradient: 'from-purple-400 to-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-float">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 gradient-text">
            {t('genderTitle')}
          </h1>
          <p className="text-gray-600">{t('genderSubtitle')}</p>
        </div>

        <div className="space-y-4 mb-8">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFormData({...formData, gender: option.value})}
              className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-300 text-center font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-[1.02] ${
                formData.gender === option.value
                  ? `border-transparent bg-gradient-to-r ${option.gradient} text-white shadow-lg animate-pulse-glow`
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{option.emoji}</span>
              {t(option.value)}
            </button>
          ))}
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
          <ProgressBar current={2} total={5} />
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

export default GenderStep;