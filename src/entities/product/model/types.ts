export interface Product {
  id: string
  title: string
  images: string[]
  category: string
  rating: {
    score: number
    reviewsCount: number
  }
  year: string
  warrantyPeriod: string
  price?: {
    current: number
    old?: number
  }
  availability: 'in_stock' | 'out_of_stock'
}

export interface FiltersState {
  priceMin: number
  priceMax: number
  categories: string[]
  year: string
}
