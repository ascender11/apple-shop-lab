import products from '../data/products.json'
import type { Product } from '../model/types'

export const productService = {
  async getProducts(): Promise<Product[]> {
    return products as Product[]
  },

  async getProductById(id: string): Promise<Product> {
    const product = products.find((product) => product.id === id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product as Product
  },
}
