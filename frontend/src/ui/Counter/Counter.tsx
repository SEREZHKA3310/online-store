import styles from './style.module.css'
import TrashCanSvg from '../../assets/svg/trashCan.svg?react'
import { CartContext } from "../../context/CartContext"
import { useContext } from 'react'

interface CounterProps {
  clothesId: number,
  clothesSize: string
}

const Counter = ({clothesId, clothesSize}: CounterProps) => {
  const { cart, setCart, deleteCloth } = useContext(CartContext)

  const incCount = () => {
    const newcart = cart.map((item) =>
      item.id === clothesId && item.size === clothesSize ? { ...item, count: item.count + 1 } : item
    );
    setCart(newcart);
  }

  const decCount = () => {
    const newcart = cart.map((item) => 
      item.id === clothesId && item.size === clothesSize ? { ...item, count: item.count - 1 } : item
    ).filter(item => item.count > 0);
    
    setCart(newcart);
  }

  return (
    <div className={styles.block_container}>
      <div className={styles.block_wrapper}>
        <button className={styles.block} onClick={decCount}>-</button>
        <p className={styles.block}>{cart.find(({id, size}) => clothesId === id && clothesSize === size)
          ?.count}
        </p>
        <button className={styles.block} onClick={incCount}>+</button>
      </div>
      <button
        type="button"
        className={styles.trash_button}
        onClick={() => deleteCloth(clothesId, clothesSize)}
        aria-label="Удалить из корзины"
      >
        <span className={styles.trash_icon}>
          <TrashCanSvg width={27} height={27} />
        </span>
      </button>
    </div>
  )
}

export default Counter