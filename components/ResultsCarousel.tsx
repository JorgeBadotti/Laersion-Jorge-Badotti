import React, { useState } from 'react';
import { GeneratedLook } from '../types';
import { SparklesIcon } from './icons';

interface ResultsCarouselProps {
  looks: GeneratedLook[];
}

export const ResultsCarousel: React.FC<ResultsCarouselProps> = ({ looks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!looks || looks.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? looks.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === looks.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentLook = looks[currentIndex];

  return (
    <div className="w-full h-full">
        <div className="relative w-full h-full bg-surface overflow-hidden">
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                <button onClick={goToPrevious} className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                 <button onClick={goToNext} className="bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <div className="w-full h-full animate-fade-in">
                {currentLook.imageUrl ? (
                    <img src={currentLook.imageUrl} alt={currentLook.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-background flex items-center justify-center p-8">
                        <div className="text-center">
                            <SparklesIcon className="w-16 h-16 mx-auto text-surface mb-4" />
                            <h3 className="text-xl font-semibold text-text-primary">Sugestão de Look</h3>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-2xl font-bold font-serif">{currentLook.name}</h3>
                <p className="text-sm opacity-90 mt-1">{currentLook.description}</p>
                 <div className="text-center mt-4 text-sm font-mono tracking-widest">
                    {currentIndex + 1} / {looks.length}
                </div>
            </div>
        </div>
    </div>
  );
};
