import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = ['Home', 'Experience', 'Skills', 'Education', 'Contact']

const PROFILE_AVATARS = {
  recruiter: { emoji: '💼', color: '#4f8ef7', bg: 'linear-gradient(135deg, #1a2a5e, #0d1a3a)' },
  developer: { emoji: '👨‍💻', color: '#4ade80', bg: 'linear-gradient(135deg, #0d3a1a, #0a2010)' },
  stalker:   { emoji: '🕵️',  color: '#f59e0b', bg: 'linear-gradient(135deg, #3a2000, #1a1000)' },
}

export default function NetflixNavbar() {
  const { profile, goHome } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const av = profile ? PROFILE_AVATARS[profile] : PROFILE_AVATARS.recruiter

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-14 h-16 transition-all duration-400"
      style={{
        background: scrolled
          ? 'rgba(20,20,20,0.97)'
          : 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      {/* Left: Logo + links */}
      <div className="flex items-center gap-8">
        <button
          onClick={goHome}
          className="text-2xl font-black tracking-tight cursor-pointer bg-transparent border-none"
          style={{ color: '#E50914', fontFamily: 'Georgia, serif', fontSize: '1.8rem' }}
        >
          N
        </button>

        <ul className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-xs text-gray-300 hover:text-white transition-colors font-medium tracking-wide"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: search, bell, profile */}
      <div className="flex items-center gap-5">
        <Search size={18} className="text-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
        <Bell   size={18} className="text-white cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />

        {/* Profile avatar */}
        <div className="relative" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
          <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
            <div className="relative" style={{ width: '32px', height: '32px' }}>
              {profile === 'recruiter' ? (
                <img
                  src="/profile.jpg"
                  alt="Yashwanth"
                  style={{
                    width: '100%', height: '100%',
                    borderRadius: '6px', objectFit: 'cover', objectPosition: 'top center',
                    border: `2px solid ${av.color}`,
                  }}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-sm"
                  style={{ background: av.bg, border: `2px solid ${av.color}40` }}
                >
                  {av.emoji}
                </div>
              )}
            </div>
            <ChevronDown size={14} className="text-white" />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-full mt-2 py-2 rounded border w-48"
              style={{ background: '#141414', borderColor: '#333' }}
            >
              <div className="px-4 py-2 border-b border-[#333] mb-1">
                <p className="text-white text-xs font-semibold capitalize">{profile || 'Guest'}</p>
                <p className="text-gray-500 text-xs">Current Profile</p>
              </div>
              <button
                onClick={goHome}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                Switch Profile
              </button>
              <button
                onClick={goHome}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                Switch Theme
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
