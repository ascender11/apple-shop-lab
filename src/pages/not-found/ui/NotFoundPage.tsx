import { useTranslation } from 'react-i18next'

import { routes } from '@/shared/config'
import { Link } from '@/shared/ui/components/Link'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col items-center px-4 py-12.5 text-center">
      <div className="mx-auto flex max-w-80 flex-col items-center gap-10 md:max-w-none">
        <h1 className="font-bold text-3xl">{t('notFound.title')}</h1>
        <p className="text-lg text-text-secondary">{t('notFound.description')}</p>
        <Link to={routes.home} className="link-button">
          {t('notFound.goHome')}
        </Link>
        <img
          src="/not-found/phone-404.png"
          alt={t('notFound.imageAlt')}
          className="w-48 sm:w-auto"
        />
      </div>
    </main>
  )
}
