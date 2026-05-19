import { useParams } from "react-router-dom";

import Button from "../../ui/Button/Button";
import useOrderStatus from "../../hooks/useOrderStatus";
import useCancelOrder from "../../hooks/useCancelOrder";

import classes from "./styles.module.css";

const OrderStatus = () => {
  const { id } = useParams();

  const orderId = Number(id);
  const order = useOrderStatus(orderId);
  const { cancelOrder, isCancelPending } = useCancelOrder(orderId);

  if (!order) {
    return (
      <div className="container">
        <p className={classes.loading}>Загрузка заказа...</p>
      </div>
    );
  }

  const canCancel =
    order.status !== "cancelled" && order.status !== "delivered";

  return (
    <div className="container">
      <div className={classes.order}>
        <div className={classes.header}>
          <div>
            <p className={classes.label}>Статус заказа</p>
            <h1 className={classes.title}>Заказ #{order.id}</h1>
          </div>

          <span className={classes.status}>{order.status}</span>
        </div>

        <div className={classes.card}>
          <div className={classes.row}>
            <span>Метод оплаты</span>
            <b>{order.payment}</b>
          </div>

          <div className={classes.row}>
            <span>Стоимость</span>
            <b>{Number(order.total_price).toFixed(2)} ₽</b>
          </div>

          <div className={classes.row}>
            <span>Количество товаров</span>
            <b>{order.items.length}</b>
          </div>
        </div>

        {canCancel && (
          <button
            className="button_click"
            type="button"
            onClick={() => cancelOrder()}
            disabled={isCancelPending}
          >
            {isCancelPending ? "Отмена..." : "Отменить заказ"}
          </button>
        )}

        <h2 className={classes.subtitle}>Товары в заказе</h2>

        <div className={classes.items}>
          {order.items.map((item) => (
            <div className={classes.item} key={`${item.id}-${item.size}`}>
              {item.main_image && (
                <img
                  className={classes.image}
                  src={item.main_image}
                  alt={item.name}
                />
              )}

              <div className={classes.itemInfo}>
                <h3 className={classes.itemTitle}>{item.name}</h3>

                <div className={classes.itemRows}>
                  <p>
                    <b>ID товара:</b> {item.id}
                  </p>

                  <p>
                    <b>Размер:</b> {item.size}
                  </p>

                  <p>
                    <b>Количество:</b> {item.count}
                  </p>

                  <p>
                    <b>Цена:</b> {Number(item.price).toFixed(2)} ₽
                  </p>

                  <p>
                    <b>Сумма:</b>{" "}
                    {(Number(item.price) * item.count).toFixed(2)} ₽
                  </p>
                </div>

                {item.description?.length > 0 && (
                  <ul className={classes.description}>
                    {item.description.map((text, index) => (
                      <li key={index}>{text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;