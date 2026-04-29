import ProductListContent from '../ProductListContent/ProductListContent'
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
        <ProductListContent />
      </Suspense>
    </div>
  )
}

export default ProductListPage