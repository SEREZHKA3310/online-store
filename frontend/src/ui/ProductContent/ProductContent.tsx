import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProduct from "../../api/fetchProduct";
import styles from './style.module.css';
import { CartContext } from "../../context/CartContext";
import AppLink from "../AppLink/AppLink";
import fetchPrice from "../../api/fetchPrice";

const ProductContent = () => {
  const { id } = useParams();
  
  const { data: cloth } = useSuspenseQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(Number(id))
  });


  const {data: sizes} = useQuery({
    queryKey: ['product', id, 'selectedSize'],
    queryFn: () => fetchPrice(Number(id))
  })

  const [selectedSize, setSelectedSize] = useState<string>('')

  const context = useContext(CartContext);
  
  const { cart, addToCart } = context;

  const listOfCart = useMemo(() => cart.filter(({ id, }) => id === cloth.id), [cart, cloth.id]);

  if (!sizes) {
    return '67'
  }

  const price = sizes.find((size) => size.size === selectedSize)?.price

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
        <p className={styles.header_price}>{price}</p>
        
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
          <div id="" className={styles.size_buttons}>
            {typeof sizes !== 'string' && sizes.map((size, key) => 
              <button className={`${styles.size_button} ${selectedSize === size.size ? styles.active : ''}`} key={key} onClick={() => setSelectedSize(size.size)}>{size.size}</button>
            )}
          </div>
        {listOfCart.some((cloth) => cloth.size === selectedSize) ? (
          <div className={styles.counter_wrapper}>
            <AppLink to="/cart" className={styles.add_basket}>Перейти в корзину</AppLink>
          </div>
        ) : (
          <button 
            type="button"  
            className={styles.add_basket}
            onClick={() => addToCart({ ...cloth, price: sizes.find((cloth) => cloth.size === selectedSize).price , size: selectedSize, count: 1})}>
            Добавить в корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductContent;