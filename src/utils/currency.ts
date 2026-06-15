export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function calculateCartTotal(
  items: { product: { price: number }; quantity: number }[],
): number {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
}

export function calculateItemCount(
  items: { quantity: number }[],
): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}
