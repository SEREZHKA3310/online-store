import { useContext, useMemo } from "react"
import useProducts from "../../hooks/useProducts"
import AppLink from "../../ui/AppLink/AppLink"
import Counter from "../../ui/Counter/Counter"
import { CartContext } from "../../context/CartContext"
import styles from './style.module.css'
import Field from "../../ui/Field/Field"
import Button from "../../ui/Button/Button"

const Cart = () => {
  const { cart } = useContext(CartContext)

  const { products } = useProducts()

  const clothes = useMemo(() => {
    const cartIds = new Set(cart.map(item => item.id))
    return products.filter(product => cartIds.has(product.id))
  }, [cart, products])

  const priceResult = clothes.reduce((acc, {price}) => acc + price, 0)
  const priceDelivery = Math.min(500, priceResult * 1000 / 10)

  return (
    <div className={`container ${styles.cart_wrapper}`}>
      { clothes.length ?
        <>
          <div>
            {clothes.map((cloth) =>
              <div key={cloth.id} className={styles.info_wrapper}>
                <div>
                  <AppLink to={`/product/${String(cloth.id)}`}>
                    <div className={styles.image_wrapper}>
                      <img src={cloth.mainImage} alt={cloth.name} className={styles.image} />
                    </div>
                  </AppLink>
                </div>
                <div className={styles.desc_wrapper}>
                  <div>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={`${styles.info} ${styles.name}`}>{cloth.name}</p>
                    </AppLink>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={styles.info}>₽{cloth.price}</p>
                    </AppLink>
                  </div>
                  <div>
                    <Counter clothesId={cloth.id} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.total_wrapper}>
            <p className={styles.total_text}>Сводка заказа</p>
            <ul>
              <li>
                <p className={styles.total_info}>Промежуточный заказ</p><p>₽{priceResult}</p>
              </li>
              <li>
                <p className={styles.total_info}>Доставка</p><p>₽{priceDelivery}</p>
              </li>
              <li>
                <p className={styles.total_info}>Предполагаемый налог</p><p>₽0</p>
              </li>
              <li>
                <p className={styles.total_info}>Итого</p><p>₽{priceResult + priceDelivery / 1000}</p>
              </li>
            </ul>
            <AppLink to='' className="link_result">Перейти к оформлению заказа</AppLink>
            <div className={styles.promocode}>
              <p>Есть промокод?</p>
              <Field type="text" label="Введите код" name="promocode" className="input_code" />
              <Button type="button" className="button_click">Применить</Button>
            </div>
          </div>
        </>
      :
        <div>Корзина пуста</div>
      }
    </div>
  )
}

export default Cart