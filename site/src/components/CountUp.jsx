import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const { ref, inView }   = useInView({ threshold: 0.3, triggerOnce: true })
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const start     = performance.now()
    const startVal  = 0

    function tick(now) {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(startVal + (end - startVal) * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [inView, end, duration])

  return <span ref={ref}>{value}{suffix}</span>
}
