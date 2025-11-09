// Fix: Implement the StylePanel component.
import React, { useState } from 'react';
import { SparklesIcon } from './icons';

interface StylePanelProps {
  onGenerate: (style: string) => void;
  isLoading: boolean;
}

export const StylePanel: React.FC<StylePanelProps> = ({ onGenerate, isLoading }) => {
  const [style, setStyle] = useState('Casual e moderno, para um passeio na cidade');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (style.trim() && !isLoading) {
      onGenerate(style);
    }
  };

  return (
    <div className="bg-surface p-4 lg:p-6 flex flex-col h-full shadow-lg rounded-xl">
      <h2 className="text-xl font-bold font-serif text-text-primary mb-4">Defina o Estilo</h2>
      <p className="text-sm text-text-secondary mb-4">
        Descreva o estilo, a ocasião ou o ambiente que você quer para o seu look.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <textarea
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Ex: Elegante para um jantar, despojado para um festival, profissional para o trabalho..."
          className="w-full flex-grow p-3 rounded-lg bg-background border border-surface focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-text-primary"
          rows={5}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !style.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-background font-bold py-3 px-4 rounded-lg hover:bg-primary-light disabled:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gerando...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Gerar Look
            </>
          )}
        </button>
      </form>
    </div>
  );
};
