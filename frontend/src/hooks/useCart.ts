import useLocalStorage from "./useLocalStorage"

import type { ProductInfo } from "../api/fetchProduct"

export type Cart = Array<Pick<ProductInfo, 'id'> & {count: number}>

const useCart = () => {
  const [cart, setItem] = useLocalStorage<Cart>('cart', [])

  const setCart = (value: Cart) => {
    setItem(value)
  }

  const addToCart = (newCloth: Cart[0]) => {
    if (cart.some(cloth => cloth.id === newCloth.id)) return;
    setCart([...cart, newCloth]);
  };

  const deleteCloth = (productId: number) => {
    const filteredBasket = cart.filter(({ id }) => productId !== id);
    
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