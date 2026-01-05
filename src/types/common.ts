export interface Service {
  id: string
  title: string
  icon: string
  description: string
  features: string[]
}

export interface Skill {
  id: string
  name: string
  percentage: number
  category: 'technical' | 'soft'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  slug: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}