import { Suspense } from "react";
import SkeletonProductCard from '../../ui/SkeletonProductCard/SkeletonProductCard'
import ProductContent from "../../ui/ProductContent/ProductContent";

const ProductPage = () => {
  return (
    <Suspense fallback={<SkeletonProductCard />}>
      <ProductContent />
    </Suspense>
  )
}

export default ProductPage