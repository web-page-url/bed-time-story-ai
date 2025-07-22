import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FormData } from '@/types';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ProgressBar from '@/components/ui/ProgressBar';

interface AgeStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

const AgeStep: React.FC<AgeStepProps> = ({ formData, setFormData, onNext }) => {
  const canProceed = formData.age !== '' && parseInt(formData.age) >= 2 && parseInt(formData.age) <= 12;
  const [showError, setShowError] = React.useState(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty string for clearing
    if (value === '') {
      setFormData({ ...formData, age: '' });
      setShowError(false);
      return;
    }

    // Only allow numeric input (prevent non-numeric characters)
    if (!/^\d+$/.test(value)) {
      return;
    }

    // Allow intermediate states while typing (like "1" when typing "11")
    // But validate the final number for the continue button
    const numValue = parseInt(value);

    // Allow input but show error if final number is out of range
    setFormData({ ...formData, age: value });

    // Show error only if the number is complete and out of range
    if (value.length >= 2 && (numValue < 2 || numValue > 15)) {
      setShowError(true);
      setTimeout(() => setShowError(false), 9000);
    } else if (numValue >= 2 && numValue <= 15) {
      setShowError(false);
    } else {
      setShowError(false); // Don't show error for intermediate states like "1"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-float">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 gradient-text">
            {t('ageTitle')}
          </h1>
          <p className="text-gray-600">{t('ageSubtitle')}</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Input
              type="number"
              value={formData.age}
              onChange={handleAgeChange}
              placeholder={t('agePlaceholder')}
              min="2"
              max="12"
              className={`text-center font-bold text-2xl ${showError ? 'border-red-500 dark:border-red-400' : ''}`}
              autoFocus
              size="xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10 pointer-events-none"></div>

            {/* Error Message */}
            {showError && (
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-red-500 text-sm font-medium animate-bounce">
                  Please enter age between 2-15 years
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            variant="primary"
            size="lg"
            fullWidth
            icon={ArrowRight}
            iconPosition="right"
          >
            {t('continueButton')}
          </Button>
        </div>

        <div className="mt-8">
          <ProgressBar current={1} total={5} />
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

export default AgeStep;