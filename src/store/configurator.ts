import { create } from 'zustand';

export type Option = {
  label: string;
  value: string;
  price: number;
};

export type Category = {
  name: string;
  options: Option[];
};

export type ConfiguratorState = {
  categories: Category[];
  selected: Record<string, string>;
  setOption: (category: string, value: string) => void;
};

const initialCategories: Category[] = [
  {
    name: 'Farbe',
    options: [
      { label: 'Rot', value: 'red', price: 10 },
      { label: 'Blau', value: 'blue', price: 0 },
      { label: 'Grün', value: 'green', price: 5 },
    ],
  },
  {
    name: 'Größe',
    options: [
      { label: 'S', value: 's', price: 0 },
      { label: 'M', value: 'm', price: 5 },
      { label: 'XL', value: 'xl', price: 15 },
    ],
  },
  {
    name: 'Material',
    options: [
      { label: 'Baumwolle', value: 'cotton', price: 0 },
      { label: 'Seide', value: 'silk', price: 20 },
      { label: 'Leinen', value: 'linen', price: 10 },
    ],
  },
];

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  categories: initialCategories,
  selected: {
    Farbe: 'red',
    Größe: 's',
    Material: 'cotton',
  },
  setOption: (category, value) =>
    set((state) => ({
      selected: { ...state.selected, [category]: value },
    })),
}));
