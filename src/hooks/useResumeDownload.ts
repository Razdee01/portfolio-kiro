import { useState, useCallback } from 'react'

interface UseResumeDownloadReturn {
  downloadResume: () => Promise<void>
  isDownloading: boolean
  error: string | null
}

export const useResumeDownload = (): UseResumeDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadResume = useCallback(async () => {
    setIsDownloading(true)
    setError(null)

    try {
      // Check if the file exists by making a HEAD request
      const response = await fetch('/assets/resume/Mirta_Akins_Resume.pdf', {
        method: 'HEAD'
      })

      if (!response.ok) {
        throw new Error('Resume file not found')
      }

      // Create a temporary link element to trigger download
      const link = document.createElement('a')
      link.href = '/assets/resume/Mirta_Akins_Resume.pdf'
      link.download = 'Mirta_Akins_Resume.pdf'
      link.style.display = 'none'
      
      // Add to DOM, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Track download event for analytics (placeholder)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'download', {
          event_category: 'Resume',
          event_label: 'Mirta_Akins_Resume.pdf'
        })
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download resume'
      setError(errorMessage)
      console.error('Resume download error:', err)
    } finally {
      setIsDownloading(false)
    }
  }, [])

  return {
    downloadResume,
    isDownloading,
    error
  }
}