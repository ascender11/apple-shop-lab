import type { ComponentProps } from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  year: '',
  warrantyPeriod: '',
  price: {
    current: 0,
  },
  availability: 'in_stock',
})

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const { t } = useTranslation()
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
        <h2 className="font-semibold text-xl">
          {product ? t('admin.productForm.editTitle') : t('admin.productForm.addTitle')}
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
          {product ? t('admin.productForm.editDescription') : t('admin.productForm.addDescription')}
        </p>
      </div>

      <Separator className="mb-6 h-px bg-border" />

      <div className="grid gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="product-title">{t('admin.productForm.title')}</Label>

          <input
            id="product-title"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder={t('admin.productForm.titlePlaceholder')}
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-category">{t('admin.productForm.category')}</Label>

          <input
            id="product-category"
            value={form.category}
            onChange={(event) => updateField('category', event.target.value)}
            placeholder={t('admin.productForm.categoryPlaceholder')}
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="product-price">{t('admin.productForm.currentPrice')}</Label>

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
            <Label htmlFor="product-old-price">{t('admin.productForm.oldPrice')}</Label>

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
          <Label htmlFor="product-availability">{t('admin.productForm.availability')}</Label>

          <Select
            value={form.availability}
            onValueChange={(value) => updateField('availability', value as Product['availability'])}
          >
            <SelectTrigger id="product-availability">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="in_stock">{t('admin.productItem.inStock')}</SelectItem>
              <SelectItem value="out_of_stock">{t('admin.productItem.outOfStock')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-warranty">{t('admin.productForm.warrantyPeriod')}</Label>

          <input
            id="product-warranty"
            value={form.warrantyPeriod}
            onChange={(event) => updateField('warrantyPeriod', event.target.value)}
            placeholder={t('admin.productForm.warrantyPlaceholder')}
            className="rounded-lg border border-border bg-background px-3 py-2.5 outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="product-images">{t('admin.productForm.images')}</Label>

          <span className="text-text-secondary text-xs">
            {t('admin.productForm.imagesDescription')}
          </span>

          <textarea
            id="product-images"
            value={images}
            onChange={(event) => setImages(event.target.value)}
            rows={5}
            placeholder={t('admin.productForm.imagesPlaceholder')}
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
          {t('admin.productForm.cancel')}
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90"
        >
          {product ? t('admin.productForm.saveChanges') : t('admin.productForm.addProduct')}
        </button>
      </div>
    </form>
  )
}
