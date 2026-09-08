import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'
import { ADVANTAGES } from '../model/constants'
import type { Advantage } from '../model/types'

interface AdvantageCardProps extends ComponentProps<'div'> {
  advantage: Advantage
}

const AdvantageCard = ({ advantage, className = '', ...rest }: AdvantageCardProps) => {
  const { icon, title, description, gradient } = advantage

  return (
    <div
      style={{ '--card-gradient': gradient } as React.CSSProperties}
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl border border-gray-100/50 bg-white p-6',
        'bg-(image:--card-gradient)',
        className
      )}
      {...rest}
    >
      <img
        src={icon}
        className="h-12 w-12 object-contain md:h-16 md:w-16 lg:h-20 lg:w-20"
        alt={title}
      />
      <h5 className="text-center font-bold text-gray-950 text-xl">{title}</h5>
      <p className="text-center text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export const Advantages = ({ className = '', ...rest }: ComponentProps<'section'>) => {
  return (
    <section className={cn('flex flex-col gap-5 px-6 py-6 sm:px-10 xl:px-16', className)} {...rest}>
      <h1 className="w-full text-2xl md:text-3xl lg:text-center lg:text-6xl">Our advantages</h1>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-5">
        {ADVANTAGES.map((advantage: Advantage) => (
          <AdvantageCard key={advantage.title} advantage={advantage} />
        ))}
      </div>
    </section>
  )
}
