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
    return <div className="py-10 text-center text-text-quinary">No products found</div>
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        className
      )}
      {...rest}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="h-full" />
      ))}
    </div>
  )
}
