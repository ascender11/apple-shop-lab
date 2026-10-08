import fs from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'

import type { Plugin } from 'vite'

import type { Product } from '../src/entities/product/model/types.ts'

const PRODUCTS_FILE = path.resolve(process.cwd(), 'public/products.json')

const readProducts = async (): Promise<Product[]> => {
  const file = await fs.readFile(PRODUCTS_FILE, 'utf-8')

  return JSON.parse(file) as Product[]
}

const writeProducts = async (products: Product[]) => {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8')
}

const sendJson = (response: ServerResponse, status: number, data: unknown) => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(data))
}

const readBody = async (request: IncomingMessage): Promise<unknown> => {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk))
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf-8'))
}

export const productsApi = (): Plugin => ({
  name: 'products-api',

  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const url = request.url ?? ''

      if (!url.startsWith('/api/products')) {
        next()
        return
      }

      try {
        const pathname = url.split('?')[0]
        const productId = pathname.replace('/api/products', '').split('/').filter(Boolean)[0]

        if (request.method === 'GET' && !productId) {
          const products = await readProducts()

          sendJson(response, 200, products)
          return
        }

        if (request.method === 'GET' && productId) {
          const products = await readProducts()
          const product = products.find((item) => item.id === productId)

          if (!product) {
            sendJson(response, 404, {
              message: 'Product not found',
            })
            return
          }

          sendJson(response, 200, product)
          return
        }

        if (request.method === 'POST' && !productId) {
          const product = (await readBody(request)) as Product
          const products = await readProducts()

          if (products.some((item) => item.id === product.id)) {
            sendJson(response, 409, {
              message: 'Product with this id already exists',
            })
            return
          }

          products.push(product)

          await writeProducts(products)

          sendJson(response, 201, product)
          return
        }

        if (request.method === 'PUT' && productId) {
          const product = (await readBody(request)) as Product
          const products = await readProducts()
          const index = products.findIndex((item) => item.id === productId)

          if (index === -1) {
            sendJson(response, 404, {
              message: 'Product not found',
            })
            return
          }

          const updatedProduct = {
            ...product,
            id: productId,
          }

          products[index] = updatedProduct

          await writeProducts(products)

          sendJson(response, 200, updatedProduct)
          return
        }

        if (request.method === 'DELETE' && productId) {
          const products = await readProducts()
          const index = products.findIndex((item) => item.id === productId)

          if (index === -1) {
            sendJson(response, 404, {
              message: 'Product not found',
            })
            return
          }

          products.splice(index, 1)

          await writeProducts(products)

          response.statusCode = 204
          response.end()
          return
        }

        sendJson(response, 405, {
          message: 'Method not allowed',
        })
      } catch (error) {
        console.error('Products API error:', error)

        sendJson(response, 500, {
          message: 'Failed to process products request',
        })
      }
    })
  },
})
