import { useTranslation } from 'react-i18next'

import { LoginForm } from '@/features/auth/login'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4 py-12">
      <section className="w-full rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 font-semibold text-2xl text-text-primary">{t('auth.login.title')}</h1>
        <p className="mb-6 text-sm text-text-secondary">{t('auth.login.subtitle')}</p>
        <LoginForm />
      </section>
    </main>
  )
}
