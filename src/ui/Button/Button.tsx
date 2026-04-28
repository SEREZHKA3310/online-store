import styles from './style.module.css'

interface ButtonProps {
  type: 'submit' | 'button',
  className?: string,
  children: string
}

const Button = ({type, children, className}: ButtonProps) => {
  return (
    <button type={type} className={className ? styles[className] : ''}>{children}</button>
  )
}

export default Button