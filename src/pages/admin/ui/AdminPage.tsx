import { useEffect, useState } from 'react'

import { type Product, useProductStore } from '@/entities/product'
import { useAddProduct } from '@/features/product/add'
import { useDeleteProduct } from '@/features/product/delete'
import { useEditProduct } from '@/features/product/edit'
import { ProductForm } from './ProductForm'
import { ProductItem } from './ProductItem'

export const AdminPage = () => {
  const products = useProductStore((state) => state.products)
  const fetchProducts = useProductStore((state) => state.fetchProducts)

  const { addProduct, isLoading: isAdding, error: addError } = useAddProduct()

  const { editProduct, isLoading: isEditing, error: editError } = useEditProduct()

  const { deleteProduct, isLoading: isDeleting, error: deleteError } = useDeleteProduct()

  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadError(null)
        await fetchProducts()
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    void loadProducts()
  }, [fetchProducts])

  const handleCreate = async (product: Product) => {
    try {
      await addProduct(product)
      setIsCreating(false)
    } catch {
      return
    }
  }

  const handleEdit = async (product: Product) => {
    try {
      await editProduct(product)
      setEditingId(null)
    } catch {
      return
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
    } catch {
      return
    }
  }

  const operationError = addError ?? editError ?? deleteError

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (loadError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <p role="alert" className="text-red-500">
          {loadError}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true)
            setLoadError(null)

            void fetchProducts()
              .catch((error: unknown) => {
                setLoadError(error instanceof Error ? error.message : 'Failed to load products')
              })
              .finally(() => setIsLoading(false))
          }}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
        >
          Retry
        </button>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-semibold text-2xl">Product management</h1>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          disabled={isCreating || isAdding}
          className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
        >
          Add product
        </button>
      </div>

      {operationError && (
        <p role="alert" className="mb-6 text-red-500">
          {operationError}
        </p>
      )}

      {isCreating && (
        <div className="mb-6">
          <ProductForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-text-secondary">No products found.</p>
      ) : (
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
      )}

      {(isEditing || isDeleting) && (
        <p className="mt-4 text-sm text-text-secondary" role="status">
          {isEditing ? 'Saving changes...' : 'Deleting product...'}
        </p>
      )}
    </main>
  )
}
