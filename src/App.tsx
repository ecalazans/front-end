import { useState } from "react";
import { CartModal } from "./components/CartModal";
import { CategoryFilter } from "./components/CategoryFilter";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductGrid } from "./components/ProductGrid";
import { useCart } from "./hooks/useCart";
import { useProducts } from "./hooks/useProducts";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount, addItem } = useCart();
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={itemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-brand to-brand-dark px-6 py-10 text-white sm:px-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/80">
            Catálogo Online
          </p>
          <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
            Camisas de time, regatas NBA e kits infantis
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/90 sm:text-base">
            Escolha seus produtos, monte o carrinho e finalize seu pedido
            diretamente pelo WhatsApp.
          </p>
        </section>

        <section className="mb-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onAddToCart={addItem}
        />
      </main>

      <Footer />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
