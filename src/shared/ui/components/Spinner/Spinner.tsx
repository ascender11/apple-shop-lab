import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

export const Spinner = ({ className }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('h-8 w-8 animate-spin rounded-full border-primary border-b-2', className)}
    ></div>
  )
}
