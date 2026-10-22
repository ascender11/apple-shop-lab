import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'

import type { Plugin } from 'vite'

import type { RegisterData, User } from '../src/entities/user/model/types.ts'
import { USER_ROLES } from '../src/entities/user/model/types.ts'

const USERS_FILE = path.resolve(process.cwd(), 'public/database/users.json')

type LoginData = {
  email?: string
  password?: string
}

const readUsers = async (): Promise<User[]> => {
  const content = await fs.readFile(USERS_FILE, 'utf-8')
  return JSON.parse(content) as User[]
}

const writeUsers = async (users: User[]): Promise<void> => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

const sendJson = (response: ServerResponse, status: number, data: unknown): void => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(data))
}

const readBody = async (request: IncomingMessage): Promise<unknown> => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf-8'))
}

const toPublicUser = ({ password: _, ...user }: User) => user

export const usersApi = (): Plugin => ({
  name: 'users-api',

  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const url = new URL(request.url ?? '/', 'http://localhost')

      if (url.pathname !== '/api/users' && url.pathname !== '/api/users/login') {
        next()
        return
      }

      if (request.method !== 'POST') {
        sendJson(response, 405, { message: 'Method not allowed' })
        return
      }

      try {
        const data = await readBody(request)

        if (typeof data !== 'object' || data === null) {
          sendJson(response, 400, { message: 'Некорректные данные запроса' })
          return
        }

        const users = await readUsers()

        if (url.pathname === '/api/users/login') {
          const loginData = data as LoginData
          const email = loginData.email?.trim().toLowerCase()
          const password = loginData.password

          if (!email || !password) {
            sendJson(response, 400, {
              message: 'Введите email и пароль',
            })
            return
          }

          const user = users.find(
            (item) => item.email.trim().toLowerCase() === email && item.password === password
          )

          if (!user) {
            sendJson(response, 401, {
              message: 'Неверный email или пароль',
            })
            return
          }

          sendJson(response, 200, toPublicUser(user))
          return
        }

        const registerData = data as RegisterData

        const email = registerData.email?.trim().toLowerCase()
        const phone = registerData.phone?.trim()
        const nickname = registerData.nickname?.trim()
        const firstName = registerData.fullName?.firstName?.trim()
        const lastName = registerData.fullName?.lastName?.trim()

        if (
          !email ||
          !phone ||
          !nickname ||
          !firstName ||
          !lastName ||
          !registerData.birthDate ||
          !registerData.password
        ) {
          sendJson(response, 400, {
            message: 'Заполните все обязательные поля',
          })
          return
        }

        if (users.some((user) => user.email.trim().toLowerCase() === email)) {
          sendJson(response, 409, {
            message: 'Пользователь с таким email уже зарегистрирован',
          })
          return
        }

        if (users.some((user) => user.phone === phone)) {
          sendJson(response, 409, {
            message: 'Пользователь с таким номером телефона уже зарегистрирован',
          })
          return
        }

        if (users.some((user) => user.nickname === nickname)) {
          sendJson(response, 409, {
            message: 'Пользователь с таким никнеймом уже зарегистрирован',
          })
          return
        }

        const user: User = {
          id: randomUUID(),
          phone,
          email,
          fullName: {
            firstName,
            lastName,
            patronymic: registerData.fullName.patronymic?.trim() || undefined,
          },
          nickname,
          birthDate: registerData.birthDate,
          password: registerData.password,
          role: USER_ROLES.CUSTOMER,
          createdAt: new Date().toISOString(),
        }

        users.push(user)
        await writeUsers(users)

        sendJson(response, 201, toPublicUser(user))
      } catch (error) {
        console.error('Users API error:', error)
        sendJson(response, 500, {
          message: 'Ошибка при обработке запроса пользователя',
        })
      }
    })
  },
})
