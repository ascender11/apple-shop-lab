import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const currentLang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'ru'

  const base = 'rounded-md px-3 py-1 text-xs font-medium transition-all duration-200'

  return (
    <div className="flex gap-1 rounded-lg bg-background-tertiary p-1">
      <button
        type="button"
        aria-label="Русский язык"
        aria-pressed={currentLang === 'ru'}
        onClick={() => void i18n.changeLanguage('ru')}
        className={cn(
          base,
          currentLang === 'ru'
            ? 'bg-background text-text-primary shadow-sm'
            : 'text-text-quinary hover:text-text-secondary'
        )}
      >
        RU
      </button>

      <button
        type="button"
        aria-label="English language"
        aria-pressed={currentLang === 'en'}
        onClick={() => void i18n.changeLanguage('en')}
        className={cn(
          base,
          currentLang === 'en'
            ? 'bg-background text-text-primary shadow-sm'
            : 'text-text-quinary hover:text-text-secondary'
        )}
      >
        EN
      </button>
    </div>
  )
}
