// components/ShoppingPanel.tsx
import React from 'react';
import { ClothingItem } from '../types';
import { SHOPPING_ITEMS } from '../constants';
import { ClothingListItem } from './ClothingListItem';

interface ShoppingPanelProps {
  selectedItems: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onBack: () => void;
}

export const ShoppingPanel: React.FC<ShoppingPanelProps> = ({ selectedItems, onSelectItem, onBack }) => {
  return (
    <div className="bg-surface p-4 lg:p-6 flex flex-col h-full shadow-lg rounded-xl">
        <div className="flex items-center mb-4">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-background mr-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h2 className="text-xl font-bold font-serif text-text-primary">Novidades</h2>
        </div>
        <p className="text-sm text-text-secondary mb-4">
            Inspire-se com essas peças e adicione-as ao seu look.
        </p>
      
      <div className="flex-grow overflow-y-auto -mr-4 pr-4 space-y-2">
        {SHOPPING_ITEMS.map(item => (
            <ClothingListItem
                key={item.id}
                item={item}
                isSelected={selectedItems.some(i => i.id === item.id)}
                onSelect={onSelectItem}
                type="shopping"
            />
        ))}
      </div>
    </div>
  );
};
