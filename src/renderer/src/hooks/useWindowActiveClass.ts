import { useEffect } from 'react'

// Adds or removes a CSS class on the document <body> depending on isActive
export default function useWindowActiveClass(
  isActive: boolean,
  className = 'window-active'
): void {
  useEffect(() => {
    const body = document.body
    if (isActive) {
      body.classList.add(className)
    } else {
      body.classList.remove(className)
    }

    return () => {
      body.classList.remove(className)
    }
  }, [isActive, className])
}
