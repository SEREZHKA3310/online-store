import { ProductList } from '~components'
import SkeletonProductCard from '../SkeletonProductCard/SkeletonProductCard'
import styles from './style.module.css'

import { Suspense } from 'react'

interface ProductPageProps {
  pageSize: number;
  isCatalog?: boolean
}

const ProductListPage = ({ isCatalog = false}: ProductPageProps) => {
  return (
    <div className={styles.product_list}>
      <Suspense fallback={<SkeletonProductCard />}>
        <ProductList type='infinity' />
      </Suspense>
    </div>
  )
}

export default ProductListPage