import { api } from '@/shared/api'
import type { LoginData, PublicUser, RegisterData } from '../model/types'

export const userService = {
  async register(data: RegisterData): Promise<PublicUser> {
    const response = await api.post<PublicUser>('/users', data)
    return response.data
  },

  async login(data: LoginData): Promise<PublicUser> {
    const response = await api.post<PublicUser>('/users/login', {
      email: data.email.trim().toLowerCase(),
      password: data.password,
    })

    return response.data
  },
}
