import AppLink from "../AppLink/AppLink"
import styles from './style.module.css'

const NavBar = () => {
  return (
    <ul className={styles.navbar_container}>
      <li><AppLink to={''}>Главная</AppLink></li>
      <li><AppLink to={'catalog'}>Каталог</AppLink></li>
      <li><AppLink to={'cart'}>Корзина</AppLink></li>
    </ul>
  )
}

export default NavBar