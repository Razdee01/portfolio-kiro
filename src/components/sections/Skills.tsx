import React from 'react'
import SkillBar from '../ui/SkillBar'
import RevealOnScroll from '../ui/RevealOnScroll'

interface Skill {
  id: string
  name: string
  percentage: number
  category: 'technical' | 'soft'
}

const Skills: React.FC = () => {
  const technicalSkills: Skill[] = [
    { id: 'react', name: 'React.js', percentage: 88, category: 'technical' },
    { id: 'tailwind', name: 'Tailwind CSS & DaisyUI', percentage: 92, category: 'technical' },
    { id: 'javascript', name: 'JavaScript (ES6+)', percentage: 85, category: 'technical' },
    { id: 'mongodb', name: 'MongoDB & Firebase', percentage: 82, category: 'technical' },
    { id: 'nodejs', name: 'Node.js & Express', percentage: 75, category: 'technical' },
    { id: 'git', name: 'Git & Version Control', percentage: 80, category: 'technical' },
  ]

  const softSkills: Skill[] = [
    { id: 'communication', name: 'Communication', percentage: 95, category: 'soft' },
    { id: 'problem-solving', name: 'Problem Solving', percentage: 90, category: 'soft' },
    { id: 'creativity', name: 'Creative Thinking', percentage: 88, category: 'soft' },
    { id: 'teamwork', name: 'Team Collaboration', percentage: 92, category: 'soft' },
    { id: 'time-management', name: 'Time Management', percentage: 85, category: 'soft' },
    { id: 'adaptability', name: 'Adaptability', percentage: 87, category: 'soft' },
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A combination of technical proficiency and soft skills that enable me to 
              deliver exceptional results on every project.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <RevealOnScroll direction="left" delay={0.2}>
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">💻</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Technical Skills
                </h3>
              </div>
              
              <div className="space-y-4">
                {technicalSkills.map((skill, index) => (
                  <RevealOnScroll
                    key={skill.id}
                    direction="up"
                    delay={0.3 + (index * 0.1)}
                    threshold={0.2}
                    once={true}
                  >
                    <SkillBar
                      name={skill.name}
                      percentage={skill.percentage}
                      category={skill.category}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Soft Skills */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div>
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">🧠</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Soft Skills
                </h3>
              </div>
              
              <div className="space-y-4">
                {softSkills.map((skill, index) => (
                  <RevealOnScroll
                    key={skill.id}
                    direction="up"
                    delay={0.3 + (index * 0.1)}
                    threshold={0.2}
                    once={true}
                  >
                    <SkillBar
                      name={skill.name}
                      percentage={skill.percentage}
                      category={skill.category}
                    />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Skills Summary */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Always Learning
              </h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technology evolves rapidly, and I'm committed to continuous growth. Currently, I am deep-diving into Next.js to master Server-Side Rendering and exploring Advanced React Patterns. My goal is to build highly performant, accessible applications that provide the best possible user experience.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default Skills