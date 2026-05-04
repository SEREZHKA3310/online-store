import { Link } from 'react-router-dom'

import type { ProductInfo } from '../../api/fetchProduct'

import classes from './styles.module.css'

const ProductCard = ({name, main_image, id}: Pick<ProductInfo, 'id' | 'name' | 'main_image'>) => {
  return (
    <Link to={`/product/${id}`} className={classes.container}>
      <div className={classes.image}>
        <img src={main_image} alt={name} className={classes.product_image} />
      </div>
      <p>{name}</p>
      {/* <p>₽{price}</p> */}
    </Link> 
  )
}

export default ProductCard