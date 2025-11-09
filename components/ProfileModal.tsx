// Fix: Implement the ProfileModal component.
import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { ImageUploader } from './ImageUploader';
import { SelectionGrid } from './SelectionGrid';
import { UserProfile, Measurements } from '../types';
import { PERSONAL_STYLE_OPTIONS, BODY_TYPE_OPTIONS } from '../constants';
import { analyzeImageForStyleProfile } from '../services/geminiService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

const MeasurementInput: React.FC<{label: string, value: string | number, onChange: (value: string) => void, disabled: boolean}> = ({ label, value, onChange, disabled }) => (
    <div>
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
        <div className="relative mt-1">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full p-2 border border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-background text-text-primary pr-12 disabled:opacity-50"
                disabled={disabled}
                placeholder="0"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                cm
            </span>
        </div>
    </div>
)

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, currentProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(currentProfile);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    setProfile(currentProfile);
  }, [currentProfile, isOpen]);

  const handleSave = () => {
    onSave(profile);
  };

  const handleImageUpload = async (base64Image: string) => {
    setProfile(p => ({ ...p, baseImage: base64Image }));
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
        const analysisResult = await analyzeImageForStyleProfile(base64Image);
        setProfile(p => ({
            ...p,
            bodyType: analysisResult.bodyType || p.bodyType,
            measurements: analysisResult.measurements || p.measurements,
        }));
    } catch(e: any) {
        setAnalysisError(e.message || "Erro desconhecido na análise.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const handlePersonalStyleSelect = (id: string) => {
    setProfile(p => ({ ...p, personalStyle: id }));
  };

  const handleBodyTypeSelect = (id: string) => {
    setProfile(p => ({ ...p, bodyType: id }));
  };

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    setProfile(p => ({
        ...p,
        measurements: {
            ...(p.measurements || { bust: '', waist: '', hips: '', armLength: '', legLength: '', height: '' }),
            [field]: value,
        }
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        {/* Header */}
        <div className="p-4 border-b border-background">
            <h2 className="text-2xl font-bold font-serif text-center text-text-primary">Seu Perfil de Estilo</h2>
            <p className="text-center text-text-secondary mt-2">
                Nos ajude a entender seu estilo para criar looks incríveis para você.
            </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-4">
            <div className="space-y-8">
                <ImageUploader 
                    onImageUpload={handleImageUpload} 
                    currentImage={profile.baseImage}
                    isAnalyzing={isAnalyzing} 
                />
                
                {analysisError && (
                    <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-md text-sm">
                        <strong>Erro na análise:</strong> {analysisError}
                    </div>
                )}
                
                <div className="space-y-6">
                    <SelectionGrid
                        title="Qual seu estilo pessoal?"
                        options={PERSONAL_STYLE_OPTIONS}
                        selectedValue={profile.personalStyle}
                        onSelect={handlePersonalStyleSelect}
                    />
                    <div className="relative">
                         {isAnalyzing && (
                            <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                                 <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                        <SelectionGrid
                            title="Qual seu tipo de corpo?"
                            options={BODY_TYPE_OPTIONS}
                            selectedValue={profile.bodyType}
                            onSelect={handleBodyTypeSelect}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">Suas medidas (opcional)</h3>
                         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <MeasurementInput 
                                label="Busto" 
                                value={profile.measurements?.bust || ''} 
                                onChange={(val) => handleMeasurementChange('bust', val)}
                                disabled={isAnalyzing}
                            />
                             <MeasurementInput 
                                label="Cintura" 
                                value={profile.measurements?.waist || ''} 
                                onChange={(val) => handleMeasurementChange('waist', val)}
                                disabled={isAnalyzing}
                            />
                             <MeasurementInput 
                                label="Quadril" 
                                value={profile.measurements?.hips || ''} 
                                onChange={(val) => handleMeasurementChange('hips', val)}
                                disabled={isAnalyzing}
                            />
                            <MeasurementInput 
                                label="Altura Total" 
                                value={profile.measurements?.height || ''} 
                                onChange={(val) => handleMeasurementChange('height', val)}
                                disabled={isAnalyzing}
                            />
                             <MeasurementInput 
                                label="Comp. Braço" 
                                value={profile.measurements?.armLength || ''} 
                                onChange={(val) => handleMeasurementChange('armLength', val)}
                                disabled={isAnalyzing}
                            />
                             <MeasurementInput 
                                label="Comp. Perna" 
                                value={profile.measurements?.legLength || ''} 
                                onChange={(val) => handleMeasurementChange('legLength', val)}
                                disabled={isAnalyzing}
                            />
                         </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer with actions */}
        <div className="flex justify-end space-x-4 p-4 border-t border-background bg-background rounded-b-lg">
            <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-medium text-text-primary bg-transparent border border-gray-600 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Cancelar
            </button>
            <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 text-sm font-medium text-background bg-primary border border-transparent rounded-lg shadow-sm hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                disabled={!profile.baseImage}
            >
                Salvar Perfil
            </button>
        </div>
    </Modal>
  );
};