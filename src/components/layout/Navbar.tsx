import { useState, useEffect } from 'react'
// import ThemeToggle from '../ui/ThemeToggle'
import React from 'react'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Expertise' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.navbar')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <nav 
      className="navbar fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 z-50 transition-colors duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Professional Logo Branding */}
          <div className="flex items-center space-x-2">
  <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-2 py-0.5 rounded text-xl font-black">
    W
  </div>
  <span className="font-bold text-xl tracking-tighter dark:text-white">
    WALID
  </span>
</div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-1" role="menubar">
              {navigationItems.map((item) => (
                <li key={item.id} role="none">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    role="menuitem"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle and Mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* <ThemeToggle /> */}
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Mobile Navigation Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 border-t border-gray-100 dark:border-gray-800' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
        id="mobile-menu"
      >
        <ul className="px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-gray-900 transition-colors">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar