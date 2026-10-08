import * as LabelPrimitive from '@radix-ui/react-label'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib'

export const Label = ({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) => (
  <LabelPrimitive.Root className={cn('text-sm text-text-secondary', className)} {...props} />
)
