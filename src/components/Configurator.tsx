import { useConfiguratorStore } from '../store/configurator';

const Configurator = (() => {
const categories = useConfiguratorStore((state) => state.categories);
const selected = useConfiguratorStore((state) => state.selected);
const setOption = useConfiguratorStore((state) => state.setOption);

  const total = categories.reduce((sum, cat) => {
      const option = cat.options.find((o) => o.value === selected[cat.name]);
      return sum + (option ? option.price : 0);
    }, 0);

  return (
    <div style={{ maxWidth: 400, margin: '30px auto 0', padding: 24, border: '1px solid #eee', borderRadius: 8, backgroundColor: '#f9f9f9' }}>
      <h2>Produktkonfigurator</h2>
      {categories.map((cat) => (
        <div key={cat.name} style={{ marginBottom: 16 }}>
          <h3>{cat.name}</h3>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {cat.options.map((opt) => (
              <label key={opt.value} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={cat.name}
                  value={opt.value}
                  checked={selected[cat.name] === opt.value}
                  onChange={() => setOption(cat.name, opt.value)}
                />{' '}
                {opt.label} {opt.price > 0 ? `(+${opt.price}€)` : ''}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontWeight: 600, fontSize: 18, marginTop: 24 }}>
        Gesamtpreis: {total}€
      </div>
    </div>
  );
});

export default Configurator;
