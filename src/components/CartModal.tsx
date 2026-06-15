import { MessageCircle, ShoppingBag, X } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/currency'
import { openWhatsAppForCart } from '../utils/whatsapp'
import { CartItemRow } from './CartItemRow'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart()

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCheckout = () => {
    openWhatsAppForCart(items)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand" aria-hidden="true" />
            <h2 id="cart-title" className="text-lg font-bold text-gray-900">
              Meu Carrinho
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300" aria-hidden="true" />
            <p className="text-base font-medium text-gray-900">
              Seu carrinho está vazio
            </p>
            <p className="text-sm text-gray-500">
              Adicione produtos para finalizar seu pedido pelo WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>

            <div className="border-t border-gray-200 px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Total do pedido</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Finalizar Pedido
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Limpar carrinho
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
