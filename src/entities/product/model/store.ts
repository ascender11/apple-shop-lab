import { create } from 'zustand'

import { productService } from '../api/service'
import type { Product } from './types'

interface ProductState {
  products: Product[]
  fetchProducts: () => Promise<void>
  addProduct: (product: Product) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  fetchProducts: async () => {
    const products = await productService.getProducts()
    set({ products })
  },

  addProduct: async (product) => {
    const createdProduct = await productService.createProduct(product)

    set((state) => ({
      products: [...state.products, createdProduct],
    }))
  },

  updateProduct: async (product) => {
    const updatedProduct = await productService.updateProduct(product)

    set((state) => ({
      products: state.products.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      ),
    }))
  },

  deleteProduct: async (id) => {
    await productService.deleteProduct(id)

    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
  },
}))
