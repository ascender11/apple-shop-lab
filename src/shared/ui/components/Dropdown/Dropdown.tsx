import * as Accordion from '@radix-ui/react-accordion'

import { cn } from '@/shared/lib'
import { ArrowDown } from '@/shared/ui/icons'

export interface DropdownProps extends Accordion.AccordionSingleProps {
  title: string
  defaultOpen?: boolean
}

export const Dropdown = ({
  title,
  children,
  defaultOpen = false,
  className,
  ...props
}: DropdownProps) => {
  return (
    <Accordion.Root
      collapsible
      defaultValue={defaultOpen ? 'item' : undefined}
      className={cn('rounded-lg bg-background shadow-sm', className)}
      {...props}
    >
      <Accordion.Item value="item">
        <Accordion.Header>
          <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-3 font-medium transition-colors">
            <span className="text-base">{title}</span>

            <ArrowDown className="text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="px-6 pb-3">{children}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
