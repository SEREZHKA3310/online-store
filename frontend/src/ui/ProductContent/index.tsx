import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import fetchProduct from "../../api/fetchProduct";
import { CartContext } from "../../context/CartContext";
import AppLink from "../AppLink/AppLink";
import fetchPrice from "../../api/fetchPrice";
import { useSimilarProducts } from "~api";
import { ProductCard } from "~components";

import classes from "./styles.module.css";

const ProductContent = () => {
  const { id } = useParams();

  const { data: cloth } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(Number(id)),
  });

  const { data: sizes } = useQuery({
    queryKey: ["product", id, "selectedSize"],
    queryFn: () => fetchPrice(Number(id)),
  });

  const [selectedSize, setSelectedSize] = useState<string>("");

  const context = useContext(CartContext);

  const { cart, addToCart } = context;

  const listOfCart = useMemo(
    () => cart.filter(({ id }) => id === cloth.id),
    [cart, cloth.id],
  );

  const similars = useSimilarProducts(cloth.id);
  console.log(similars);

  if (!sizes) {
    return "67";
  }

  const price = sizes.find((size) => size.size === selectedSize)?.price;

  return (
    <div className="container">
      <div className={classes.content}>
        <div className={classes.images_container}>
          {cloth.images.map((mainImage, index) => (
            <div key={index} className={classes.image_wrapper}>
              <img className={classes.image} src={mainImage} alt={cloth.name} />
            </div>
          ))}
        </div>
        <div className={classes.product_wrapper}>
          <p className={classes.header_name}>{cloth.name}</p>
          <p className={classes.header_price}>{price}</p>

          <div className={classes.info_wrapper}>
            <div className={classes.desc_wrapper}>
              {cloth.info &&
                cloth.info.map((el, index) => <p key={index}>{el}</p>)}
            </div>
            <ul className={classes.desc_wrapper}>
              {cloth.description.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </ul>
          </div>
          <div id="" className={classes.size_buttons}>
            {typeof sizes !== "string" &&
              sizes.map((size, key) => (
                <button
                  className={`${classes.size_button} ${selectedSize === size.size ? classes.active : ""}`}
                  key={key}
                  onClick={() => setSelectedSize(size.size)}
                >
                  {size.size}
                </button>
              ))}
          </div>
          {listOfCart.some((cloth) => cloth.size === selectedSize) ? (
            <div className={classes.counter_wrapper}>
              <AppLink to="/cart" className={classes.add_basket}>
                Перейти в корзину
              </AppLink>
            </div>
          ) : (
            <button
              type="button"
              className={classes.add_basket}
              onClick={() =>
                addToCart({
                  ...cloth,
                  price: sizes.find((cloth) => cloth.size === selectedSize)
                    .price,
                  size: selectedSize,
                  count: 1,
                })
              }
            >
              Добавить в корзину
            </button>
          )}
        </div>
      </div>
      <p>Похожие товары</p>
      <div className={classes.similars}>
        {similars.map((similar) => (
          <ProductCard
            key={similar.id}
            id={similar.id}
            name={similar.name}
            main_image={similar.main_image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductContent;
