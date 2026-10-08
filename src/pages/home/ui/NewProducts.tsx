import { ProductList, useProducts } from '@/entities/product'

export const NewProducts = () => {
  const { products } = useProducts()

  return (
    <section className="px-6 py-4 sm:px-10 sm:py-6 xl:px-16">
      <p className="mb-6 text-lg text-primary sm:text-2xl">Newest</p>
      <div className="w-full">
        <ProductList products={products} />
      </div>
    </section>
  )
}
