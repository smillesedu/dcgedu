import { useEffect, useState } from 'react'

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // pega o tema salvo ou default "light"
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}
