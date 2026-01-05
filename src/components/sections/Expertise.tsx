import React from 'react';

const Expertise: React.FC = () => {
  const skills = [
    {
      title: "Frontend Architecture",
      icon: "🎨",
      color: "blue",
      description: "Building responsive, high-performance UIs using React and Tailwind CSS. Expert in state management and dynamic data visualization.",
      tech: ['React', 'Next.js', 'Tailwind', 'Recharts']
    },
    {
      title: "Backend & Security",
      icon: "⚙️",
      color: "green",
      description: "Developing secure REST APIs with Node.js and Express. Specialized in JWT authentication, role-based access control, and Stripe integration.",
      tech: ['Node.js', 'Express', 'JWT', 'MongoDB']
    },
    {
      title: "DevOps & Cloud",
      icon: "🚀",
      color: "purple",
      description: "Managing cloud infrastructure and deployment pipelines. Skilled in Firebase, Vercel, and version control using Git/GitHub.",
      tech: ['Firebase', 'Git', 'Vercel', 'Netlify']
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specializing in building scalable, full-stack applications with a focus on 
            performance, security, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors duration-300"
            >
              <div className="mb-4 text-3xl">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tech.map(t => (
                  <span 
                    key={t} 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
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