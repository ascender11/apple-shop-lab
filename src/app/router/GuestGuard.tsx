import { Navigate, Outlet } from 'react-router'

import { useUserStore } from '@/entities/user'
import { routes } from '@/shared/config'

export const GuestGuard = () => {
  const user = useUserStore((state) => state.user)

  if (user) {
    return <Navigate to={routes.home} replace />
  }

  return <Outlet />
}
