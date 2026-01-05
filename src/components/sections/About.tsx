import React from 'react'
import RevealOnScroll from '../ui/RevealOnScroll'


const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get to know the person behind the code - my journey, interests, and what drives my passion for creating digital experiences.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
<RevealOnScroll direction="left" delay={0.2}>
<div className="flex justify-center lg:justify-start">
<div className="relative group">
  {/* Profile Image Container */}
  <div className="w-80 h-80 bg-linear-to-br from-blue-600 to-cyan-400 rounded-3xl p-1.5 shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/20">
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-[1.4rem] overflow-hidden flex items-end justify-center">
      <img 
        src="/assets/profile.png" 
        alt="Walid Rahman Rajdee"
        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal contrast-[1.02]"
      />
    </div>
  </div>

  {/* Floating Logo 1: React (Top Right) */}
  <div className="absolute -top-6 -right-6 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border border-blue-100 dark:border-blue-900/30 animate-bounce-slow">
    <svg className="w-10 h-10 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
      <g stroke="currentColor" strokeWidth="1">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  </div>

  {/* Floating Logo 2: MongoDB (Bottom Left) */}
  <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center border border-green-100 dark:border-green-900/30 animate-float">
    <svg className="w-8 h-8 text-[#47A248]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1.5c.3 0 .5.1.7.2 2.1 1.1 4.2 2.5 5.8 4.3 1.1 1.3 1.9 2.7 2.4 4.1.6 1.8.7 3.6.4 5.4-.4 2.8-1.9 5.3-4 7.1-.6.5-1.2.9-1.9 1.2-.4.2-.8.3-1.2.3-.6 0-1.1-.3-1.5-.7-.4-.4-.6-.9-.6-1.5 0-.5.2-.9.5-1.2.3-.3.6-.5.9-.6 1.2-.4 2.1-1.1 2.7-2.1.6-.9.8-2 .7-3.2-.1-1-.4-2-.9-2.9-.5-.9-1.2-1.7-2.1-2.4-1.2-.9-2.6-1.5-4.1-1.7-.5-.1-.9-.2-1.4-.2-1.1 0-2.2.3-3.2.8-1 .5-1.9 1.2-2.5 2.1-.7.9-.9 1.9-.9 2.9 0 1 .3 1.9.8 2.8.5.8 1.1 1.5 2 2 1.3.8 2.8 1.1 4.3 1 1 0 2-.3 2.9-.8.4-.2.8-.2 1.2-.1.4.1.7.4.9.8.2.4.3.8.2 1.2s-.4.7-.8.9c-1.2.6-2.5 1-3.9 1.1-1.8.2-3.6-.1-5.3-.9-2.4-1.1-4.2-3.2-5.1-5.7-.6-1.7-.8-3.5-.5-5.3.3-1.8.9-3.4 1.9-4.9 1.5-2.2 3.7-3.9 6.2-4.9.8-.3 1.7-.5 2.5-.5z"/>
    </svg>
  </div>
</div>
</div>
</RevealOnScroll>
          {/* About Content */}
          <div className="space-y-8">
            {/* Programming Journey */}
            <RevealOnScroll direction="right" delay={0.3}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-blue-600 mr-3" role="img" aria-label="Computer programming">💻</span>
                  My Programming Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  I started my programming journey because I was fascinated by how the web works. The idea that code could create 
                  interactive experiences and solve real problems captivated me from the beginning. I've spent my time mastering 
                  JavaScript and React to build projects that solve real-world problems, constantly learning and growing with each 
                  new challenge I encounter.
                </p>
              </div>
            </RevealOnScroll>

            {/* Work Interests */}
            <RevealOnScroll direction="right" delay={0.4}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-purple-600 mr-3" role="img" aria-label="Target and goals">🎯</span>
                  Work I Enjoy
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  I love building responsive UIs and working on the logic that makes websites interactive. There's something incredibly 
                  satisfying about crafting user interfaces that not only look great but also provide seamless, intuitive experiences. 
                  My passion lies in:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Creating responsive and mobile-first designs
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Building interactive features with JavaScript and React
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Solving complex frontend logic challenges
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Optimizing user experience and performance
                  </li>
                </ul>
              </div>
            </RevealOnScroll>

            {/* Hobbies */}
            <RevealOnScroll direction="right" delay={0.5}>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <span className="text-green-600 mr-3" role="img" aria-label="Cricket sport">🏏</span>
                  My Hobby
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  I am a big fan of playing cricket, which helps me stay active and teaches me about teamwork. Cricket has taught me 
                  valuable lessons about strategy, patience, and collaboration - skills that translate perfectly into software development. 
                  Whether I'm batting, bowling, or fielding, the sport keeps me physically fit and mentally sharp.
                </p>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl" role="img" aria-label="Cricket bat and ball">🏏</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Cricket Enthusiast</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Playing cricket teaches me teamwork, strategy, and perseverance - qualities I bring to every coding project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Fun Facts */}
        <RevealOnScroll direction="up" delay={0.6}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Fun Facts About Me
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4" role="img" aria-label="Cricket sport">🏏</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cricket Player</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Cricket is my passion! It keeps me active and teaches me valuable teamwork skills that I apply in development.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4" role="img" aria-label="React JavaScript library">⚛️</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">React Enthusiast</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  I love building interactive UIs with React - there's something magical about bringing designs to life with code.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                <div className="text-3xl mb-4" role="img" aria-label="Tools and problem solving">🔧</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Problem Solver</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  I'm fascinated by how the web works and love solving complex problems with clean, efficient code.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

export default About