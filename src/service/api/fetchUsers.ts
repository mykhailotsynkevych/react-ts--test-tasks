import type { User } from '../../store/table';

type ApiUser = {
  id: number;
  name: string;
  email: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: ApiUser[] = await res.json();
  const countries = ['Deutschland', 'Österreich', 'Schweiz', 'Polen', 'Frankreich'];

  return data.map((u, i) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    country: countries[i % countries.length],
  }));
};
