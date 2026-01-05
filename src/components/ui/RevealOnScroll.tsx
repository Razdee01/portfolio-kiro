import React, { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealOnScrollProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  once?: boolean
  className?: string
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  once = true,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Check if IntersectionObserver is available (for test environments)
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [once])

  // If reduced motion is preferred, don't animate
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  // Get transform values based on direction
  const getTransform = (visible: boolean) => {
    if (visible) return 'translate3d(0, 0, 0)'
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`
      case 'down':
        return `translate3d(0, -${distance}px, 0)`
      case 'left':
        return `translate3d(${distance}px, 0, 0)`
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`
      default:
        return `translate3d(0, ${distance}px, 0)`
    }
  }

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(isVisible),
    transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
    willChange: 'opacity, transform'
  }

  return (
    <div 
      ref={ref} 
      style={style}
      className={className}
    >
      {children}
    </div>
  )
}

export default RevealOnScroll