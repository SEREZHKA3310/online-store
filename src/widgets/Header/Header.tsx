import styles from './style.module.css';

import { Link } from 'react-router-dom';

import NavBar from "../../ui/NavBar/NavBar"
import BasketSvg from "../../assets/svg/basket.svg?react"
import SearchSvg from "../../assets/svg/search.svg?react"
import ProfileSvg from '../../assets/svg/profile.svg?react'
import LogoSvg from "../../assets/svg/photochrom.svg?react"
import Icon from "../../ui/Icon/Icon"

const Header = () => {
  return (
    <header className={styles.header_wrapper}>
      <div className={`container ${styles.header_content}`}>
        <Link to={''}><Icon Svg={LogoSvg} width={180} height={20} label={'Логотип'} /></Link>
        <NavBar />
        <div className={styles.logo_container}>
          <Link to={''}><Icon Svg={SearchSvg} width={25} height={25} label={'Поиск'} /></Link>
          <Link to={''}><Icon Svg={ProfileSvg} width={25} height={25} label={'Профиль'} /></Link>
          <Link to={'cart'}><Icon Svg={BasketSvg} width={25} height={25} label={'Логотип'} /></Link>
        </div>
      </div>
  </header>
  )
}

export default Header