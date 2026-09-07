import { cn } from '@/shared/lib'
import type { IconProps } from './IconProps'

export const BurgerMenuIcon = ({
  className = '',
  title = 'Menu',
  width = 24,
  height = 24,
  ...props
}: IconProps) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={cn('burger-menu-icon', className)}
      {...props}
    >
      <title>{title}</title>
      <line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="line-1"
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="line-2"
      />
      <line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        className="line-3"
      />
    </svg>
  )
}
