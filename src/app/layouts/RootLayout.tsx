import { Outlet, useSearchParams } from 'react-router'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { ProductModal } from '@/widgets/product-modal'

export const RootLayout = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product')

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {productId && <ProductModal productId={productId} />}
    </>
  )
}
