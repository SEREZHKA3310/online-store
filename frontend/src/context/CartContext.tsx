import { createContext, type ReactNode } from "react"
import useCart from "../hooks/useCart"
import type { Cart } from "../hooks/useCart"

interface CartContextProps {
  children: ReactNode
}

interface CartContextType {
  cart: Cart;
  setCart: (value: Cart) => void;
  addToCart: (newCloth: Cart[0]) => void;
  deleteCloth: (productId: number, productSize: string) => void;
}

export const CartContext = createContext<CartContextType>({})

const CartProvider = ({children}: CartContextProps) => {
  const {
    cart,
    setCart,
    addToCart,
    deleteCloth
  } = useCart()

  return (
    <CartContext.Provider
      value={{
        cart: cart || [],
        setCart,
        addToCart,
        deleteCloth
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider