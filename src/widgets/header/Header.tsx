import { useState } from 'react'

import { NAVIGATION_LINKS } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Link } from '@/shared/ui/components/Link'
import { BurgerMenuIcon, Logo, Phone } from '@/shared/ui/icons'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="relative">
      <div
        className={cn(
          'relative z-20 flex flex-row items-center justify-between bg-background px-4 py-1 md:px-6 md:py-2 lg:px-25 lg:py-2.5'
        )}
      >
        <Logo />

        <nav className="flex items-center">
          <ul className="hidden flex-row gap-7.5 lg:flex">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.id}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-row items-center gap-4">
          <div className="flex items-center gap-1.25">
            <Phone />
            <a href="tel:+78125619662" className="hover:underline">
              +7 812 561 96 62
            </a>
          </div>

          <button
            type="button"
            className="h-6 w-6 focus:outline-none lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <BurgerMenuIcon className={cn({ open: isMenuOpen })} />
          </button>
        </div>
      </div>

      <button
        className={cn(
          'pointer-events-none fixed inset-0 z-15 bg-black/40 opacity-0 transition-all duration-300 lg:hidden',
          { 'pointer-events-auto opacity-100': isMenuOpen }
        )}
        type="button"
        onClick={closeMenu}
      />

      <nav
        className={cn(
          'absolute left-0 z-15 w-full -translate-y-full transform rounded-b-2xl bg-background shadow-lg transition-transform duration-300 lg:hidden',
          { 'translate-y-0': isMenuOpen }
        )}
      >
        <ul className="flex flex-col gap-1.5 p-6">
          {NAVIGATION_LINKS.map((link) => (
            <li key={link.id}>
              <Link to={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
