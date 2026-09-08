import { Header } from '@/widgets/header'
import { Banner } from './Banner'
import { PopularProducts } from './PopularProducts'
import { Slider } from './Slider'

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Slider />
        <PopularProducts />
        <Banner />
      </main>
    </>
  )
}
