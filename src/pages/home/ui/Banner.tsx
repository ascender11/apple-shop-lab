import type { ComponentProps } from 'react'

import { useProductLink } from '@/entities/product'
import { cn } from '@/shared/lib'
import { Link } from '@/shared/ui/components/Link'

export const Banner = ({ className = '' }: ComponentProps<'section'>) => {
  const productLink = useProductLink('1')

  return (
    <section
      className={cn(
        'relative flex min-h-37.75 items-center overflow-hidden bg-black pl-25 sm:min-h-51 sm:pl-50 lg:min-h-90 lg:pl-112.5',
        className
      )}
    >
      <img
        src="/home/phone-banner-image.png"
        alt="iPhone 14 Pro Max"
        className="absolute top-0 left-4 w-16.25 sm:left-10 sm:w-27.5 lg:w-61.5"
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 text-white">
          <h1 className="font-bold text-xl sm:text-3xl lg:text-6xl">iPhone 14 Pro Max</h1>
          <p className="lg:text-2xl">at the best price in Moscow</p>
        </div>
        <Link to={productLink} className="link-button w-40">
          Learn more
        </Link>
      </div>
    </section>
  )
}
