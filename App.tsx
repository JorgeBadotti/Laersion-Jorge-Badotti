import React, { useState, useEffect, useCallback } from 'react';
import {
  ClothingItem,
  GeneratedLook,
  UserProfile,
} from './types';
import { WARDROBE_ITEMS } from './constants';
import { generateLook } from './services/geminiService';
import { WardrobePanel } from './components/WardrobePanel';
import { MainPanel } from './components/MainPanel';
import { StylePanel } from './components/StylePanel';
import { ProfileModal } from './components/ProfileModal';
import { Logo, UserIcon } from './components/icons';
import { ShoppingPanel } from './components/ShoppingPanel';

type View = 'wardrobe' | 'shopping';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    baseImage: null,
    personalStyle: null,
    bodyType: null,
    measurements: null,
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItem[]>(WARDROBE_ITEMS);
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [generatedLooks, setGeneratedLooks] = useState<GeneratedLook[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<View>('wardrobe');

  useEffect(() => {
    const timer = setTimeout(() => {
        if (!userProfile.baseImage) {
            setIsProfileModalOpen(true);
        }
    }, 500);
    return () => clearTimeout(timer);
  }, [userProfile.baseImage]);

  const handleSaveProfile = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    setIsProfileModalOpen(false);
  }, []);

  const handleSelectItem = useCallback((item: ClothingItem) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }, []);

  const handleAddItem = useCallback((item: Omit<ClothingItem, 'id'>) => {
    // Em um app real, usaríamos um UUID
    const newItem = { ...item, id: Date.now() };
    setWardrobeItems((prev) => [...prev, newItem]);
  }, []);

  const handleRemoveItem = useCallback((id: number) => {
    setWardrobeItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);
  
  const handleGenerateLook = useCallback(async (style: string) => {
    if (!userProfile.baseImage) {
      setError('Por favor, adicione uma foto de perfil primeiro.');
      setIsProfileModalOpen(true);
      return;
    }
    if (selectedItems.length === 0) {
      setError('Selecione pelo menos uma peça de roupa.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedLooks(null);

    try {
      const looks = await generateLook(userProfile.baseImage, selectedItems, style);
      setGeneratedLooks(looks);
    } catch (e: any) {
      setError(e.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, [userProfile.baseImage, selectedItems]);

  return (
    <div className="bg-background text-text-primary font-sans">
      <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-black/20">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-auto h-8 text-primary" />
          </div>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <UserIcon className="w-6 h-6" />
            <span className="hidden sm:inline">Meu Perfil</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-6 lg:h-[calc(100vh-68px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:h-full">
          
          <div className="lg:col-span-6 order-first lg:order-2 lg:h-full">
            <MainPanel
              generatedLooks={generatedLooks}
              isLoading={isLoading}
              error={error}
            />
          </div>

          <div className="lg:col-span-3 order-2 lg:order-1 lg:h-full">
             {activeView === 'wardrobe' ? (
              <WardrobePanel
                items={wardrobeItems}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onGoShopping={() => setActiveView('shopping')}
              />
            ) : (
              <ShoppingPanel
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onBack={() => setActiveView('wardrobe')}
              />
            )}
          </div>
          
          <div className="lg:col-span-3 order-3 lg:order-3 lg:h-full">
            <StylePanel onGenerate={handleGenerateLook} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
            if (userProfile.baseImage) {
                 setIsProfileModalOpen(false)
            }
        }}
        onSave={handleSaveProfile}
        currentProfile={userProfile}
      />
    </div>
  );
};

export default App;
