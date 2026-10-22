import { type SubmitEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { userService, useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui/components/Button'
import { Label } from '@/shared/ui/components/Label'
import { Link } from '@/shared/ui/components/Link'

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

  return error instanceof Error ? error.message : 'Не удалось войти'
}

export const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setUser = useUserStore((state) => state.setUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const message = (location.state as { message?: string } | null)?.message

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    try {
      setIsSubmitting(true)

      const user = await userService.login({ email, password })

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
      {message && (
        <p className="text-green-700 text-sm" role="status">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="loginEmail">Email</Label>
        <input
          id="loginEmail"
          className={inputClass}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="loginPassword">Пароль</Label>
        <input
          id="loginPassword"
          className={inputClass}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
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
        {isSubmitting ? 'Вход...' : 'Войти'}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
      </p>
    </form>
  )
}
