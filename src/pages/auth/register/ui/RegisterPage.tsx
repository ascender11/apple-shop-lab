import { RegisterForm } from '@/features/auth/register'

export const RegisterPage = () => {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-4 py-12">
      <section className="w-full rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 font-semibold text-2xl text-text-primary">Регистрация</h1>
        <p className="mb-6 text-sm text-text-secondary">Создайте аккаунт, чтобы продолжить</p>
        <RegisterForm />
      </section>
    </main>
  )
}
