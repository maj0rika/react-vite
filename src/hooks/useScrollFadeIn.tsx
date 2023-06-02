import { useRef, useEffect, useCallback, RefObject } from 'react'

interface ScrollFadeInResult {
  ref: RefObject<HTMLDivElement>
  style: {
    opacity: number
    transform: string | undefined
  }
}

const useScrollFadeIn = (
  direction: string,
  f_step: number,
): ScrollFadeInResult => {
  const dom = useRef<HTMLDivElement>(null)

  const handleDirection = useCallback((name: string, threshold: number) => {
    switch (name) {
      case 'up':
        return `translate3d(0, ${threshold}%, 0)`
      case 'down':
        return `translate3d(0, -${threshold}%, 0)`
      case 'left':
        return `translate3d(${threshold}%, 0, 0)`
      case 'right':
        return `translate3d(-${threshold}%, 0, 0)`
      case 'fadeOut':
        return `translate3d(0, 0, 0)`

      default:
        return `translate3d(0, ${threshold}%, 0)`
    }
  }, [])

  const handleScroll = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { current } = dom

    if (current && entry.isIntersecting) {
      current.style.transitionProperty = 'opacity, transform'
      current.style.transitionDuration = '1s'
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'
      current.style.transitionDelay = '0s'

      const ratio = entry.intersectionRatio
      const step = 1 / f_step
      const index = Math.floor(ratio / step)
      const opacity = index > step ? (index + 1) / f_step : 0

      const transform = handleDirection(
        direction,
        (50 / f_step) * (f_step - (index + 1)),
      )

      current.style.opacity = String(opacity)
      current.style.transform = transform
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const { current } = dom

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: Array.from({ length: f_step }, (_, i) => i / f_step),
      })

      observer.observe(current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [handleScroll, f_step])

  return {
    ref: dom,
    style: {
      opacity: 0,
      transform: handleDirection(direction, 0.5),
    },
  }
}

export default useScrollFadeIn
