export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export interface User {
  id: string
  phone: string
  email: string
  fullName: {
    lastName: string
    firstName: string
    patronymic?: string
  }
  nickname: string
  birthDate: string
  password: string
  role: UserRole
  createdAt: string
}

export type PublicUser = Omit<User, 'password'>

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  phone: string
  email: string
  fullName: {
    lastName: string
    firstName: string
    patronymic?: string
  }
  nickname: string
  birthDate: string
  password: string
}
