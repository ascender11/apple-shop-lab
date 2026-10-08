import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

export const Checkbox = ({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    className={cn(
      'flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-background transition-colors',
      'hover:border-primary',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)
