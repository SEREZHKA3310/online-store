import { Suspense } from 'react'

import { ProductList } from '~components'

import classes from './styles.module.css'


const Catalog = () => {
  return (
    <div className={classes.container}>
      <div className='header_text'>
        <q>каталог</q>
      </div>
      <Suspense>
        <ProductList type='infinity' />
      </Suspense>
    </div>
  )
}

export default Catalog