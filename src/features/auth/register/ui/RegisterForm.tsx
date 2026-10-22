import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import type { RegisterData } from '@/entities/user'
import { userService, useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui/components/Button'
import { Label } from '@/shared/ui/components/Label'
import { Link } from '@/shared/ui/components/Link'

const initialForm: RegisterData = {
  phone: '',
  email: '',
  fullName: {
    lastName: '',
    firstName: '',
    patronymic: '',
  },
  nickname: '',
  birthDate: '',
  password: '',
}

const inputClass =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-text-primary outline-none transition-colors focus:border-primary'

const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = error.response

    if (typeof response === 'object' && response !== null && 'data' in response) {
      const data = response.data

      if (
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string'
      ) {
        return data.message
      }
    }
  }

  return error instanceof Error ? error.message : 'Не удалось зарегистрироваться'
}

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0]

export const RegisterForm = () => {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const [form, setForm] = useState(initialForm)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: Exclude<keyof RegisterData, 'fullName'>, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateFullName = (field: keyof RegisterData['fullName'], value: string) => {
    setForm((current) => ({
      ...current,
      fullName: { ...current.fullName, [field]: value },
    }))
  }

  const handleSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault()
    setError('')

    if (form.password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    try {
      setIsSubmitting(true)

      const user = await userService.register(form)

      setUser(user)
      navigate('/')
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Фамилия</Label>
          <input
            id="lastName"
            className={inputClass}
            autoComplete="family-name"
            value={form.fullName.lastName}
            onChange={(event) => updateFullName('lastName', event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">Имя</Label>
          <input
            id="firstName"
            className={inputClass}
            autoComplete="given-name"
            value={form.fullName.firstName}
            onChange={(event) => updateFullName('firstName', event.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="patronymic">Отчество</Label>
        <input
          id="patronymic"
          className={inputClass}
          autoComplete="additional-name"
          value={form.fullName.patronymic ?? ''}
          onChange={(event) => updateFullName('patronymic', event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="registerEmail">Email</Label>
          <input
            id="registerEmail"
            className={inputClass}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Телефон</Label>
          <input
            id="phone"
            className={inputClass}
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="nickname">Никнейм</Label>
        <input
          id="nickname"
          className={inputClass}
          autoComplete="nickname"
          value={form.nickname}
          onChange={(event) => updateField('nickname', event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="birthDate">Дата рождения</Label>
        <input
          id="birthDate"
          className={inputClass}
          type="date"
          autoComplete="bday"
          value={form.birthDate}
          onChange={(event) => updateField('birthDate', event.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="registerPassword">Пароль</Label>
          <input
            id="registerPassword"
            className={inputClass}
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={(event) => updateField('password', event.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Повторите пароль</Label>
          <input
            id="confirmPassword"
            className={inputClass}
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary py-3 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Уже есть аккаунт? <Link to="/auth/login">Войти</Link>
      </p>
    </form>
  )
}
