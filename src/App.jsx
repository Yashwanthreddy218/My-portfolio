import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider, useTheme } from './context/ThemeContext'

import ThemeSelector       from './components/ThemeSelector'
import NetflixProfilePicker from './components/NetflixProfilePicker'
import NetflixPortfolio    from './components/netflix/NetflixPortfolio'

// Amazon portfolio pieces
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import About      from './components/About'
import Skills     from './components/Skills'
import Experience from './components/Experience'
import Education  from './components/Education'
import Contact    from './components/Contact'

function AmazonPortfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  )
}

function AppContent() {
  const { screen, theme } = useTheme()

  return (
    <AnimatePresence mode="wait">
      {screen === 'selector' && (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <ThemeSelector />
        </motion.div>
      )}

      {screen === 'netflix-profile' && (
        <motion.div
          key="netflix-profile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <NetflixProfilePicker />
        </motion.div>
      )}

      {screen === 'portfolio' && theme === 'netflix' && (
        <motion.div
          key="netflix-portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NetflixPortfolio />
        </motion.div>
      )}

      {screen === 'portfolio' && theme === 'amazon' && (
        <motion.div
          key="amazon-portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AmazonPortfolio />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
