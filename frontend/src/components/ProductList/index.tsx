import type { FC } from 'react';

import { Sentinel } from '~common/components';
import { ProductCard } from '~components'
import useProducts from '../../hooks/useProducts'

import classes from './styles.module.css'

interface ProductListProps {
  type: 'infinity' | 'controls'
}

const ProductList: FC<ProductListProps> = ({ type }) => {
  const { products, fetchNextPage } = useProducts()

  return (
    <>
      <div className={classes.container}>
        {products.pages.map((page) => page.results.map((product) => 
          <ProductCard id={product.id} key={product.id} name={product.name} main_image={product.main_image} price={product.price} />
        ))}
      </div>
      <Sentinel callback={fetchNextPage}/>

    </>
  )
}

export default ProductList