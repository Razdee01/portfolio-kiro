import React, { useState } from 'react'
import { Project } from '../../types/project'
import { projects } from '../../data/projects'
import RevealOnScroll from '../ui/RevealOnScroll'
import ProjectModal from '../ui/ProjectModal'
import { useModal } from '../../hooks/useModal'

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { isOpen, openModal, closeModal } = useModal()
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))]
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    openModal()
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work, demonstrating expertise in modern web technologies 
              and user-centered design principles.
            </p>
          </div>
        </RevealOnScroll>

        {/* Category Filter */}
        <RevealOnScroll direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 focus-ring ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter projects by ${category === 'all' ? 'all categories' : category}`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <RevealOnScroll
              key={project.id}
              direction="up"
              delay={0.1 * (index % 3)} // Stagger animation for each row
              threshold={0.2}
              once={true}
            >
              <div className="group bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg card-hover">
             
                {/* Project Image */}
<div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
  {project.image ? (
    <img 
      src={project.image} 
      alt={project.title}
      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
      <span className="text-white text-4xl">🚀</span>
    </div>
  )}
  
  {/* Overlay on hover */}
  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
    <div className="flex gap-3">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          GitHub
        </a>
      )}
    </div>
  </div>
</div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>

                  {/* Project Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleViewDetails(project)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 focus-ring"
                    aria-label={`View details for ${project.title} project`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <RevealOnScroll direction="up" delay={0.3}>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No projects found in this category.
              </p>
            </div>
          </RevealOnScroll>
        )}

        {/* Call to Action */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Interested in working together on your next project?
            </p>
            <button
              onClick={() => {
                window.location.hash = 'contact'
              }}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 glow-effect focus-ring"
            >
              Start a Project
            </button>
          </div>
        </RevealOnScroll>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </section>
  )
}

export default Projects