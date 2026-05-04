import useLocalStorage from "./useLocalStorage"

import type { ProductInfo } from "../api/fetchProduct"

export type Cart = Array<ProductInfo & {count: number, size: string, price: number}>

const useCart = () => {
  const [cart, setItem] = useLocalStorage<Cart>('cart', [])

  const setCart = (value: Cart) => {
    setItem(value)
  }

  const addToCart = (newCloth: Cart[0]) => {
    if (cart.some(cloth => cloth.id === newCloth.id && cloth.size === newCloth.size)) return;
    setCart([...cart, newCloth]);
  };

  const deleteCloth = (productId: number, productSize: string) => {
    const filteredBasket = cart.filter(({ id, size }) => productId !== id || size !== productSize);
    
    setCart(filteredBasket);
  };

  return {
    cart: cart || [],
    setCart,
    addToCart,
    deleteCloth
  }
}

export default useCart