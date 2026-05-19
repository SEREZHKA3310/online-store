import { useContext, useMemo, useState } from "react";
import AppLink from "../../ui/AppLink/AppLink";
import Counter from "../../ui/Counter/Counter";
import { CartContext } from "../../context/CartContext";
import Field from "../../ui/Field/Field";
import Button from "../../ui/Button/Button";

import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useHuiks from "../../hooks/useHuiks";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [pay, setPay] = useState<"sbp" | "card" | "cash">("sbp");

  const priceResult = useMemo(
    () => cart.reduce((acc, { price, count }) => acc + price * count, 0),
    [cart],
  );

  const mutate = useHuiks();
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(1);
    e.preventDefault();
    const newId = await mutate(pay);
    nav(`/orders/${newId.data.id}`);
  };

  return (
    <div className={`container ${classes.cart_wrapper}`}>
      {cart.length ? (
        <>
          <div>
            {cart.map((cloth, index) => (
              <div key={index} className={classes.info_wrapper}>
                <div>
                  <AppLink to={`/product/${String(cloth.id)}`}>
                    <div className={classes.image_wrapper}>
                      <img
                        src={cloth.main_image}
                        alt={cloth.name}
                        className={classes.image}
                      />
                    </div>
                  </AppLink>
                </div>
                <div className={classes.desc_wrapper}>
                  <div>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={`${classes.info} ${classes.name}`}>
                        {cloth.name}
                      </p>
                    </AppLink>
                    <AppLink to={`/product/${String(cloth.id)}`}>
                      <p className={classes.info}>
                        ₽{cloth.price * cloth.count}
                      </p>
                    </AppLink>
                    <p className={classes.info}>size:{cloth.size}</p>
                  </div>
                  <div>
                    <Counter clothesId={cloth.id} clothesSize={cloth.size} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <p className={classes.header_text}>Оформление заказа</p>
            <p>'Итоговая стоимость: '{priceResult}</p>
            <input
              className={classes.form_input}
              type="text"
              name="adress"
              placeholder="адрес доставки"
            />
            <input type="button" onClick={() => setPay("sbp")} />
            <input type="button" onClick={() => setPay("card")} />
            <Button className="button_click" type="submit">
              Перейти к оформлению
            </Button>
          </form>
        </>
      ) : (
        <div>Корзина пуста</div>
      )}
    </div>
  );
};

export default Cart;
