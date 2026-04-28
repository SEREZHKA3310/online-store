import styles from './style.module.css'
import TrashCanSvg from '../../assets/svg/trashCan.svg?react'
import { CartContext } from "../../context/CartContext"
import { useContext } from 'react'

interface CounterProps {
  clothesId: number,
}

const Counter = ({clothesId}: CounterProps) => {
  const { cart, setCart, deleteCloth } = useContext(CartContext)

  const incCount = () => {
    const newcart = cart.map((item) => 
      item.id === clothesId ? { ...item, count: item.count + 1 } : item
    );
    setCart(newcart);
  }

  const decCount = () => {
    const newcart = cart.map((item) => 
      item.id === clothesId ? { ...item, count: item.count - 1 } : item
    ).filter(item => item.count > 0);
    
    setCart(newcart);
  }

  return (
    <div className={styles.block_container}>
      <div className={styles.block_wrapper}>
        <button className={styles.block} onClick={decCount}>-</button>
        <p className={styles.block}>{cart.find(({id}) => clothesId === id)
          ?.count}
        </p>
        <button className={styles.block} onClick={incCount}>+</button>
      </div>
      <button className={styles.trash_button} onClick={() => deleteCloth(clothesId)}>
        <TrashCanSvg />
      </button>
    </div>
  )
}

export default Counter