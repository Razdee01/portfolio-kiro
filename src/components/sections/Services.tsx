import React from 'react'
import RevealOnScroll from '../ui/RevealOnScroll'

interface Service {
  id: string
  title: string
  icon: string
  description: string
  features: string[]
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 'ui-design',
      title: 'UI/UX Design',
      icon: '🎨',
      description: 'Creating intuitive and visually appealing user interfaces that enhance user experience.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design Systems',
        'Usability Testing'
      ]
    },
    {
      id: 'web-development',
      title: 'Web Development',
      icon: '💻',
      description: 'Building responsive and performant web applications using modern technologies.',
      features: [
        'React & TypeScript',
        'Responsive Design',
        'Performance Optimization',
        'Cross-browser Compatibility'
      ]
    },
    {
      id: 'mobile-design',
      title: 'Mobile Design',
      icon: '📱',
      description: 'Designing mobile-first experiences that work seamlessly across all devices.',
      features: [
        'iOS & Android Design',
        'Progressive Web Apps',
        'Touch-friendly Interfaces',
        'Mobile Optimization'
      ]
    },
    {
      id: 'branding',
      title: 'Brand Identity',
      icon: '✨',
      description: 'Developing cohesive brand identities that communicate your unique value proposition.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Color Palettes',
        'Typography Systems'
      ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I offer a comprehensive range of design and development services to help 
              bring your digital vision to life.
            </p>
          </div>
        </RevealOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service.id}
              direction="up"
              delay={0.1 * (index + 1)}
              threshold={0.2}
              once={true}
            >
              <div className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 card-hover">
                {/* Service Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-500 dark:text-gray-500 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 group-hover:bg-blue-600 transition-colors duration-300"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Call to Action */}
        <RevealOnScroll direction="up" delay={0.6}>
          <div className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to start your next project?
            </p>
            <button
              onClick={() => {
                window.location.hash = 'contact'
              }}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 glow-effect focus-ring"
            >
              Let's Work Together
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default Services