import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('amazon') // 'amazon' | 'netflix'

  const toggle = () => setTheme(t => t === 'amazon' ? 'netflix' : 'amazon')

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
