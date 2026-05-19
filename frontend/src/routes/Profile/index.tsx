import { NavLink } from "react-router-dom";

import useUser from "../../hooks/useUser";
import useUserOrders from "../../hooks/useUserOrders";

const Profile = () => {
  const data = useUser();
  const orders = useUserOrders();

  return (
    <div className="container">
      <h1>Профиль</h1>

      <p>
        <b>Пользователь:</b> {data?.username}
      </p>

      <h2>Мои заказы</h2>

      {!orders && <p>Загрузка заказов...</p>}

      {orders?.length === 0 && <p>Заказов пока нет</p>}

      {orders?.map((order) => (
        <NavLink
          key={order.id}
          to={`/orders/${order.id}`}
          style={{
            display: "block",
            padding: "16px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <p>
            <b>Заказ #{order.id}</b>
          </p>

          <p>Статус: {order.status}</p>

          <p>Оплата: {order.payment}</p>

          <p>Сумма: {Number(order.total_price).toFixed(2)} ₽</p>

          <p>Товаров: {order.items.length}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Profile;