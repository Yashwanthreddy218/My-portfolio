import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const PROFILES = [
  {
    id:     'recruiter',
    name:   'Recruiter',
    emoji:  '💼',
    photo:  '/profile.jpg',
    color:  '#4f8ef7',
    bg:     'linear-gradient(135deg, #1a2a5e, #0d1a3a)',
    desc:   'Hiring decisions start here',
    match:  '98% Match',
  },
  {
    id:     'developer',
    name:   'Developer',
    emoji:  '👨‍💻',
    color:  '#4ade80',
    bg:     'linear-gradient(135deg, #0d3a1a, #0a2010)',
    desc:   'Code, architecture & geek stuff',
    match:  '100% Match',
  },
  {
    id:     'stalker',
    name:   'Stalker',
    emoji:  '🕵️',
    color:  '#f59e0b',
    bg:     'linear-gradient(135deg, #3a2000, #1a1000)',
    desc:   "Just... looking around 👀",
    match:  'Who knows?',
  },
]

export default function NetflixProfilePicker() {
  const { pickProfile, goHome } = useTheme()
  const [selected, setSelected]   = useState(null)
  const [loading,  setLoading]    = useState(false)

  const handlePick = (profile) => {
    if (loading) return
    setSelected(profile.id)
    setLoading(true)
    setTimeout(() => pickProfile(profile.id), 1800)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#141414' }}
    >
      {/* Very subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      <AnimatePresence mode="wait">
        {loading ? (
          /* ── LOADING SCREEN ── */
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Netflix N intro */}
            <motion.div
              initial={{ scale: 3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-8xl font-black text-white"
              style={{
                color: '#E50914',
                textShadow: '0 0 60px rgba(229,9,20,0.6)',
                fontFamily: 'Georgia, serif',
              }}
            >
              N
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.0, ease: 'easeInOut' }}
              className="h-1 w-40 rounded-full origin-left"
              style={{ background: '#E50914' }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 text-sm tracking-widest uppercase"
            >
              Loading profile...
            </motion.p>
          </motion.div>
        ) : (
          /* ── PROFILE PICKER ── */
          <motion.div
            key="picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center w-full px-6"
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white font-light mb-12 text-center"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Who's watching?
            </motion.h1>

            {/* Profiles */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {PROFILES.map((profile, i) => (
                <motion.button
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => handlePick(profile)}
                  className="group flex flex-col items-center gap-3 cursor-pointer bg-transparent border-none outline-none"
                  style={{ width: '160px' }}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-36 h-36 rounded-lg flex items-center justify-center text-5xl transition-all duration-200"
                      style={{
                        background: profile.bg,
                        border: selected === profile.id
                          ? `4px solid ${profile.color}`
                          : '4px solid transparent',
                        boxShadow: selected === profile.id
                          ? `0 0 30px ${profile.color}60`
                          : 'none',
                        outline: '0px solid transparent',
                        transition: 'border-color 0.15s, box-shadow 0.2s',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover', objectPosition: 'top center',
                            transition: 'transform 0.3s',
                          }}
                          className="group-hover:scale-105"
                        />
                      ) : (
                        <span
                          className="transition-all duration-200 group-hover:scale-110"
                          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                        >
                          {profile.emoji}
                        </span>
                      )}
                    </motion.div>

                    {/* Match badge */}
                    <div
                      className="absolute -top-2 -right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: '#46d369', color: '#000' }}
                    >
                      {profile.match}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <p
                      className="font-medium transition-colors duration-150"
                      style={{
                        color: '#808080',
                        fontSize: '1.1rem',
                      }}
                    >
                      {profile.name}
                    </p>
                    <p
                      className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: profile.color }}
                    >
                      {profile.desc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Manage profiles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={goHome}
                className="flex items-center gap-2 px-6 py-2 border font-medium text-sm transition-all duration-200 hover:text-white hover:border-white"
                style={{
                  color: '#808080',
                  borderColor: '#808080',
                  background: 'transparent',
                  cursor: 'pointer',
                  borderRadius: '3px',
                  letterSpacing: '0.5px',
                }}
              >
                ← Back to Theme Selection
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
