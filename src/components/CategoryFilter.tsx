interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelectCategory(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selectedCategory === null
            ? 'bg-brand text-white shadow-sm'
            : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand/30'
        }`}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === category
              ? 'bg-brand text-white shadow-sm'
              : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand/30'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
