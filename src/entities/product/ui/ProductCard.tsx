import type { ComponentProps } from 'react'

import { routes } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/components/Button'
import { Link } from '@/shared/ui/components/Link'
import { AddToCartIcon, HeartIcon, StarIcon } from '@/shared/ui/icons'
import type { Product } from '../model/types'

export interface ProductCardProps extends ComponentProps<'div'> {
  product: Product
}

export const ProductCard = ({ product, className = '', ...rest }: ProductCardProps) => {
  const isInStock = product.availability === 'in_stock'

  return (
    <div
      data-product-card
      className={cn(
        'flex h-full w-full flex-col items-center gap-2 px-2 py-3.5',
        '@[16rem]:gap-3 @[16rem]:px-4 @[16rem]:py-5',
        'overflow-hidden rounded-2xl bg-background-secondary shadow-card',
        className
      )}
      {...rest}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="flex gap-px">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  i < Math.floor(product.rating.score) ? 'text-amber-400' : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <span className="text-primary">({product.rating.reviewsCount})</span>
        </div>

        <Button
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
          aria-label="Add to favorites"
        >
          <HeartIcon />
        </Button>
      </div>

      <Link
        to={routes.product(product.id)}
        className="line-clamp-2 w-full text-center font-medium text-2xl text-text-primary transition-colors hover:text-primary"
      >
        {product.title}
      </Link>

      <Link
        to={routes.product(product.id)}
        data-nav
        className="my-2 flex h-40 items-center justify-center"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="max-h-full object-contain"
          loading="lazy"
        />
      </Link>

      <div className="flex w-full flex-row @[16rem]:items-center items-center justify-around @[16rem]:gap-2 gap-0.5 text-base text-text-quinary">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'inline-block h-4 w-4 rounded-full',
              isInStock ? 'bg-green-500' : 'bg-red-500'
            )}
          ></span>
          <span className="@[16rem]:text-base text-sm">
            {isInStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        {isInStock && product.warrantyPeriod && (
          <span className="@[16rem]:text-base text-sm">Warranty: {product.warrantyPeriod}</span>
        )}
      </div>

      {isInStock ? (
        <div className={cn('text-center', product.price?.old && 'flex items-center gap-3')}>
          {product.price?.old && (
            <span className="text-sm text-text-quinary line-through">
              {product.price.old.toLocaleString()} ₽
            </span>
          )}
          <span className="font-medium text-2xl text-text-primary">
            {product.price?.current.toLocaleString()} ₽
          </span>
        </div>
      ) : (
        <p className="text-sm text-text-quinary">Product is temporarily unavailable</p>
      )}

      <div className="mt-auto w-full">
        {isInStock ? (
          <Button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-white transition-colors hover:bg-secondary">
            <AddToCartIcon />
            <span>Add to cart</span>
          </Button>
        ) : (
          <Button className="w-full rounded-full border border-primary bg-transparent px-4 py-2 text-primary transition-colors hover:bg-primary/10">
            Notify me when available
          </Button>
        )}
      </div>
    </div>
  )
}
