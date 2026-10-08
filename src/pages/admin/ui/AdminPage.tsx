import { useState } from 'react'

import { type Product, useProducts } from '@/entities/product'
import { useAddProduct } from '@/features/product/add'
import { useDeleteProduct } from '@/features/product/delete'
import { useEditProduct } from '@/features/product/edit'
import { ProductForm } from './ProductForm'
import { ProductItem } from './ProductItem'

export const AdminPage = () => {
  const { products, isLoading, error, reload } = useProducts()

  const { addProduct } = useAddProduct()
  const { editProduct } = useEditProduct()
  const { deleteProduct } = useDeleteProduct()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreate = async (product: Product) => {
    await addProduct(product)
    setIsCreating(false)
    await reload()
  }

  const handleEdit = async (product: Product) => {
    await editProduct(product)
    setEditingId(null)
    await reload()
  }

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    await reload()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Failed to load products</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Product management</h1>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="rounded-lg bg-primary px-4 py-2 text-white"
        >
          Add product
        </button>
      </div>

      {isCreating && <ProductForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />}

      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            isEditing={editingId === product.id}
            onEdit={() => setEditingId(product.id)}
            onCancelEdit={() => setEditingId(null)}
            onSubmit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  )
}
