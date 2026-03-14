import { createContext, useContext, useState } from 'react'

// screen: 'selector' | 'netflix-profile' | 'portfolio'
// theme:  'amazon' | 'netflix'
// profile: 'recruiter' | 'developer' | 'stalker' | null

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [screen,  setScreen]  = useState('selector')
  const [theme,   setTheme]   = useState('amazon')
  const [profile, setProfile] = useState(null)

  const pickAmazon = () => {
    setTheme('amazon')
    setScreen('portfolio')
  }

  const pickNetflix = () => {
    setTheme('netflix')
    setScreen('netflix-profile')
  }

  const pickProfile = (p) => {
    setProfile(p)
    setScreen('portfolio')
  }

  const goHome = () => {
    setScreen('selector')
    setProfile(null)
  }

  return (
    <ThemeContext.Provider value={{ screen, theme, profile, pickAmazon, pickNetflix, pickProfile, goHome }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
