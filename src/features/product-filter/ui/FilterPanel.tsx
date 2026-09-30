import { Dropdown } from '@/shared/ui/components/Dropdown'
import { CATEGORY_OPTIONS, YEAR_OPTIONS } from '../model/constants'
import type { FiltersState } from '../model/types'
import { PriceSlider } from './PriceSlider'

interface FilterPanelProps {
  filters: FiltersState
  onChange: (changes: Partial<FiltersState>) => void
  onReset: () => void
}

export const FilterPanel = ({ filters, onChange, onReset }: FilterPanelProps) => {
  const handleCategoryToggle = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((item) => item !== category)
      : [...filters.categories, category]

    onChange({ categories })
  }

  return (
    <div className="flex flex-col gap-4">
      <PriceSlider
        value={[filters.priceMin, filters.priceMax]}
        onChange={([min, max]) => onChange({ priceMin: min, priceMax: max })}
      />

      <Dropdown type="single" title="Category" defaultOpen={filters.categories.length > 0}>
        <div className="flex flex-col gap-1 py-1">
          {CATEGORY_OPTIONS.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary/20"
              />
              {category}
            </label>
          ))}
        </div>
      </Dropdown>

      <Dropdown type="single" title="Year" defaultOpen={filters.year !== ''}>
        <div className="flex flex-col gap-1 py-1">
          {YEAR_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <input
                type="radio"
                name="year"
                checked={filters.year === option.value}
                onChange={() => onChange({ year: option.value })}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20"
              />
              {option.labelKey}
            </label>
          ))}
        </div>
      </Dropdown>

      <button
        type="button"
        onClick={onReset}
        className="mt-2 w-full cursor-pointer rounded-lg border border-border py-2.5 font-medium text-primary text-sm transition-colors hover:border-primary/30 hover:bg-background-tertiary"
      >
        Reset filters
      </button>
    </div>
  )
}
