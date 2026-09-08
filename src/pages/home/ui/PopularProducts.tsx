import type { Product } from '@/entities/product'
import { ProductList } from '@/entities/product'

const products: Product[] = [
  {
    id: '1',
    title: 'Apple iPad Pro 11" (M4) 256 ГБ Space Black',
    images: [
      'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-glass-select-gallery-2-202405?wid=5120&hei=2880&fmt=webp&qlt=90&.v=QU8rTGFZUkxWbm1Fc0VaUXQ2QVNpR0pvMjZnN3E5aGRZVXJIWmhFMitJSU9WV3R2ZHdZMXRzTjZIcWdMTlg4eUJQYkhSV3V1dC9oa0s5K3lqMGtUaGVKZVh6REdCb3NhUkU0K1Z6WFRtbCtXQm92T1BGMVFqb0UvQ214cjlZaHg&traceId=1',
    ],
    category: 'iPad',
    rating: {
      score: 4.7,
      reviewsCount: 38,
    },
    warrantyPeriod: '1 year',
    price: {
      current: 99990,
    },
    availability: 'in_stock',
  },
  {
    id: '2',
    title: 'Apple iPad Pro 11" (M4) 256 ГБ Space Black',
    images: [
      'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-glass-select-gallery-2-202405?wid=5120&hei=2880&fmt=webp&qlt=90&.v=QU8rTGFZUkxWbm1Fc0VaUXQ2QVNpR0pvMjZnN3E5aGRZVXJIWmhFMitJSU9WV3R2ZHdZMXRzTjZIcWdMTlg4eUJQYkhSV3V1dC9oa0s5K3lqMGtUaGVKZVh6REdCb3NhUkU0K1Z6WFRtbCtXQm92T1BGMVFqb0UvQ214cjlZaHg&traceId=1',
    ],
    category: 'iPad',
    rating: {
      score: 4.7,
      reviewsCount: 38,
    },
    warrantyPeriod: '1 year',
    price: {
      current: 99990,
    },
    availability: 'in_stock',
  },
]

export const PopularProducts = () => (
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
