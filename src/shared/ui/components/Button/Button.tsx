import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

export const Button = ({ children, className = '', ...rest }: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-colors',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
