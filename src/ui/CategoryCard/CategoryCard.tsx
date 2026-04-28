import AppLink from "../AppLink/AppLink"
import styles from "./style.module.css"

interface CategoryCardProps {
  title: string,
  description: string,
  src: string,
  hasLink?: boolean
}

const CategoryCard = ({src, title, description, hasLink = false}: CategoryCardProps) => {
  return (
    <div className={styles.catalog_card}>
        <img src={src} alt={src} className={styles.catalog_image} width={780} height={300} />
      <div>
        <h3 className={styles.catalog_header}>{title}</h3>
        <p className={styles.catalog_description}>{description}</p>
      </div>
      {hasLink ? <AppLink to='catalog/' className="button_black">Перейти к каталогу</AppLink> : null }
    </div>
  )
}

export default CategoryCard