import { Loader2, PackageOpen } from 'lucide-react'
import type { Product } from '../types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isLoading: boolean
  error: string | null
  onAddToCart: (product: Product) => void
}

export function ProductGrid({
  products,
  isLoading,
  error,
  onAddToCart,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-500">
        <Loader2 className="h-8 w-8 animate-spin text-brand" aria-hidden="true" />
        <p className="text-sm">Carregando produtos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
        <p className="text-sm font-medium text-red-700">{error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <PackageOpen className="h-12 w-12 text-gray-300" aria-hidden="true" />
        <p className="text-base font-medium text-gray-900">
          Nenhum produto encontrado
        </p>
        <p className="text-sm text-gray-500">
          Tente ajustar sua busca ou filtro de categoria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
