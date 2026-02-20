export default function Filter({ categories, filters, onChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Фильтры</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Категория</h4>
        <select
          className="w-full border rounded px-3 py-2"
          value={filters.category_id || ''}
          onChange={(e) => onChange({ category_id: e.target.value || null })}
        >
          <option value="">Все категории</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Цена, ₽</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            className="w-1/2 border rounded px-3 py-2"
            value={filters.min_price || ''}
            onChange={(e) => onChange({ min_price: e.target.value || null })}
          />
          <input
            type="number"
            placeholder="До"
            className="w-1/2 border rounded px-3 py-2"
            value={filters.max_price || ''}
            onChange={(e) => onChange({ max_price: e.target.value || null })}
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Поиск</h4>
        <input
          type="text"
          placeholder="Название товара"
          className="w-full border rounded px-3 py-2"
          value={filters.search || ''}
          onChange={(e) => onChange({ search: e.target.value })}
        />
      </div>

      {/* Reset button */}
      <button
        onClick={() => onChange({
          category_id: null,
          min_price: null,
          max_price: null,
          search: ''
        })}
        className="w-full border border-primary text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
