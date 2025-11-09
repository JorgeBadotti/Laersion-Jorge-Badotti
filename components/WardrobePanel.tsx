// components/WardrobePanel.tsx
import React, { useState, useMemo } from 'react';
import { ClothingItem, ClothingCategory, CATEGORY_LABELS } from '../types';
import { PlusIcon, ShoppingBagIcon } from './icons';
import { AddItemForm } from './AddItemForm';
import { Modal } from './Modal';
import { ClothingListItem } from './ClothingListItem';

interface WardrobePanelProps {
  items: ClothingItem[];
  selectedItems: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onAddItem: (item: Omit<ClothingItem, 'id'>) => void;
  onRemoveItem: (id: number) => void;
  onGoShopping: () => void;
}

const CATEGORY_ORDER: ClothingCategory[] = ['upper', 'lower', 'fullbody', 'shoes', 'accessory'];

export const WardrobePanel: React.FC<WardrobePanelProps> = ({ items, selectedItems, onSelectItem, onAddItem, onRemoveItem, onGoShopping }) => {
  const [isAdding, setIsAdding] = useState(false);

  const groupedItems = useMemo(() => {
    const groups = items.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<ClothingCategory, ClothingItem[]>);
    return groups;
  }, [items]);

  return (
    <div className="bg-surface p-4 lg:p-6 flex flex-col h-full shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-serif text-text-primary">Seu Guarda-Roupa</h2>
        <button onClick={() => setIsAdding(true)} className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
            <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto -mr-4 pr-4">
        {items.length === 0 ? (
          <div className="text-center text-text-secondary py-10 h-full flex flex-col justify-center items-center">
            <p>Seu guarda-roupa está vazio.</p>
            <p>Adicione algumas peças para começar!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {CATEGORY_ORDER.map(category => (
                groupedItems[category] && (
                    <div key={category}>
                        <h3 className="text-sm font-semibold text-text-secondary mb-2 sticky top-0 bg-surface py-1">{CATEGORY_LABELS[category]}</h3>
                        <div className="space-y-2">
                        {groupedItems[category].map(item => (
                            <ClothingListItem
                                key={item.id}
                                item={item}
                                isSelected={selectedItems.some(i => i.id === item.id)}
                                onSelect={onSelectItem}
                                onRemove={onRemoveItem}
                                type="wardrobe"
                            />
                        ))}
                        </div>
                    </div>
                )
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-background pt-4">
        <button 
            onClick={onGoShopping}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary font-bold py-3 px-4 rounded-lg hover:bg-primary/20 transition-colors"
        >
            <ShoppingBagIcon className="w-5 h-5" />
            Buscar Novas Peças
        </button>
      </div>

      <Modal isOpen={isAdding} onClose={() => setIsAdding(false)}>
        <AddItemForm onAddItem={onAddItem} onClose={() => setIsAdding(false)} />
      </Modal>
    </div>
  );
};
