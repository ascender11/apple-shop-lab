import { routes } from '@/shared/config'
import { Link } from '@/shared/ui/components/Link'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center px-4 py-12.5 text-center">
        <div className="mx-auto flex max-w-80 flex-col items-center gap-10 md:max-w-none">
          <h1 className="font-bold text-3xl">Error 404</h1>
          <p className="text-lg text-text-secondary">It seems this page does not exist</p>
          <Link to={routes.home} className="link-button">
            Go back home
          </Link>
          <img src="/not-found/phone-404.png" alt="404" className="w-48 sm:w-auto" />
        </div>
      </main>
      <Footer />
    </>
  )
}
