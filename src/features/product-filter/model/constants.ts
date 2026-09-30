import type { FiltersState } from './types'

export const PRICE_ABS_MIN = 0
export const PRICE_ABS_MAX = 300000

export const DEFAULT_FILTERS: FiltersState = {
  priceMin: 0,
  priceMax: 300000,
  categories: [],
  year: '',
}

export const CATEGORY_OPTIONS = [
  'iPhone',
  'iPad',
  'Apple Watch',
  'Mac',
  'AirPods',
  'Apple TV',
  'Accessory',
] as const

export const YEAR_OPTIONS = [
  { value: '', labelKey: 'All' },
  { value: '2026', labelKey: '2026' },
  { value: '2025', labelKey: '2025' },
  { value: '2024', labelKey: '2024' },
] as const
