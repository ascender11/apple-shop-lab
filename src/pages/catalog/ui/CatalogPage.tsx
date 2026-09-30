import { ProductList, useProducts } from '@/entities/product'
import { FilterPanel, useFilters } from '@/features/product-filter'

export const CatalogPage = () => {
  const { filters, updateFilters, resetFilters } = useFilters()
  const products = useProducts()

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      <aside className="hidden max-w-105 shrink-0 rounded-r-xl bg-background-secondary py-6 pr-6 pl-6 md:block lg:pl-30">
        <FilterPanel filters={filters} onChange={updateFilters} onReset={resetFilters} />
      </aside>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:pr-30">
        <ProductList products={products} />
      </main>
    </div>
  )
}
