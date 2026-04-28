import styles from './style.module.css'

const SkeletonProductCard = () => {
  return (
    [1, 2, 3, 4, 5, 6].map((el, index) => 
      <div key={index} className={styles.card_wrapper}>
        <div className={`${styles.skeleton} ${styles.skeleton_image}`} />
        <div className={`${styles.skeleton} ${styles.skeleton_title}`} />
        <div className={`${styles.skeleton} ${styles.skeleton_text}`} />
      </div>
    )
  )
}

export default SkeletonProductCard