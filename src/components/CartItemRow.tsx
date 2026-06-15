import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem } from '../types'
import { formatPrice } from '../utils/currency'

interface CartItemRowProps {
  item: CartItem
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
  onRemove: (productId: string) => void
}

export function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity } = item
  const subtotal = product.price * quantity

  return (
    <li className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-gray-900">
              {product.name}
            </h4>
            <p className="text-xs text-gray-500">
              {formatPrice(product.price)} cada
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remover ${product.name} do carrinho`}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onDecrease(product.id)}
              aria-label={`Diminuir quantidade de ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <span className="min-w-6 text-center text-sm font-medium text-gray-900">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => onIncrease(product.id)}
              aria-label={`Aumentar quantidade de ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm font-semibold text-gray-900">
            {formatPrice(subtotal)}
          </p>
        </div>
      </div>
    </li>
  )
}
