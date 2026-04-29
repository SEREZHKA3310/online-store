import useProducts from '../../hooks/useProducts'
import ProductCard from '../ProductCard/ProductCard'

interface ProductListContentProps {
  pageSize: number;
  isCatalog?: boolean
}

const ProductListContent = () => {
  const data = useProducts()

  return (
    <>
      {
        (data.pages.map((page) => page.results.map((product) => 
          <ProductCard id={product.id} key={product.id} name={product.name} main_image={product.main_image} price={product.price} />
        )))
      }
      {/* <button onClick={() => setPage(1)}>1</button>
      <button onClick={() => setPage(2)}>2</button> */}
    </>
  )
}

export default ProductListContent