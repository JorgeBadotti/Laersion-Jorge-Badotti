// types.ts

/** Categorias de peças de roupa */
export type ClothingCategory = 'upper' | 'lower' | 'shoes' | 'accessory' | 'fullbody';

export const CATEGORY_LABELS: Record<ClothingCategory, string> = {
  upper: 'Peças de Cima',
  lower: 'Peças de Baixo',
  fullbody: 'Corpo Inteiro',
  shoes: 'Calçados',
  accessory: 'Acessórios',
};


export interface ClothingItem {
  id: number;
  name: string;
  category: ClothingCategory;
  imageUrl: string;
  brand?: string;
  price?: number;
}

export interface GeneratedLook {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Measurements {
  bust: string | number;
  waist: string | number;
  hips: string | number;
  armLength: string | number;
  legLength: string | number;
  height: string | number;
}

export interface UserProfile {
  baseImage: string | null;
  personalStyle: string | null;
  bodyType: string | null;
  measurements: Measurements | null;
}

export interface CarouselItem {
  id: string;
  label: string;
  imageUrl?: string;
}
