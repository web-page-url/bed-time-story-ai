import React from 'react';
import { Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { FormData } from '@/types';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import ProgressBar from '@/components/ui/ProgressBar';

interface LessonStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onGenerate: () => void;
  onPrev: () => void;
  isGenerating: boolean;
}

const LessonStep: React.FC<LessonStepProps> = ({ 
  formData, 
  setFormData, 
  onGenerate, 
  onPrev, 
  isGenerating 
}) => {
  const canProceed = formData.lesson.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full animate-float">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 gradient-text">
            {t('lessonTitle')}
          </h1>
          <p className="text-gray-600">{t('lessonSubtitle')}</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Textarea
              value={formData.lesson}
              onChange={(e) => setFormData({...formData, lesson: e.target.value})}
              placeholder={t('lessonPlaceholder')}
              rows={5}
              autoFocus
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-600/10 pointer-events-none"></div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onPrev}
              variant="outline"
              size="lg"
              icon={ArrowLeft}
              className="flex-1"
              disabled={isGenerating}
            >
              {t('backButton')}
            </Button>
            <Button
              onClick={onGenerate}
              disabled={!canProceed}
              variant="success"
              size="lg"
              icon={Sparkles}
              iconPosition="right"
              className="flex-2"
              loading={isGenerating}
            >
              {t('createStoryButton')}
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar current={5} total={5} />
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

export default LessonStep;