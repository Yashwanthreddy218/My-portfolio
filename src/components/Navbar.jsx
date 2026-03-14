import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education'  },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const { goHome } = useTheme()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.93)' : 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <button
          onClick={goHome}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
        >
          <div className="relative" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
            <img
              src="/profile.jpg"
              alt="Yashwanth Katta"
              style={{
                width: '100%', height: '100%',
                borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center',
                border: '2px solid #FF9900',
              }}
            />
            <span style={{
              position: 'absolute', bottom: '0px', right: '0px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#4ade80', border: '1.5px solid #0a0a0a',
            }} />
          </div>
          <span className="font-bold text-white text-sm tracking-wide hidden sm:block">
            Yashwanth Katta
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-300 font-medium">Open to Work</span>
          </div>

          <button
            onClick={goHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-xs font-bold transition-all hover:border-[#FF9900] hover:text-[#FF9900] text-[#FF9900]"
            title="Change theme"
          >
            🎭 <span className="hidden sm:block">Switch Theme</span>
          </button>

          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(10,10,10,0.96)', borderBottom: '1px solid #222' }}
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors font-medium block py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
