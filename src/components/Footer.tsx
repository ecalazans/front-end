import { STORE_NAME } from '../config/constants'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-center sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {STORE_NAME}. Todos os direitos reservados.
        </p>
        <p className="text-sm text-gray-500">
          Pedidos finalizados via WhatsApp
        </p>
      </div>
    </footer>
  )
}
