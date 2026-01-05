import { Suspense, lazy } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { useScrollSpy } from './hooks/useScrollSpy'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Skills from './components/sections/Skills'
import Testimonials from './components/sections/Testimonials'



// Code splitting for heavy components
const About = lazy(() => import('./components/sections/About'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Contact = lazy(() => import('./components/sections/Contact'))

// Create a separate component to consume the Theme context
function AppContent() {
  // Define section IDs for scroll spy
  const sectionIds = ['hero', 'about', 'skills', 'projects', 'testimonials', 'contact']
  
  // Use scroll spy to track active section
  const { activeSection } = useScrollSpy({ 
    sectionIds,
    offset: 100, 
    throttleMs: 100 
  })

  const handleNavigate = (sectionId: string) => {
    window.location.hash = sectionId
  }

  return (
    /* FIX: Added 'min-h-screen', background colors, and text colors 
       that react to the 'dark' class on the html tag.
    */
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 custom-scrollbar">
      
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Main content sections */}
      <main className="pt-16">
        <Hero />
        
        <Suspense fallback={<div className="py-20 text-center dark:text-white">Loading About...</div>}>
          <About />
        </Suspense>

        <Skills />

        <Suspense fallback={<div className="py-20 text-center dark:text-white">Loading Projects...</div>}>
          <Projects />
        </Suspense>

        <Testimonials />

        <Suspense fallback={<div className="py-20 text-center dark:text-white">Loading Contact...</div>}>
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

// The main App component wraps everything in the Provider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App