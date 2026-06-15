import { MessageCircle, ShoppingBag } from 'lucide-react'
import type { Product } from '../types'
import { formatPrice } from '../utils/currency'
import { openWhatsAppForProduct } from '../utils/whatsapp'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        </div>

        <p className="text-xl font-bold text-brand">{formatPrice(product.price)}</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-brand hover:text-brand"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Adicionar
          </button>

          <button
            type="button"
            onClick={() => openWhatsAppForProduct(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-whatsapp-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Comprar Agora
          </button>
        </div>
      </div>
    </article>
  )
}
