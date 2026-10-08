import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'

import type { Product } from '@/entities/product'
import { Label } from '@/shared/ui/components/Label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/Select'
import { Separator } from '@/shared/ui/components/Separator'

interface ProductFormProps {
  product?: Product
  onSubmit: (product: Product) => void | Promise<void>
  onCancel: () => void
}

const createEmptyProduct = (): Product => ({
  id: crypto.randomUUID(),
  title: '',
  images: [],
  category: '',
  rating: {
    score: 0,
    reviewsCount: 0,
  },
  warrantyPeriod: '',
  price: {
    current: 0,
  },
  availability: 'in_stock',
})

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [form, setForm] = useState<Product>(product ?? createEmptyProduct())
  const [images, setImages] = useState(product?.images.join('\n') ?? '')

  useEffect(() => {
    setForm(product ?? createEmptyProduct())
    setImages(product?.images.join('\n') ?? '')
  }, [product])

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = async (event) => {
    event.preventDefault()

    await onSubmit({
      ...form,
      images: images
        .split('\n')
        .map((image) => image.trim())
        .filter(Boolean),
    })
  }

  const updateField = <K extends keyof Product>(field: K, value: Product[K]) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-background-secondary p-6"
    >
      <div className="mb-6">
        <h2 className="font-semibold text-xl">{product ? 'Edit product' : 'Add product'}</h2>

        <p className="mt-1 text-sm text-text-secondary">
          {product ? 'Update the product information.' : 'Add a new product to the catalog.'}
        </p>
      </div>

      <Separator className="mb-6 h-px bg-border" />

      <div className="grid gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-title">Title</Label>

          <input
            id="product-title"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Product title"
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-category">Category</Label>

          <input
            id="product-category"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            placeholder="Product category"
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="product-price">Current price</Label>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price?.current ?? ''}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price: {
                    ...current.price,
                    current: Number(event.target.value),
                  },
                }))
              }
              className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="product-old-price">Old price</Label>

            <input
              id="product-old-price"
              type="number"
              min="0"
              step="0.01"
              value={form.price?.old ?? ''}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price: {
                    current: current.price?.current ?? 0,
                    old: event.target.value ? Number(event.target.value) : undefined,
                  },
                }))
              }
              className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-availability">Availability</Label>

          <Select
            value={form.availability}
            onValueChange={(value) => updateField('availability', value as Product['availability'])}
          >
            <SelectTrigger id="product-availability">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="in_stock">In stock</SelectItem>
              <SelectItem value="out_of_stock">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-warranty">Warranty period</Label>

          <input
            id="product-warranty"
            value={form.warrantyPeriod}
            onChange={(event) => updateField('warrantyPeriod', event.target.value)}
            placeholder="For example: 1 year"
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-images">Images</Label>

          <span className="text-text-secondary text-xs">Add one image URL per line.</span>

          <textarea
            id="product-images"
            value={images}
            onChange={(event) => setImages(event.target.value)}
            rows={5}
            placeholder={'https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg'}
            className="resize-y rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary"
          />
        </div>
      </div>

      <Separator className="my-6 h-px bg-border" />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2.5 font-medium text-sm transition-colors hover:bg-background-tertiary"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90"
        >
          {product ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  )
}
