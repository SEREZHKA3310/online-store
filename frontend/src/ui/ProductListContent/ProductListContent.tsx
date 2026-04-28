import useProducts from '../../hooks/useProducts'
import ProductCard from '../ProductCard/ProductCard'

interface ProductListContentProps {
  pageSize: number;
  isCatalog?: boolean
}

const ProductListContent = ({pageSize, isCatalog = false}: ProductListContentProps) => {
  const {products, setPage} = useProducts(pageSize, isCatalog)
  
  return (
    <>
      {
        (products?.map((product) =>
          <ProductCard id={product.id} key={product.id} name={product.name} mainImage={product.mainImage} price={product.price} />
        ))
      }
      <button onClick={() => setPage(1)}>1</button>
      <button onClick={() => setPage(2)}>2</button>
    </>
  )
}

export default ProductListContent