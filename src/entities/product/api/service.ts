import { api } from '@/shared/api'
import type { Product } from '../model/types'

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products')

    return data
  },

  async getProductById(id: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)

    return data
  },

  async createProduct(product: Product): Promise<Product> {
    const { data } = await api.post<Product>('/products', product)

    return data
  },

  async updateProduct(product: Product): Promise<Product> {
    const { data } = await api.put<Product>(`/products/${product.id}`, product)

    return data
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`)
  },
}
