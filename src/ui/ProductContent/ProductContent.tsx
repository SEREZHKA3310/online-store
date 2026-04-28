import { useSuspenseQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import fetchProduct from "../../api/fetchProduct";
import styles from './style.module.css';
import Counter from "../Counter/Counter";
import { CartContext } from "../../context/CartContext";
import AppLink from "../AppLink/AppLink";

const ProductContent = () => {
  const { id } = useParams();
  
  const { data: cloth } = useSuspenseQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id))
  });

  const context = useContext(CartContext);
  if (!context) return null
  
  const { cart, addToCart } = context;

  if (typeof cloth === 'string') {
    return <div className="container">{cloth}</div>
  }

  const isInBasket = cart.some(({ id }) => id === cloth.id);

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.images_container}>
        {cloth.images.map((mainImage, index) => (
          <div key={index} className={styles.image_wrapper}>
            <img className={styles.image} src={mainImage} alt={cloth.name} />
          </div>
        ))}
      </div>
      
      <div className={styles.product_wrapper}>
        <p className={styles.header_name}>{cloth.name}</p>
        <p className={styles.header_price}>₽{cloth.price}</p>
        
        <div className={styles.info_wrapper}>
          <div className={styles.desc_wrapper}>
            {cloth.info.map((el, index) => (
              <p key={index}>{el}</p>
            ))}
          </div>
          <ul className={styles.desc_wrapper}>
            {cloth.description.map((el, index) => (
              <li key={index}>{el}</li>
            ))}
          </ul>
        </div>

        {isInBasket ? (
          <div className={styles.counter_wrapper}>
            <Counter clothesId={cloth.id} />
            <AppLink to="/cart" className="button_black">Перейти в корзину</AppLink>
          </div>
        ) : (
          <button 
            type="button" 
            className={styles.add_basket} 
            onClick={() => addToCart({ id: cloth.id, count: 1 })}
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductContent;