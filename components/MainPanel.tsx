// components/MainPanel.tsx
import React from 'react';
import { GeneratedLook } from '../types';
import { ResultsCarousel } from './ResultsCarousel';
import { SparklesIcon, UserIcon } from './icons';

// Componente para o estado inicial
const InitialState = () => (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <div className="flex items-center justify-center -space-x-4 mb-6">
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center ring-4 ring-surface">
                <UserIcon className="w-12 h-12 text-text-secondary" />
            </div>
             <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center ring-4 ring-surface">
                <SparklesIcon className="w-12 h-12 text-primary" />
            </div>
        </div>
        <h2 className="text-3xl font-bold font-serif text-text-primary">Seu provador virtual</h2>
        <p className="text-text-secondary mt-2 max-w-md">
            Selecione suas peças, defina um estilo e clique em "Gerar Look" para ver a mágica acontecer.
        </p>
    </div>
);

// Componente para o estado de carregamento
const LoadingState = () => (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-bold font-serif text-text-primary">Gerando seus looks...</h2>
        <p className="text-text-secondary mt-2">A IA está escolhendo as melhores combinações!</p>
    </div>
);

// Componente para o estado de erro
const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex-grow flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold font-serif text-red-400">Ocorreu um Erro</h2>
        <p className="text-text-secondary mt-2 max-w-md">{error}</p>
    </div>
);

interface MainPanelProps {
  generatedLooks: GeneratedLook[] | null;
  isLoading: boolean;
  error: string | null;
}

export const MainPanel: React.FC<MainPanelProps> = ({ generatedLooks, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }
    if (error) {
      return <ErrorState error={error} />;
    }
    if (generatedLooks) {
      return <ResultsCarousel looks={generatedLooks} />;
    }
    return <InitialState />;
  };

  return (
    <div className="h-full bg-surface rounded-xl shadow-lg flex flex-col overflow-hidden">
      {renderContent()}
    </div>
  );
};
