import Icon from "../../ui/Icon/Icon"
import Field from "../../ui/Field/Field"
import Button from "../../ui/Button/Button"
import { Link } from "react-router-dom"

import LogoSvg from "../../assets/svg/photochrom.svg?react"
import FacebookSvg from "../../assets/svg/facebook.svg?react"
import InstagramSvg from "../../assets/svg/instagram.svg?react"
import XSvg from "../../assets/svg/x.svg?react" 
import styles from './style.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer_wrapper}>
      <div className={`container ${styles.footer_content}`}>
        <div className={styles.social_media}>
          <Link to={''}><Icon Svg={LogoSvg} width={260} height={26} label={'Логотип'} /></Link>
          <ul className={styles.logo_container}>
            <li><Link to={''}><Icon Svg={FacebookSvg} width={22} height={22} label={'Ссылка facebook'} /></Link></li>
            <li><Link to={''}><Icon Svg={InstagramSvg} width={25} height={25} label={'Ссылка instagram'} /></Link></li>
            <li><Link to={''}><Icon Svg={XSvg} width={21} height={21} label={'Ссылка X'} /></Link></li>
          </ul>
        </div>
        <div className={styles.local_navigation}>
          <ul className={styles.navigation}>
            <li><Link to={''}>Магазин</Link></li>
            <li><Link to={''}>Новые поступления</Link></li>
            <li><Link to={''}>Хиты продаж</Link></li>
            <li><Link to={''}>Распродажа</Link></li>
          </ul>
          <ul className={styles.navigation}>
            <li><Link to={''}>О нас</Link></li>
            <li><Link to={''}>Наша история</Link></li>
            <li><Link to={''}>Устойчивое развитие</Link></li>
            <li><Link to={''}>Карьера</Link></li>
          </ul>
          <form onSubmit={(ev) => ev.preventDefault()}>
            <fieldset>
              <legend className="visually-hidden">Подписка</legend>
              <div className={styles.navigation}>
                <h3>Подпишитесь на нашу рассылку</h3>
                <p>Будьте в курсе наших последних релизов и предложений.</p>
                <div>
                  <Field 
                    type="email" 
                    label="Введите ваш email" 
                    name="email" 
                    className="input_email" 
                  />
                  <Button type="submit" className="button_follow">
                    Подписаться
                  </Button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer