import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CART_STORAGE_KEY } from "../config/constants";
import type { CartContextValue, CartItem, Product } from "../types";
import { calculateCartTotal, calculateItemCount } from "../utils/currency";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;

  const record = value as Record<string, unknown>;
  const product = record.product;

  if (typeof product !== "object" || product === null) return false;

  const productRecord = product as Record<string, unknown>;

  return (
    typeof record.quantity === "number" &&
    typeof productRecord.id === "string" &&
    typeof productRecord.name === "string" &&
    typeof productRecord.description === "string" &&
    typeof productRecord.price === "number" &&
    typeof productRecord.imageUrl === "string" &&
    typeof productRecord.category === "string"
  );
}

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingIndex = currentItems.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingIndex === -1) {
        return [...currentItems, { product, quantity: 1 }];
      }

      return currentItems.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }, []);

  const increaseQuantity = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: calculateItemCount(items),
      total: calculateCartTotal(items),
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [items, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
