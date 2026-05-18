import type { FC } from "react";
import { Link } from "react-router-dom";

import type { ProductInfo } from "../../api/fetchProduct";

import classes from "./styles.module.css";

const ProductCard: FC<Pick<ProductInfo, "id" | "name" | "main_image">> = ({
  name,
  main_image,
  id,
}) => {
  return (
    <Link to={`/product/${id}`} className={classes.container}>
      <div className={classes.image}>
        <img src={main_image} alt={name} className={classes.product_image} />
      </div>
      <p>{name}</p>
    </Link>
  );
};

export default ProductCard;
