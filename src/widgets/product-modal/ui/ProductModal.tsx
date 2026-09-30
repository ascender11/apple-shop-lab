import * as Dialog from '@radix-ui/react-dialog'
import { useLocation, useNavigate } from 'react-router'

import { useProduct } from '@/entities/product'
import { Button } from '@/shared/ui/components/Button'
import { AddToCartIcon, HeartIcon, StarIcon } from '@/shared/ui/icons'

type ProductModalProps = {
  productId: string
}

export const ProductModal = ({ productId }: ProductModalProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = useProduct(productId)

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('product')

    const search = searchParams.toString()

    navigate(`${location.pathname}${search ? `?${search}` : ''}`)
  }

  if (!product) {
    return null
  }

  const isInStock = product.availability === 'in_stock'

  return (
    <Dialog.Root open onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-2xl bg-background p-6 shadow-xl outline-none sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl sm:h-100 lg:h-125">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-transparent p-1 transition-colors hover:border-primary"
                    >
                      <img
                        src={image}
                        alt={`${product.title} — фото ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col">
              <div className="mb-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-px">
                      {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon
                          key={index}
                          className={
                            index < Math.floor(product.rating.score)
                              ? 'text-amber-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>

                    <span className="text-sm text-text-primary">
                      {product.rating.score} ({product.rating.reviewsCount} reviews)
                    </span>
                  </div>

                  <Button
                    className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100"
                    aria-label="Add to favorites"
                  >
                    <HeartIcon />
                  </Button>
                </div>

                <Dialog.Title className="font-semibold text-3xl text-text-primary leading-tight sm:text-4xl">
                  {product.title}
                </Dialog.Title>
              </div>

              <div className="mb-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3.5 w-3.5 rounded-full ${
                      isInStock ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />

                  <span className="text-sm text-text-quinary">
                    {isInStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>

                {isInStock && product.warrantyPeriod && (
                  <p className="text-sm text-text-quinary">Warranty: {product.warrantyPeriod}</p>
                )}
              </div>

              <div className="mt-auto rounded-2xl bg-background-secondary p-6 sm:p-8">
                {isInStock ? (
                  <>
                    <div className="mb-6 flex flex-col gap-1">
                      {product.price?.old && (
                        <span className="text-lg text-text-quinary line-through">
                          {product.price.old.toLocaleString('ru-RU')} ₽
                        </span>
                      )}

                      <span className="font-semibold text-4xl text-text-primary">
                        {product.price?.current.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    <Button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-white transition-colors hover:bg-secondary">
                      <AddToCartIcon />
                      <span>Add to cart</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mb-2 font-medium text-lg text-text-secondary">
                      Product is unavailable
                    </p>

                    <p className="mb-6 text-sm text-text-quinary">
                      We will notify you when this product becomes available.
                    </p>

                    <Button className="w-full rounded-full border border-primary bg-transparent px-6 py-3 text-primary transition-colors hover:bg-primary/10">
                      Notify me when available
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <Dialog.Close
            className="absolute top-1 right-4 rounded-full p-2 text-2xl text-text-quinary transition-colors hover:text-text-primary"
            aria-label="Close"
          >
            ×
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
