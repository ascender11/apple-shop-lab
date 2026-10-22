import { Navigate, Outlet } from 'react-router'

import { USER_ROLES, useUserStore } from '@/entities/user'
import { routes } from '@/shared/config'

export const AdminGuard = () => {
  const user = useUserStore((state) => state.user)

  if (user?.role !== USER_ROLES.ADMIN) {
    return <Navigate to={routes.home} replace />
  }

  return <Outlet />
}
