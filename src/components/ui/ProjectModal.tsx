import React, { useEffect, useRef } from 'react'
import { Project } from '../../types/project'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'hidden'
      document.documentElement.classList.add('lock-scroll')
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.classList.remove('lock-scroll')
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
      document.documentElement.classList.remove('lock-scroll')
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
        
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  if (!project || !isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Fixed Header with Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white backdrop-blur-md rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto w-full">
          {/* Project Banner Image */}
          <div className="relative h-64 md:h-96 w-full bg-gray-200 dark:bg-gray-800">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-white text-8xl">🚀</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3 inline-block">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Description & Stack */}
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-4">
                  Project Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  {project.description}
                </p>
              </section>

              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-red-500 pl-4">
                  Challenges Faced
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                      <span className="mr-3 text-red-500 font-bold">↳</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-green-500 pl-4">
                  Future Plans
                </h3>
                <ul className="space-y-3">
                  {project.futureImprovements.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-400">
                      <span className="mr-3 text-green-500 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column: Links & Technologies */}
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Project Links</h4>
                <div className="flex flex-col gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" 
                       className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold rounded-lg transition-all">
                      Live Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer"
                       className="w-full py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-center font-bold rounded-lg transition-all">
                      Source Code
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-md border border-gray-200 dark:border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal