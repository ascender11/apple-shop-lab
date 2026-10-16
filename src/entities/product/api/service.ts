import { api } from '@/shared/api'
import type { FiltersState, Product } from '../model/types'

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products')

    return data
  },

  async getProductById(id: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)

    return data
  },

  async getFilteredProducts(filters: FiltersState): Promise<Product[]> {
    const products = await this.getProducts()

    return products
      .filter((product) => {
        const price = product.price?.current

        return price !== undefined && price >= filters.priceMin && price <= filters.priceMax
      })
      .filter(
        (product) =>
          filters.categories.length === 0 || filters.categories.includes(product.category)
      )
      .filter((product) => filters.year === '' || String(product.year) === filters.year)
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
