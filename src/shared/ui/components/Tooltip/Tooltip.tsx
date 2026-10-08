import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

const Tooltip = ({ children, ...props }: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
)

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        'z-50 rounded-md bg-primary px-3 py-1.5 text-sm text-white shadow-md',
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
)

export { Tooltip, TooltipContent, TooltipTrigger }
