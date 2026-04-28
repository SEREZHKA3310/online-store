import styles from './style.module.css'

interface FieldProps {
  type: string,
  label: string,
  name: string,
  className?: string
}

const Field = ({type, label, name, className = ''}: FieldProps) => {
  return (
    <>
      <label htmlFor={name} className="visually-hidden">{name}</label>
      <input type={type} placeholder={label} name={name} className={className ? styles[className] : ''} id={name} />
    </>
  )
}

export default Field