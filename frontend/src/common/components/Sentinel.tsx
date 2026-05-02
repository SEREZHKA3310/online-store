import { useEffect, useRef, type FC } from "react"

interface SentinelProps {
    callback: () => void
}

const Sentinel: FC<SentinelProps> = ({ callback }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver()
    })
}

export default Sentinel