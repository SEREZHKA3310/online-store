import { NavLink } from 'react-router-dom'
import styles from './style.module.css';
import type { ReactNode } from 'react';

interface AppLinkProps {
  to: string,
  children: string | ReactNode,
  className?: string
}

const AppLink = ({ to, children, className }: AppLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.app_link} ${isActive ? styles.is_active : ''} ${ className ? styles[className] : '' }`
      }
    >
      {children}
    </NavLink>
  )
}

export default AppLink