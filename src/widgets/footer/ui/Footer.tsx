import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import { USER_ROLES, useUserStore } from '@/entities/user'
import { NAVIGATION_LINKS, routes } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Link } from '@/shared/ui/components/Link'

const getNavigationLinks = (isAdmin: boolean) =>
  NAVIGATION_LINKS.filter((link) => link.href !== routes.admin || isAdmin)

export const Footer = ({ className = '', ...rest }: ComponentProps<'footer'>) => {
  const { t } = useTranslation()
  const user = useUserStore((state) => state.user)

  const navigationLinks = getNavigationLinks(user?.role === USER_ROLES.ADMIN)

  return (
    <footer className={cn('flex flex-col gap-5 p-4 lg:flex-row', className)} {...rest}>
      <div className="flex w-full flex-col gap-2.5">
        <div className="flex gap-5">
          <img src="/logo.svg" alt={t('footer.logoAlt')} />

          <div className="flex flex-col gap-1 text-sm text-text-quinary">
            <p>{t('footer.copyright')}</p>
            <p>{t('footer.tagline')}</p>
          </div>
        </div>

        <p className="text-text-quinary text-xs">{t('footer.disclaimer')}</p>
      </div>

      <nav className="w-full">
        <ul className="flex flex-col gap-3.75">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link to={link.href}>{t(`header.${link.label}`)}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex w-full flex-col gap-2.5 sm:gap-5 sm:max-lg:flex-row sm:max-lg:items-center">
        <a href="tel:+78125619662" className="font-medium text-2xl hover:underline">
          +7 812 704 86 97
        </a>

        <div className="flex flex-col text-text-quinary text-xs">
          <p>{t('footer.consultation')}</p>
          <p>{t('footer.workingHours')}</p>
        </div>

        <div className="flex gap-2.5">
          <a
            href="https://t.me/emptyworrds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <img src="/footer/telegram-logo.svg" alt="Telegram" className="w-8" />
          </a>

          <a
            href="https://vk.com/emptyworrds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VK"
          >
            <img src="/footer/vk-logo.svg" alt="VK" className="w-8" />
          </a>

          <a
            href="https://wa.me/78127048697"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <img src="/footer/watsapp-logo.svg" alt="WhatsApp" className="w-8" />
          </a>
        </div>
      </div>
    </footer>
  )
}
