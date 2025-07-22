import BedtimeStoryGenerator from '@/components/BedtimeStoryGenerator';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <BedtimeStoryGenerator />
    </ErrorBoundary>
  );
}