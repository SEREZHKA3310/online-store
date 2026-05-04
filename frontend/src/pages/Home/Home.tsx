import styles from './style.module.css'

import CategoryCard from '../../ui/CategoryCard/CategoryCard'
import ProductListPage from '../../ui/ProductListPage/ProductListPage'
import ImageMan from '../../../public/man.png'
import ImageWoman from '../../../public/woman.png'

const Home = () => {
  return (
    <div className='container'>
      <div className='header_text'>
        <q>изучай и развивайся</q>
      </div>
      <div className={styles.catalog_card}>
        <CategoryCard
          title='Мужская мода'
          description='Собрали идеи образов, которые помогут выглядеть стильно и современно'
          src={ImageMan}
          hasLink={true}
        />
        <CategoryCard
          title='Женская мода'
          description='Главные тренды женской моды'
          src={ImageWoman}
          hasLink={true}
        />
      </div>
      <ProductListPage pageSize={6} />
    </div>
  )
}

export default Home
