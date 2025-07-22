import React from 'react';
import { Moon, Sparkles, Book, Star } from 'lucide-react';
import { t } from '@/lib/translations';
import Card from '@/components/ui/Card';

const LoadingStep: React.FC = () => {
  const loadingMessages = [
    "Sprinkling magic dust...",
    "Gathering story elements...",
    "Weaving words together...",
    "Adding a touch of wonder...",
    "Almost ready for bedtime..."
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="text-center max-w-md w-full" padding="xl">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full opacity-20 animate-ping"></div>
          </div>
          <div className="relative">
            <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-float mx-auto w-fit">
              <Moon className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce delay-300">
              <Star className="w-6 h-6 text-pink-400" />
            </div>
            <div className="absolute top-1/2 -right-4 animate-bounce delay-500">
              <Book className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">
          {t('generatingTitle')}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {t('generatingSubtitle')}
        </p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6">
          <p className="text-indigo-700 font-medium animate-pulse">
            {loadingMessages[currentMessage]}
          </p>
        </div>

        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            ✨ Created with ❤️ by <span className="font-semibold text-indigo-600">Anubhav</span> ✨
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoadingStep;