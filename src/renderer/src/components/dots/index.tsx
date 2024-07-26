import { useEffect, useState } from 'react'

export function Dots(): string {
  const [dot, setDot] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prevDot) => (prevDot >= 3 ? 0 : prevDot + 1))
    }, 600)

    return () => clearInterval(interval)
  }, [])
  return '.'.repeat(dot)
}
