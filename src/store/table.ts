import { create } from 'zustand';

export type User = {
  id: number;
  name: string;
  email: string;
  country: string;
};

export type SortField = 'name' | 'email';
export type SortOrder = 'asc' | 'desc';

export type TableState = {
  users: User[];
  filterCountry: string;
  sortField: SortField;
  sortOrder: SortOrder;
  setUsers: (users: User[]) => void;
  setFilterCountry: (country: string) => void;
  setSort: (field: SortField) => void;
};

const getInitialSort = (): { sortField: SortField; sortOrder: SortOrder } => {
  const sortField = (localStorage.getItem('sortField') as SortField) || 'name';
  const sortOrder = (localStorage.getItem('sortOrder') as SortOrder) || 'asc';
  return { sortField, sortOrder };
};

const getInitialFilter = (): string => {
  return localStorage.getItem('filterCountry') || '';
};

export const useTableStore = create<TableState>((set, get) => ({
  users: [],
  filterCountry: getInitialFilter(),
  ...getInitialSort(),
  setUsers: (users) => set({ users }),
  setFilterCountry: (country) => {
    localStorage.setItem('filterCountry', country);
    set({ filterCountry: country });
  },
  setSort: (field) => {
    const { sortField, sortOrder } = get();
    let newOrder: SortOrder = 'asc';
    if (sortField === field) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    localStorage.setItem('sortField', field);
    localStorage.setItem('sortOrder', newOrder);
    set({ sortField: field, sortOrder: newOrder });
  },
}));
