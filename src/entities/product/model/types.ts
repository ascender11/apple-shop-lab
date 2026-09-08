export interface Product {
  id: string
  title: string
  images: string[]
  category: string
  rating: {
    score: number
    reviewsCount: number
  }
  warrantyPeriod: string
  price?: {
    current: number
    old?: number
  }
  availability: 'in_stock' | 'out_of_stock'
}
