import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: 'contesthub',
    title: 'ContestHub',
    category: 'Web Application',
    image: '/contesthub.png',
    description:
      'A full-stack contest platform with role-based dashboards (User, Creator, Admin), Stripe payment integration, and a dynamic leaderboard.',
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Firebase',
      'Stripe',
      'TanStack Query',
      'JWT',
    ],
    challenges: [
      'Implementing secure Stripe payments and synchronizing them with the database was a major challenge',
      'Setting up JWT with Axios interceptors to protect sensitive Creator and Admin routes',
    ],
    futureImprovements: [
      'Add real-time notifications for contest winners using Socket.io',
      'Implement an automated refund system for rejected contests',
    ],
    liveUrl: 'https://strong-axolotl-c79cc6.netlify.app/',
    githubUrl: 'https://github.com/Razdee01/assignment-11-client.git',
  },
  {
    id: 'studymate',
    title: 'StudyMate',
    category: 'Web Application',
    image: '/studymate.png',
    description:
      'A collaborative study platform for managing assignments, featuring real-time tracking, difficulty filtering, and grading systems.',
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Firebase Auth',
      'Tailwind CSS',
      'DaisyUI',
    ],
    challenges: [
      "Implementing the 'Upsert' logic for assignment submissions was a major challenge—ensuring users could refine their work without database duplication",
      'Optimized dynamic MongoDB queries to filter assignments by difficulty levels (Easy, Medium, Hard) and completion status efficiently',
    ],
    futureImprovements: [
      'Integrate a real-time collaborative chat for study groups',
      'Add an AI-driven assignment summarizer to help students grasp complex topics faster',
    ],
    liveUrl: 'https://study-mate-client-7fnb.vercel.app/',
    githubUrl: 'https://github.com/Razdee01/StudyMate-Client.git',
  },
  {
    id: 'gadgetGrove',
    title: 'GadgetGrove',
    category: 'Web Application',
    image: '/gadget.png',
    description:
      'A high-performance, cyberpunk-themed e-commerce inventory management system with secure authentication, dynamic gadget management, and a premium "Buy Now" acquisition flow.',
    techStack: [
      'Next.js 15',
      'MongoDB',
      'Tailwind CSS',
      'DaisyUI',
      'Next-Auth',
      'SweetAlert2',
      'Server Actions',
    ],
    challenges: [
      'Implementing secure role-based access control with Next-Auth and protecting the Inventory Portal',
      'Optimizing Server Actions for fast database mutations while maintaining real-time user feedback',
    ],
    futureImprovements: [
      'Add real-time inventory updates using WebSockets or Server-Sent Events',
      'Implement advanced search and filtering with debounced queries',
      'Add payment integration for direct gadget acquisition',
    ],
    liveUrl: 'https://gadget-grove-one.vercel.app/',
    githubUrl: 'https://github.com/Razdee01/gadget-grove.git',
  },
  {
    id: 'convox',
    title: 'ConvoX',
    category: 'Team Project',
    image: '/convox.png',
    description:
      'A modern real-time chat application built with Next.js 14, featuring Socket.io for instant messaging, group chats, presence tracking, reactions, and a sleek cyber-themed UI. This was a team project where I led the frontend development.',
    techStack: [
      'Next.js 14',
      'React 18',
      'Tailwind CSS',
      'Socket.io',
      'Next-Auth',
      'Context API',
      'Axios',
    ],
    challenges: [
      'Managing real-time state synchronization between Socket.io events and React Context',
      'Implementing optimistic updates for messages while handling edit/delete/reactions reliably',
      'Building a scalable conversation system with pinning, archiving, muting, and unread counters',
    ],
    futureImprovements: [
      'Implement end-to-end encryption for private conversations',
      'Add voice messages and video call integration',
      'Introduce dark/light mode toggle with cyberpunk themes',
    ],
    liveUrl: 'https://convox-chat.vercel.app/',
    githubUrl: 'https://github.com/rezaulrht/chat-app-client.git',
  },
];
