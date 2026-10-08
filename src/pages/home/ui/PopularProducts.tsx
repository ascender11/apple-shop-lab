import { ProductList, useProducts } from '@/entities/product'

export const PopularProducts = () => {
  const { products } = useProducts()

  return (
    <section className="px-6 py-4 sm:px-10 sm:py-6 xl:px-16">
      <h1 className="mb-2 font-bold text-2xl text-text-primary sm:text-4xl xl:text-5xl">
        Buy iPhone in Moscow
      </h1>

      <p className="mb-6 text-lg text-primary sm:text-2xl">Most popular</p>

      <div className="w-full">
        <ProductList products={products} />
      </div>
    </section>
  )
}
