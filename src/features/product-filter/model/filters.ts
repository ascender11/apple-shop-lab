import { DEFAULT_FILTERS } from './constants'
import type { FiltersState } from './types'

const getNumberParam = (params: URLSearchParams, key: string, fallback: number): number => {
  const value = params.get(key)

  if (value === null) {
    return fallback
  }

  const number = Number(value)

  return Number.isFinite(number) ? number : fallback
}

export const parseFilters = (params: URLSearchParams): FiltersState => {
  return {
    priceMin: getNumberParam(params, 'price.current_gte', DEFAULT_FILTERS.priceMin),

    priceMax: getNumberParam(params, 'price.current_lte', DEFAULT_FILTERS.priceMax),

    categories: params.getAll('category'),

    year: params.get('year') ?? '',
  }
}

export const serializeFilters = (
  filters: FiltersState,
  currentParams: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams(currentParams)

  params.delete('price.current_gte')
  params.delete('price.current_lte')
  params.delete('category')
  params.delete('year')

  if (filters.priceMin !== DEFAULT_FILTERS.priceMin) {
    params.set('price.current_gte', String(filters.priceMin))
  }

  if (filters.priceMax !== DEFAULT_FILTERS.priceMax) {
    params.set('price.current_lte', String(filters.priceMax))
  }

  filters.categories.forEach((category) => {
    params.append('category', category)
  })

  if (filters.year) {
    params.set('year', filters.year)
  }

  return params
}
