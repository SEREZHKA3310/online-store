import { type FC, type SVGProps } from 'react';

interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>,
  width: number,
  height: number,
  label: string
}

const Icon = ({Svg, width, height, label}: IconProps) => {
  return (
    <span>
      <Svg width={width} height={height}/>
      <span className='visually-hidden' aria-label={label}>{label}</span>
    </span>
  )
}

export default Icon