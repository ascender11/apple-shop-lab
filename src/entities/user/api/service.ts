import { api } from '@/shared/api'
import type { PublicUser, RegisterData } from '../model/types'

export const userService = {
  async register(data: RegisterData): Promise<PublicUser> {
    const response = await api.post<PublicUser>('/users', data)
    return response.data
  },
}
