import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

const RadioGroup = ({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) => (
  <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} />
)

const RadioGroupItem = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) => (
  <RadioGroupPrimitive.Item
    className={cn(
      'h-5 w-5 rounded-full border border-border bg-background',
      'transition-colors',
      'hover:border-primary',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      'data-[state=checked]:border-primary',
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center">
      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
)

export { RadioGroup, RadioGroupItem }
