import { cn } from '@/shared/lib'
import type { IconProps } from './IconProps'

interface HeartIconProps extends IconProps {
  isActive?: boolean
}

export const HeartIcon = ({
  className = '',
  title = 'Heart',
  width = 24,
  height = 24,
  isActive = false,
  ...props
}: HeartIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={isActive ? 'currentColor' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'transition-colors duration-200',
        isActive ? 'text-red-500' : 'text-text-quinary hover:text-red-500',
        className
      )}
      {...props}
    >
      <title>{title}</title>
      <path
        d="M7.5 4A5.5 5.5 0 0 0 2 9.5C2 15 8.5 20 12 21.163 15.5 20 22 15 22 9.5a5.5 5.5 0 0 0-10-3.163A5.494 5.494 0 0 0 7.5 4Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
