import type { Product } from '../types'
import productsMock from './mock/products.json'

const MOCK_DELAY_MS = 400

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.name === 'string' &&
    typeof record.description === 'string' &&
    typeof record.price === 'number' &&
    typeof record.imageUrl === 'string' &&
    typeof record.category === 'string'
  )
}

function parseProducts(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid products payload: expected an array')
  }

  const products = data.filter(isProduct)

  if (products.length !== data.length) {
    throw new Error('Invalid products payload: malformed product entries')
  }

  return products
}

const products = parseProducts(productsMock)

/**
 * Simulates fetching products from Google Sheets API.
 * Replace the mock import with a fetch call when the API is ready.
 */
export async function fetchProducts(): Promise<Product[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, MOCK_DELAY_MS)
  })

  return [...products]
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  const allProducts = await fetchProducts()
  return allProducts.find((product) => product.id === id)
}
