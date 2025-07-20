import React, { useEffect, useMemo } from 'react';
import { useTableStore } from '../store/table';
import { fetchUsers } from '../service/api/fetchUsers';

const Table: React.FC = React.memo(() => {
  const { users, setUsers, filterCountry, setFilterCountry, sortField, sortOrder, setSort } = useTableStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers().then(setUsers);
    }
  }, [setUsers, users.length]);

  const countries = useMemo(() => {
    const set = new Set(users.map((u) => u.country));
    return Array.from(set);
  }, [users]);

  const filtered = useMemo(() => {
    let arr = [...users];
    if (filterCountry) arr = arr.filter((u) => u.country === filterCountry);
    arr.sort((a, b) => {
      const aVal = a[sortField].toLowerCase();
      const bVal = b[sortField].toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [users, filterCountry, sortField, sortOrder]);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Benutzertabelle</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Land filtern:
          <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="">Alle</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => setSort('name')}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => setSort('email')}>
              E-Mail {sortField === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>Land</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <div style={{ marginTop: 24 }}>Keine Daten</div>}
    </div>
  );
});

export default Table;
