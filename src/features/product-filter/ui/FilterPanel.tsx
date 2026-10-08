import { Checkbox } from '@/shared/ui/components/Checkbox'
import { Dropdown } from '@/shared/ui/components/Dropdown'
import { Label } from '@/shared/ui/components/Label'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/components/RadioGroup'
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
          {CATEGORY_OPTIONS.map((category) => {
            const id = `category-${category}`

            return (
              <div
                key={category}
                className="flex items-center gap-2.5 px-1 py-1.5 transition-colors hover:text-text-primary"
              >
                <Checkbox
                  id={id}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />

                <Label htmlFor={id} className="cursor-pointer">
                  {category}
                </Label>
              </div>
            )
          })}
        </div>
      </Dropdown>

      <Dropdown type="single" title="Year" defaultOpen={filters.year !== ''}>
        <RadioGroup
          value={filters.year}
          onValueChange={(year) => onChange({ year })}
          className="flex flex-col gap-1 py-1"
        >
          {YEAR_OPTIONS.map((option) => {
            const id = `year-${option.value}`

            return (
              <div key={option.value} className="flex items-center gap-2.5 px-1 py-1.5">
                <RadioGroupItem id={id} value={option.value} />

                <Label htmlFor={id} className="cursor-pointer">
                  {option.labelKey}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
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
