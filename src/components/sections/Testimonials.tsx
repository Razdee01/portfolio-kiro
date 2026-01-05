import React from 'react';

const Expertise: React.FC = () => {
  const skills = [
    {
      title: "Frontend Architecture",
      // Professional SVG Icon
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      description: "Building responsive, high-performance UIs using React and Tailwind CSS. Expert in state management and dynamic data visualization.",
      tech: ['React', 'Next.js', 'Tailwind', 'Recharts']
    },
    {
      title: "Backend & Security",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      description: "Developing secure REST APIs with Node.js and Express. Specialized in JWT authentication, role-based access control, and database design.",
      tech: ['Node.js', 'Express', 'JWT', 'MongoDB']
    },
    {
      title: "DevOps & Cloud",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: "Managing cloud infrastructure and deployment pipelines. Skilled in Firebase, Vercel, and version control using Git/GitHub.",
      tech: ['Firebase', 'Git', 'Vercel', 'Netlify']
    }
  ];

  return (
    /* Added min-h-[60vh] to ensure the section is tall enough for the Scroll Observer to detect it */
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800/50 scroll-mt-20 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Specializing in building scalable, full-stack applications with a focus on 
            performance, security, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((item, idx) => (
            <div 
              key={idx} 
              className="group p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 w-fit rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map(t => (
                  <span 
                    key={t} 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;