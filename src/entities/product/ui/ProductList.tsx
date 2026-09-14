import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'
import type { Product } from '../model/types'
import { ProductCard } from './ProductCard'

export interface ProductListProps extends ComponentProps<'div'> {
  products: Product[]
  className?: string
}

export const ProductList = ({ products, className = '', ...rest }: ProductListProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-center text-lg text-text-tertiary">No products found</p>
      </div>
    )
  }

  return (
    <div className="@container">
      <div
        className={cn(
          'grid @[1024px]:grid-cols-4 @[640px]:grid-cols-2 @[768px]:grid-cols-3 grid-cols-1 items-start @[1024px]:gap-6 gap-5',
          className
        )}
        {...rest}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
