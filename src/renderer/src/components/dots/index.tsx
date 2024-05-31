import { ReactElement, useEffect, useState } from 'react'

export function Dots(): ReactElement {
  const [dot, setDot] = useState(3)
  const [increasing, setIncreasing] = useState(true)
  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prevDots) => {
        if (increasing) {
          if (prevDots < 3) {
            return prevDots + 1
          } else {
            setIncreasing(false)
            return prevDots - 1
          }
        } else {
          if (prevDots > 0) {
            return prevDots - 1
          } else {
            setIncreasing(true)
            return prevDots + 1
          }
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [increasing])
  return <>{'.'.repeat(dot)}</>
}
