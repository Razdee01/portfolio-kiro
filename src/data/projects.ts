import { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'contesthub',
    title: 'ContestHub',
    category: 'Web Application',
    image: '/contesthub.png',
    description: 'A full-stack contest platform with role-based dashboards (User, Creator, Admin), Stripe payment integration, and a dynamic leaderboard.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Stripe', 'TanStack Query', 'JWT'],
    challenges: [
      'Implementing secure Stripe payments and synchronizing them with the database was a major challenge',
      'Setting up JWT with Axios interceptors to protect sensitive Creator and Admin routes'
    ],
    futureImprovements: [
      'Add real-time notifications for contest winners using Socket.io',
      'Implement an automated refund system for rejected contests'
    ],
    liveUrl: 'https://strong-axolotl-c79cc6.netlify.app/',
    githubUrl: 'https://github.com/Razdee01/assignment-11-client.git'
  },
  {
    id: 'studymate',
    title: 'StudyMate',
    category: 'Web Application',
    image: '/studymate.png',
    description: 'A collaborative study platform for managing assignments, featuring real-time tracking, difficulty filtering, and grading systems.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Firebase Auth', 'Tailwind CSS', 'DaisyUI'],
    challenges: [
      'Implementing the \'Upsert\' logic for assignment submissions was a major challenge—ensuring users could refine their work without database duplication',
      'Optimized dynamic MongoDB queries to filter assignments by difficulty levels (Easy, Medium, Hard) and completion status efficiently'
    ],
    futureImprovements: [
      'Integrate a real-time collaborative chat for study groups',
      'Add an AI-driven assignment summarizer to help students grasp complex topics faster'
    ],
    liveUrl: 'https://unique-mooncake-0634d9.netlify.app/',
    githubUrl: 'https://github.com/Razdee01/StudyMate-Client.git'
  },
  {
    id: 'phstore',
    title: 'PhStore',
    category: 'Web Application',
    image: '/phstore.jpg',
    description: 'A modern app management platform where users can search, filter, and track app analytics using interactive data visualizations.',
    techStack: ['React.js', 'Tailwind CSS', 'Recharts', 'Axios', 'React Router', 'Local Storage'],
    challenges: [
      'Integrating the Recharts library to dynamically display app statistics based on user interaction',
      'Maintaining state consistency when installing or uninstalling apps so that the Local Storage data stayed synced with the UI without manual page reloads'
    ],
    futureImprovements: [
      'Integrate a real-time API for live app ratings',
      'Add a \'Comparison\' feature where users can compare the stats of two apps side-by-side on a single chart'
    ],
    liveUrl: 'https://razdee-react-app.netlify.app/',
    githubUrl: 'https://github.com/Razdee01/assignment-8.git'
  }
]