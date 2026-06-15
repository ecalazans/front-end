import { Flame, Search, ShoppingCart } from 'lucide-react'
import { STORE_NAME } from '../config/constants'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  cartItemCount: number
  onCartClick: () => void
}

export function Header({
  searchQuery,
  onSearchChange,
  cartItemCount,
  onCartClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {STORE_NAME}
            </h1>
            <p className="text-xs text-gray-500">Camisas, regatas NBA e kits</p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-3 sm:max-w-xl sm:justify-end">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Abrir carrinho com ${cartItemCount} itens`}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-white">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
