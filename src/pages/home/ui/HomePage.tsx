import { Header } from '@/widgets/header'
import { Advantages } from './Advantages'
import { Banner } from './Banner'
import { CtaBanner } from './CtaBanner'
import { NewProducts } from './NewProducts'
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
        <NewProducts />
        <Advantages />
        <CtaBanner />
      </main>
    </>
  )
}
