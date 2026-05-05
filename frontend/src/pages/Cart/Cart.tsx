import { useContext, useMemo } from "react";
import AppLink from "../../ui/AppLink/AppLink";
import Counter from "../../ui/Counter/Counter";
import { CartContext } from "../../context/CartContext";
import styles from "./style.module.css";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const priceResult = useMemo(
    () => cart.reduce((acc, { price, count }) => acc + price * count, 0),
    [cart],
  );

  const priceDelivery = Math.min(500, priceResult);
  return (
    <div className={`container ${styles.cart_wrapper}`}>
      {cart.length ? (
        <>
          <div>
            {cart.map((cloth, index) => (
              <div key={index} className={styles.info_wrapper}>
                <div>
                  <AppLink to={`/product/${String(cloth.id)}`}>
                    <div className={styles.image_wrapper}>
                      <img
                        src={cloth.main_image}
                        alt={cloth.name}
                        className={styles.image}
                      />
                    </div>
                  </AppLink>
                </div>
                <div className={styles.desc_wrapper}>
                  <div>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={`${styles.info} ${styles.name}`}>
                        {cloth.name}
                      </p>
                    </AppLink>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={styles.info}>
                        ₽{cloth.price * cloth.count}
                      </p>
                    </AppLink>
                    <p className={styles.info}>size:{cloth.size}</p>
                  </div>
                  <div>
                    <Counter clothesId={cloth.id} clothesSize={cloth.size} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.total_wrapper}>
            <p className={styles.total_text}>Сводка заказа</p>
            <ul>
              <li>
                <p className={styles.total_info}>Промежуточный заказ</p>
                <p>₽{priceResult}</p>
              </li>
              <li>
                <p className={styles.total_info}>Доставка</p>
                <p>₽{priceDelivery}</p>
              </li>
              <li>
                <p className={styles.total_info}>Предполагаемый налог</p>
                <p>₽0</p>
              </li>
              <li>
                <p className={styles.total_info}>Итого</p>
                <p>₽{priceResult + priceDelivery}</p>
              </li>
            </ul>
            <AppLink to="" className="link_result">
              Перейти к оформлению заказа
            </AppLink>
            <div className={styles.promocode}>
              <p>Есть промокод?</p>
              <Field
                type="text"
                label="Введите код"
                name="promocode"
                className="input_code"
              />
              <Button type="button" className="button_click">
                Применить
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div>Корзина пуста</div>
      )}
    </div>
  );
};

export default Cart;
