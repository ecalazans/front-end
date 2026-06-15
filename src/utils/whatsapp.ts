import { WHATSAPP_NUMBER } from '../config/constants'
import type { CartItem, Product } from '../types'
import { calculateCartTotal, formatPrice } from './currency'

function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export function buildSingleProductMessage(product: Product): string {
  return `Olá! Tenho interesse no produto: *${product.name}* (Valor: ${formatPrice(product.price)}).`
}

export function buildCartOrderMessage(items: CartItem[]): string {
  const total = calculateCartTotal(items)

  const lines = items.map(
    (item) =>
      `- ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)} cada)`,
  )

  return [
    '*Olá! Gostaria de fazer o seguinte pedido:*',
    '---------------------------------------',
    ...lines,
    '---------------------------------------',
    `*Total do Pedido:* ${formatPrice(total)}`,
  ].join('\n')
}

export function openWhatsAppForProduct(product: Product): void {
  openWhatsApp(buildSingleProductMessage(product))
}

export function openWhatsAppForCart(items: CartItem[]): void {
  if (items.length === 0) return
  openWhatsApp(buildCartOrderMessage(items))
}
