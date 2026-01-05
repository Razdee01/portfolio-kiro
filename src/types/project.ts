export interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  techStack: string[]
  challenges: string[]
  futureImprovements: string[]
  liveUrl?: string
  githubUrl?: string
}