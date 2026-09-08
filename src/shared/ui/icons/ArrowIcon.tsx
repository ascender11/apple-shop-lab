import { cn } from '@/shared/lib'
import type { IconProps } from './IconProps'

interface ArrowIconProps extends IconProps {
  direction?: 'right' | 'left' | 'down' | 'up'
}

const paths = {
  right: 'm7.2 18 6-6-6-6 1.2-2.4 8.4 8.4-8.4 8.4L7.2 18Z',
  left: 'm16.8 6-6 6 6 6-1.2 2.4L7.2 12l8.4-8.4L16.8 6Z',
  down: 'm6 7.2 6 6 6-6 2.4 1.2-8.4 8.4-8.4-8.4L6 7.2Z',
  up: 'm18 16.8-6-6-6 6-2.4-1.2 8.4-8.4 8.4 8.4-2.4 1.2Z',
} as const

const ArrowIcon = ({
  direction = 'right',
  className = '',
  title = `Arrow ${direction}`,
  width = 24,
  height = 24,
  ...props
}: ArrowIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-text-primary', className)}
      {...props}
    >
      <title>{title}</title>
      <path d={paths[direction]} fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export const ArrowLeft = (props: IconProps) => <ArrowIcon {...props} direction="left" />

export const ArrowRight = (props: IconProps) => <ArrowIcon {...props} direction="right" />

export const ArrowDown = (props: IconProps) => <ArrowIcon {...props} direction="down" />

export const ArrowUp = (props: IconProps) => <ArrowIcon {...props} direction="up" />
