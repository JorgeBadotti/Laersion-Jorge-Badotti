// components/WardrobePanel.tsx
import React, { useState } from 'react';
import { ClothingItem } from './types';
import { PlusIcon, ShoppingBagIcon, TrashIcon } from './components/icons';
import { AddItemForm } from './components/AddItemForm';
import { Modal } from './components/Modal';

interface WardrobePanelProps {
  items: ClothingItem[];
  selectedItems: ClothingItem[];
  onSelectItem: (item: ClothingItem) => void;
  onAddItem: (item: Omit<ClothingItem, 'id'>) => void;
  onRemoveItem: (id: number) => void;
  onGoShopping: () => void;
}

export const WardrobePanel: React.FC<WardrobePanelProps> = ({ items, selectedItems, onSelectItem, onAddItem, onRemoveItem, onGoShopping }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="bg-surface p-4 lg:p-6 flex flex-col h-full shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-serif text-text-primary">Seu Guarda-Roupa</h2>
        <button onClick={() => setIsAdding(true)} className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors">
            <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto -mr-4 pr-4 space-y-2">
        {items.length === 0 ? (
          <div className="text-center text-text-secondary py-10">
            <p>Seu guarda-roupa está vazio.</p>
            <p>Adicione algumas peças para começar!</p>
          </div>
        ) : (
          items.map(item => {
            const isSelected = selectedItems.some(i => i.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-background'}`}
              >
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-background" />
                <div className="flex-grow">
                  <p className="font-semibold text-text-primary">{item.name}</p>
                  <p className="text-sm text-text-secondary capitalize">{item.category}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemoveItem(item.id); }}
                  className="p-2 rounded-full text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-50 hover:opacity-100"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            )
          })
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
