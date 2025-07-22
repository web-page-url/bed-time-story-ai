'use client';

import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  left: number;
  animationDelay: number;
  size: number;
}

const MagicalSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create sparkles with fixed seed for consistency
    const createSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 12; i++) {
        // Use deterministic values to prevent hydration mismatch
        const seed = i * 0.618033988749; // Golden ratio for better distribution
        newSparkles.push({
          id: i,
          left: (seed * 100) % 100,
          animationDelay: (seed * 8) % 8,
          size: 12 + ((seed * 8) % 8),
        });
      }
      setSparkles(newSparkles);
    };

    createSparkles();
  }, []);

  const sparkleSymbols = ['✨', '⭐', '🌟', '💫', '⚡', '🔮', '🌙', '☄️'];

  // Don't render sparkles until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="sparkle-container">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle animate-float-sparkle"
          style={{
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.animationDelay}s`,
            fontSize: `${sparkle.size}px`,
          }}
        >
          {sparkleSymbols[sparkle.id % sparkleSymbols.length]}
        </div>
      ))}
    </div>
  );
};

export default MagicalSparkles;