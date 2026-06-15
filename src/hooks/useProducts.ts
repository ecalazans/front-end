import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../services/api'
import type { Product } from '../types'

interface UseProductsReturn {
  products: Product[]
  filteredProducts: Product[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  isLoading: boolean
  error: string | null
  categories: string[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchProducts()

        if (isMounted) {
          setProducts(data)
        }
      } catch {
        if (isMounted) {
          setError('Não foi possível carregar os produtos. Tente novamente.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((product) => product.category))
    return Array.from(uniqueCategories).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory

      if (!matchesCategory) return false

      if (normalizedQuery === '') return true

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [products, searchQuery, selectedCategory])

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleSetSelectedCategory = useCallback((category: string | null) => {
    setSelectedCategory(category)
  }, [])

  return {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    isLoading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory: handleSetSelectedCategory,
  }
}
