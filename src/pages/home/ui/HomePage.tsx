import { Header } from '@/widgets/header'
import { PopularProducts } from './PopularProducts'
import { Slider } from './Slider'

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Slider />
        <PopularProducts />
      </main>
    </>
  )
}
