import React, { useState, useEffect } from 'react';
import { Book, Star, Heart, Sparkles, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { t } from '@/lib/translations';
import { SpeechManager } from '@/lib/speech';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface StoryStepProps {
  storyText: string;
  onReset: () => void;
}

const StoryStep: React.FC<StoryStepProps> = ({ storyText, onReset }) => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechManager, setSpeechManager] = useState<SpeechManager | null>(null);

  useEffect(() => {
    const manager = new SpeechManager(
      () => setIsReading(true),
      () => {
        setIsReading(false);
        setIsPaused(false);
      },
      () => {
        setIsReading(false);
        setIsPaused(false);
        alert('Speech synthesis is not supported in your browser.');
      },
      () => setIsPaused(true),
      () => setIsPaused(false)
    );
    
    setSpeechManager(manager);
    
    return () => {
      manager.stop();
    };
  }, []);

  const handleStartReading = () => {
    if (speechManager) {
      speechManager.speak(storyText);
    }
  };

  const handlePauseReading = () => {
    if (speechManager) {
      speechManager.pause();
    }
  };

  const handleResumeReading = () => {
    if (speechManager) {
      speechManager.resume();
    }
  };

  const handleStopReading = () => {
    if (speechManager) {
      speechManager.stop();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden" padding="none">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Book className="w-8 h-8" />
                <h1 className="text-3xl font-bold">
                  {t('storyReadyTitle')}
                </h1>
              </div>
              <p className="text-indigo-100">{t('storyReadySubtitle')}</p>
            </div>
          </div>
          
          {/* Story Content */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <Card 
                className="border-l-4 border-amber-400" 
                background="gradient"
                padding="lg"
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg font-serif">
                    {storyText || "Once upon a time, there was a wonderful story waiting to be told..."}
                  </p>
                </div>
              </Card>
            </div>
            
            {/* Voice Controls */}
            <Card className="mb-6" background="gray" padding="lg">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Volume2 className="w-5 h-5" />
                  <span>Listen to your story:</span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {!isReading && !isPaused ? (
                    <Button
                      onClick={handleStartReading}
                      variant="success"
                      size="md"
                      icon={Play}
                    >
                      {t('readStoryAloud')}
                    </Button>
                  ) : (
                    <>
                      {isPaused ? (
                        <Button
                          onClick={handleResumeReading}
                          variant="primary"
                          size="md"
                          icon={Play}
                        >
                          {t('resume')}
                        </Button>
                      ) : (
                        <Button
                          onClick={handlePauseReading}
                          variant="warning"
                          size="md"
                          icon={Pause}
                        >
                          {t('pause')}
                        </Button>
                      )}
                      
                      <Button
                        onClick={handleStopReading}
                        variant="error"
                        size="md"
                        icon={VolumeX}
                      >
                        {t('stop')}
                      </Button>
                    </>
                  )}
                </div>
                
                {isReading && !isPaused && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                    <span className="text-sm font-medium">{t('reading')}</span>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Actions */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 text-indigo-500">
                <Star className="w-5 h-5" />
                <span className="text-lg font-medium">{t('sweetDreams')}</span>
                <Star className="w-5 h-5" />
              </div>
              
              <Button
                onClick={onReset}
                variant="primary"
                size="xl"
                fullWidth
                icon={Sparkles}
                className="max-w-md mx-auto"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  {t('createAnotherStory')}
                  <Heart className="w-6 h-6" />
                </span>
              </Button>
            </div>
            
            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                ✨ {t('createdBy')} <span className="font-semibold text-indigo-600">Anubhav</span> ✨
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StoryStep;