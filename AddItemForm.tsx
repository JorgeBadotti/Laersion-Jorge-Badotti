// AddItemForm.tsx
import React, { useState } from 'react';
import { ClothingItem } from './types';

interface AddItemFormProps {
  onAddItem: (item: Omit<ClothingItem, 'id'>) => void;
  onClose: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'upper' | 'lower' | 'shoes' | 'accessory' | 'fullbody'>('upper');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !image) {
        setError('Por favor, preencha todos os campos e adicione uma imagem.');
        return;
    }
    onAddItem({ name, category, imageUrl: image });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-surface rounded-lg">
      <h3 className="text-lg font-bold font-serif text-text-primary">Adicionar Nova Peça</h3>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Nome da Peça</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-background text-text-primary focus:ring-primary focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Categoria</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-background text-text-primary focus:ring-primary focus:border-primary">
          <option value="upper">Parte de Cima</option>
          <option value="lower">Parte de Baixo</option>
          <option value="fullbody">Corpo Inteiro</option>
          <option value="shoes">Calçados</option>
          <option value="accessory">Acessório</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Imagem</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-1 block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
        {image && <img src={image} alt="Preview" className="mt-2 h-24 w-auto rounded" />}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex justify-end gap-2 pt-4 border-t border-background">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-primary bg-transparent border border-gray-600 rounded-lg">Cancelar</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-background bg-primary border border-transparent rounded-lg">Adicionar</button>
      </div>
    </form>
  );
};
