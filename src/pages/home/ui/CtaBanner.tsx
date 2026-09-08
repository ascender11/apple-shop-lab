import type { ComponentProps } from 'react'

import { routes } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Link } from '@/shared/ui/components/Link'

export const CtaBanner = ({ className = '' }: ComponentProps<'section'>) => {
  return (
    <section
      className={cn(
        'flex flex-col items-center gap-5 bg-background p-6 text-center sm:px-10 xl:px-16',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl md:text-3xl">Buy Apple faster and easier</h2>
        <p className="text-base text-text-quinary sm:text-xl">
          Create an account in a minute — and your cart, favorites and orders will always be with
          you.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          to={routes.login}
          className="inline-flex min-w-30 items-center justify-center rounded-xl bg-linear-to-r from-[#0071E4] to-[#9747FF] py-3 text-sm text-white no-underline sm:min-w-40 sm:text-lg"
        >
          Get started
        </Link>
        <Link
          to={routes.delivery}
          className="inline-flex min-w-30 items-center justify-center rounded-xl border border-primary py-3 text-primary text-sm no-underline transition-colors hover:bg-primary/10 sm:min-w-40 sm:text-lg"
        >
          Learn more
        </Link>
      </div>
    </section>
  )
}
