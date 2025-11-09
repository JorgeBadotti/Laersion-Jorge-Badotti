// components/ClothingListItem.tsx
import React from 'react';
import { ClothingItem, CATEGORY_LABELS } from '../types';
import { TrashIcon } from './icons';

interface ClothingListItemProps {
  item: ClothingItem;
  isSelected: boolean;
  onSelect: (item: ClothingItem) => void;
  onRemove?: (id: number) => void;
  type: 'wardrobe' | 'shopping';
}

export const ClothingListItem: React.FC<ClothingListItemProps> = ({ item, isSelected, onSelect, onRemove, type }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-background'}`}
    >
      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-background flex-shrink-0" />
      <div className="flex-grow min-w-0">
        <p className="font-semibold text-text-primary truncate">{item.name}</p>
        {type === 'wardrobe' ? (
          <p className="text-sm text-text-secondary capitalize">{CATEGORY_LABELS[item.category]}</p>
        ) : (
          <p className="text-sm text-text-secondary capitalize">{item.brand}</p>
        )}
      </div>
      {type === 'shopping' && (
        <div className="text-right flex-shrink-0">
          <p className="font-semibold text-text-primary">R$ {item.price?.toFixed(2)}</p>
          <p className="text-xs text-text-secondary">{isSelected ? 'Selecionado' : 'Selecionar'}</p>
        </div>
      )}
      {type === 'wardrobe' && onRemove && (
        <button 
          onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          className="p-2 rounded-full text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-50 hover:opacity-100 flex-shrink-0"
          aria-label={`Remover ${item.name}`}
        >
            <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
