import React from 'react';
import { Book, ArrowRight, ArrowLeft } from 'lucide-react';
import { FormData, StoryStyle } from '@/types';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

interface StyleStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StyleStep: React.FC<StyleStepProps> = ({ formData, setFormData, onNext, onPrev }) => {
  const canProceed = formData.style !== '';
  
  const styles: StoryStyle[] = [
    { 
      value: 'funny', 
      label: t('funnyLabel'), 
      emoji: '😄', 
      desc: t('funnyDesc'),
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      value: 'adventurous', 
      label: t('adventurousLabel'), 
      emoji: '🌟', 
      desc: t('adventurousDesc'),
      gradient: 'from-blue-400 to-indigo-600'
    },
    { 
      value: 'gentle', 
      label: t('gentleLabel'), 
      emoji: '🌙', 
      desc: t('gentleDesc'),
      gradient: 'from-purple-400 to-pink-500'
    },
    { 
      value: 'magical', 
      label: t('magicalLabel'), 
      emoji: '✨', 
      desc: t('magicalDesc'),
      gradient: 'from-indigo-400 to-purple-600'
    },
    { 
      value: 'educational', 
      label: t('educationalLabel'), 
      emoji: '📚', 
      desc: t('educationalDesc'),
      gradient: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-float">
              <Book className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 gradient-text">
            {t('styleTitle')}
          </h1>
          <p className="text-gray-600">{t('styleSubtitle')}</p>
        </div>

        <div className="space-y-3 mb-8">
          {styles.map((style) => (
            <button
              key={style.value}
              onClick={() => setFormData({...formData, style: style.value})}
              className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-300 text-left font-medium flex items-center gap-4 transform hover:scale-[1.02] ${
                formData.style === style.value
                  ? `border-transparent bg-gradient-to-r ${style.gradient} text-white shadow-lg animate-pulse-glow`
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-3xl flex-shrink-0">{style.emoji}</span>
              <div className="flex-1">
                <div className="font-bold text-lg">{style.label}</div>
                <div className={`text-sm mt-1 ${
                  formData.style === style.value ? 'text-white/90' : 'text-gray-500'
                }`}>
                  {style.desc}
                </div>
              </div>
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
          <ProgressBar current={4} total={5} />
        </div>
      </Card>
    </div>
  );
};

export default StyleStep;