import { useState, useEffect, useCallback } from 'react'

interface UseScrollSpyOptions {
  sectionIds: string[]
  offset?: number
  throttleMs?: number
}

interface UseScrollSpyReturn {
  activeSection: string
}

export const useScrollSpy = ({ 
  sectionIds, 
  offset = 100, 
  throttleMs = 100 
}: UseScrollSpyOptions): UseScrollSpyReturn => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '')

  const updateActiveSection = useCallback(() => {
    // Get all sections
    const sections = sectionIds
      .map(id => ({
        id,
        element: document.getElementById(id)
      }))
      .filter(section => section.element !== null)

    if (sections.length === 0) return

    // Get current scroll position
    const scrollPosition = window.scrollY + offset

    // Find the section that's currently in view
    let currentSection = sections[0].id

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const element = section.element!
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementBottom = elementTop + rect.height

      // Check if the scroll position is within this section
      if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
        currentSection = section.id
        break
      }

      // Special case for the last section - if we're past all sections, 
      // the last one should be active
      if (i === sections.length - 1 && scrollPosition >= elementTop) {
        currentSection = section.id
      }
    }

    // Handle edge case: if we're at the very top of the page, 
    // make sure the first section is active
    if (window.scrollY < 50) {
      currentSection = sections[0].id
    }

    setActiveSection(currentSection)
  }, [sectionIds, offset])

  // Throttle function to limit how often we update
  const throttle = useCallback((func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0
    
    return () => {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func()
        lastExecTime = currentTime
      } else {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func()
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }, [])

  useEffect(() => {
    // Create throttled version of updateActiveSection
    const throttledUpdate = throttle(updateActiveSection, throttleMs)

    // Set initial active section
    updateActiveSection()

    // Add scroll listener
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [updateActiveSection, throttle, throttleMs])

  return { activeSection }
}