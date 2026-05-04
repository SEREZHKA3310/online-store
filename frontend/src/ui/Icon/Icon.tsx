import { type FC, type SVGProps } from 'react';

import styles from './Icon.module.css';

interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>,
  width: number,
  height: number,
  label: string
}

const Icon = ({Svg, width, height, label}: IconProps) => {
  return (
    <span className={styles.wrap}>
      <Svg width={width} height={height} />
      <span className="visually-hidden">{label}</span>
    </span>
  )
}

export default Icon