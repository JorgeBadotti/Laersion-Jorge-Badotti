// constants.ts
import { ClothingItem, CarouselItem } from './types';

export const WARDROBE_ITEMS: ClothingItem[] = [
  { id: 1, name: 'Camisa Branca de Linho', category: 'upper', imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6d58d53f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Calça Jeans Reta', category: 'lower', imageUrl: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Tênis Branco Básico', category: 'shoes', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Bolsa de Couro Caramelo', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1590739241128-4e9e557297e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 5, name: 'Vestido Floral Midi', category: 'fullbody', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }
];

export const PERSONAL_STYLE_OPTIONS: CarouselItem[] = [
  { id: 'casual', label: 'Casual', imageUrl: 'https://images.unsplash.com/photo-1495121605344-a9217699314c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 'elegante', label: 'Elegante', imageUrl: 'https://images.unsplash.com/photo-1594641641933-7c0308c9a1d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 'criativo', label: 'Criativo', imageUrl: 'https://images.unsplash.com/photo-1574254848-36085a5a1538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 'dramatico', label: 'Dramático', imageUrl: 'https://images.unsplash.com/photo-1617114912953-e998818f2766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 'romantico', label: 'Romântico', imageUrl: 'https://images.unsplash.com/photo-1525598912003-662742432076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  { id: 'classico', label: 'Clássico', imageUrl: 'https://images.unsplash.com/photo-1622396637389-623106526a57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }
];

export const BODY_TYPE_OPTIONS: CarouselItem[] = [
    { id: 'retangulo', label: 'Retângulo', imageUrl: 'https://storage.googleapis.com/gemini-ui-params/estylist/body-rectangle.png' },
    { id: 'triangulo', label: 'Triângulo', imageUrl: 'https://storage.googleapis.com/gemini-ui-params/estylist/body-triangle.png' },
    { id: 'triangulo-invertido', label: 'Invertido', imageUrl: 'https://storage.googleapis.com/gemini-ui-params/estylist/body-inverted-triangle.png' },
    { id: 'ampulheta', label: 'Ampulheta', imageUrl: 'https://storage.googleapis.com/gemini-ui-params/estylist/body-hourglass.png' },
    { id: 'oval', label: 'Oval', imageUrl: 'https://storage.googleapis.com/gemini-ui-params/estylist/body-oval.png' },
];

export const SHOPPING_ITEMS: ClothingItem[] = [
  { id: 101, name: 'Jaqueta de Couro Preta', category: 'upper', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', brand: 'Fashion Brand', price: 349.90 },
  { id: 102, name: 'Saia Plissada Rosa', category: 'lower', imageUrl: 'https://images.unsplash.com/photo-1594642709197-2834b1d6484e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', brand: 'Chic Boutique', price: 189.90 },
  { id: 103, name: 'Bota Coturno Preta', category: 'shoes', imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e6358c1d3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', brand: 'Urban Feet', price: 299.90 },
  { id: 104, name: 'Óculos de Sol Gatinho', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1577804457365-d541a74e50d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', brand: 'Sunnies Co.', price: 120.00 },
];
