import styles from './style.module.css'
import AppLink from '../AppLink/AppLink'
import type { ProductInfo } from '../../api/fetchProduct'

const ProductCard = ({name, main_image, price, id}: Pick<ProductInfo, 'id' | 'name' | 'main_image' | 'price'>) => {
  return (
    <div className="card_wrapper">
      <div className={styles.image_wrapper}>
        <AppLink to={`/product/${id}`}>
          <img src={main_image} alt={name} className={styles.product_image} />
        </AppLink>
      </div>
      <p>{name}</p>
      <p>₽{price}</p>
    </div> 
  )
}

export default ProductCard