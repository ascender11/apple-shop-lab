import { NavLink, type NavLinkProps } from 'react-router'

import { cn } from '@/shared/lib'

export const Link = ({ children, className = '', ...props }: NavLinkProps) => {
  return (
    <NavLink className={cn('link', className)} {...props}>
      {children}
    </NavLink>
  )
}
