import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Link } from '@/shared/ui/components/Link'
import { ArrowLeft, ArrowRight } from '@/shared/ui/icons'
import { SLIDES } from '../model/constants'
import type { Slide as SlideType } from '../model/types'

import 'swiper/css'
import 'swiper/css/navigation'

export const Slider = () => {
  return (
    <section className="relative mt-6 w-full px-6 sm:mt-8 sm:px-10 xl:mt-10 xl:px-16">
      <div className="mx-auto xl:max-w-none">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.home-slider__arrow--next',
            prevEl: '.home-slider__arrow--prev',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="relative w-full overflow-hidden rounded-2xl"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Slide {...slide} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className="home-slider__arrow--prev absolute top-1/2 left-0 z-30 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent sm:left-0 sm:flex sm:h-10 sm:w-10 xl:left-3 xl:h-10 xl:w-10"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-6 w-6 text-text-primary/50 sm:h-8 sm:w-8 xl:h-10 xl:w-10" />
      </button>

      <button
        type="button"
        className="home-slider__arrow--next absolute top-1/2 right-0 z-30 hidden h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent sm:right-0 sm:flex sm:h-10 sm:w-10 xl:right-3 xl:h-10 xl:w-10"
        aria-label="Next slide"
      >
        <ArrowRight className="h-6 w-6 text-text-primary/50 sm:h-8 sm:w-8 xl:h-10 xl:w-10" />
      </button>
    </section>
  )
}

const Slide = ({ title, specs, image, backgroundColor, color }: SlideType) => {
  return (
    <div
      className="relative flex h-132 flex-col gap-4 px-6 py-5 sm:h-144 sm:px-8 sm:py-6"
      style={{ backgroundColor }}
    >
      <div className="flex flex-1 flex-col items-center justify-between text-center xl:hidden">
        <div className="z-10 flex flex-col items-center gap-4">
          <h2
            className="font-bold text-2xl tracking-wide sm:text-4xl xl:text-5xl"
            style={{ color }}
          >
            {title}
          </h2>
          <ul
            className="rounded-xl bg-black/20 px-4 py-3 text-sm leading-relaxed sm:text-lg xl:text-xl"
            style={{ color }}
          >
            {specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <Link
            to="/catalog"
            className="link-button rounded-full px-6 py-2.5 font-semibold text-base outline"
          >
            Learn more
          </Link>
        </div>
        <img
          className="relative z-10 h-48 w-48 object-contain sm:h-64 sm:w-64"
          src={image}
          alt={title}
        />
      </div>

      <div
        className="hidden h-122 py-16 pl-8 xl:flex xl:flex-row xl:items-center xl:justify-start"
        style={{ gap: 'clamp(1.5rem, 2vw, 3rem)' }}
      >
        <div className="z-10 flex max-w-2/3 flex-col items-start gap-4 text-left">
          <h2
            className="font-bold text-2xl tracking-wide sm:text-4xl xl:text-5xl"
            style={{ color }}
          >
            {title}
          </h2>
          <ul
            className="rounded-xl bg-black/20 px-4 py-3 text-sm leading-relaxed sm:text-lg xl:text-xl"
            style={{ color }}
          >
            {specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
          <Link
            to="/catalog"
            className="link-button rounded-full px-6 py-2.5 font-semibold text-base outline"
          >
            Learn more
          </Link>
        </div>
        <img
          className="relative z-10 h-48 w-48 object-contain sm:h-64 sm:w-64 xl:absolute xl:top-1/2 xl:right-12 xl:h-112 xl:w-auto xl:-translate-y-1/2"
          src={image}
          alt={title}
        />
      </div>
    </div>
  )
}
