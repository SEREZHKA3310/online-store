import { useEffect, useRef, type FC } from "react"

interface SentinelProps {
    callback: () => void
}

const Sentinel: FC<SentinelProps> = ({ callback }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([first]) => {
            if (first.isIntersecting) {
                console.log(1)
                callback()
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        })

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [callback])

    return <div data-testid="sentinel" style={{ height: 10, background: 'red' }} ref={ref} />
}

export default Sentinel