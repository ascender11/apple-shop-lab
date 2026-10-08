import type { Product } from '@/entities/product'
import { ProductForm } from './ProductForm'

interface ProductItemProps {
  product: Product
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
  onSubmit: (product: Product) => void | Promise<void>
  onDelete: (id: string) => void | Promise<void>
}

export const ProductItem = ({
  product,
  isEditing,
  onEdit,
  onCancelEdit,
  onSubmit,
  onDelete,
}: ProductItemProps) => {
  if (isEditing) {
    return <ProductForm product={product} onSubmit={onSubmit} onCancel={onCancelEdit} />
  }

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-background-secondary transition-shadow hover:shadow-sm">
      <div className="flex flex-col gap-5 p-5 sm:flex-row">
        <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-lg bg-background-tertiary p-4 sm:h-32 sm:w-32">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          ) : (
            <span className="text-sm text-text-secondary">No image</span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-background-tertiary px-2 py-1 font-medium text-text-secondary text-xs">
              {product.category}
            </span>

            <span
              className={
                product.availability === 'in_stock'
                  ? 'rounded-md bg-green-500/10 px-2 py-1 font-medium text-green-600 text-xs'
                  : 'rounded-md bg-red-500/10 px-2 py-1 font-medium text-red-500 text-xs'
              }
            >
              {product.availability === 'in_stock' ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <h2 className="line-clamp-2 font-semibold text-lg leading-snug">{product.title}</h2>

          <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-xl">{product.price?.current ?? '—'}</span>

                {product.price?.old !== undefined && (
                  <span className="text-sm text-text-secondary line-through">
                    {product.price.old}
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
                <span>★ {product.rating.score.toFixed(1)}</span>

                <span>•</span>

                <span>{product.rating.reviewsCount} reviews</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onEdit}
                className="rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors hover:bg-background-tertiary"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(product.id)}
                className="rounded-lg border border-red-500/30 px-4 py-2 font-medium text-red-500 text-sm transition-colors hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
