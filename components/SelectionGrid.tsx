import React from 'react';
import { CarouselItem } from '../types';

interface SelectionGridProps {
  title: string;
  options: CarouselItem[];
  selectedValue: string | null;
  onSelect: (id: string) => void;
}

export const SelectionGrid: React.FC<SelectionGridProps> = ({ title, options, selectedValue, onSelect }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-3">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 group ${
              selectedValue === option.id ? 'border-primary shadow-lg' : 'border-transparent hover:border-gray-600'
            }`}
          >
            {option.imageUrl && <img src={option.imageUrl} alt={option.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-2">
              <p className="text-white text-xs font-bold text-center drop-shadow-md">{option.label}</p>
            </div>
            {selectedValue === option.id && (
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center animate-fade-in">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
