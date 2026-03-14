import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Aurora    from './Aurora'
import Particles from './Particles'
import Meteors   from './Meteors'
import CodeFloat   from './CodeFloat'
import LottieDev   from './LottieDev'
import SpaceCanvas from './SpaceCanvas'

export default function ThemeSelector() {
  const { pickAmazon, pickNetflix } = useTheme()
  const [hovered, setHovered] = useState(null)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Aurora + particles + meteors */}
      <Aurora colors={['#E50914', '#FF9900', '#a855f7', '#3b82f6']} opacity={0.1} />
      <Particles count={30} color="#FF9900" maxSize={3} />
      <Meteors count={12} color="#ffffff" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="noise" />
      {/* Space canvas — stars + shooting stars + floating tech emojis */}
      <SpaceCanvas opacity={0.5} />
      <CodeFloat />

      {/* Lottie decoration — top-right corner, desktop only */}
      <div className="hidden lg:block" style={{ position: 'absolute', top: '20px', right: '24px', opacity: 0.75, pointerEvents: 'none' }}>
        <LottieDev size={180} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold tracking-[4px] uppercase text-gray-500 mb-4">
            Portfolio of
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 tracking-tight">
            Yashwanth <span className="gradient-text">Katta</span>
          </h1>
          <p className="text-gray-400 text-lg">Engineering Leader · 6 Years · Targeting EM / Tech Lead Roles</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">Open to new opportunities</span>
          </div>
        </motion.div>

        {/* Choose experience label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-sm uppercase tracking-widest mb-8"
        >
          Choose your experience
        </motion.p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">

          {/* Netflix Card */}
          <motion.button
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            onClick={pickNetflix}
            onMouseEnter={() => setHovered('netflix')}
            onMouseLeave={() => setHovered(null)}
            className="relative group flex flex-col items-center rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer text-left"
            style={{
              background: hovered === 'netflix'
                ? 'linear-gradient(145deg, #1a0000, #2a0a0a)'
                : 'linear-gradient(145deg, #1a0000 0%, #0d0d0d 100%)',
              borderColor: hovered === 'netflix' ? '#E50914' : '#2a0a0a',
              boxShadow: hovered === 'netflix' ? '0 0 40px rgba(229,9,20,0.3)' : 'none',
              transform: hovered === 'netflix' ? 'translateY(-6px) scale(1.02)' : 'none',
            }}
          >
            {/* Glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, #E50914, transparent 70%)' }}
            />

            <div className="relative p-8 flex flex-col items-center text-center w-full">
              {/* Netflix N */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-4xl font-black text-white shadow-lg"
                style={{
                  background: '#E50914',
                  boxShadow: hovered === 'netflix' ? '0 12px 40px rgba(229,9,20,0.5)' : '0 4px 20px rgba(229,9,20,0.3)',
                }}
              >
                N
              </div>

              <h2 className="text-2xl font-black text-white mb-2">Netflix Mode</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Cinematic experience. Browse my portfolio like a Netflix show with profile selection, rows, and hover previews.
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {['Profile Picker', 'Slideshow Hero', 'Card Rows', 'Hover Previews'].map(f => (
                  <span
                    key={f}
                    className="text-xs px-2.5 py-1 rounded-full border font-medium"
                    style={{ borderColor: '#E5091440', color: '#E50914', background: '#E5091410' }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div
                className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                style={{ background: '#E50914' }}
              >
                ▶ Watch Now
              </div>
            </div>
          </motion.button>

          {/* Amazon Card */}
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            onClick={pickAmazon}
            onMouseEnter={() => setHovered('amazon')}
            onMouseLeave={() => setHovered(null)}
            className="relative group flex flex-col items-center rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer text-left"
            style={{
              background: hovered === 'amazon'
                ? 'linear-gradient(145deg, #1a1000, #0d1117)'
                : 'linear-gradient(145deg, #131921 0%, #0d0d0d 100%)',
              borderColor: hovered === 'amazon' ? '#FF9900' : '#1c2733',
              boxShadow: hovered === 'amazon' ? '0 0 40px rgba(255,153,0,0.25)' : 'none',
              transform: hovered === 'amazon' ? 'translateY(-6px) scale(1.02)' : 'none',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, #FF9900, transparent 70%)' }}
            />

            <div className="relative p-8 flex flex-col items-center text-center w-full">
              {/* Amazon logo-ish */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 text-3xl font-black text-black shadow-lg"
                style={{
                  background: '#FF9900',
                  boxShadow: hovered === 'amazon' ? '0 12px 40px rgba(255,153,0,0.4)' : '0 4px 20px rgba(255,153,0,0.25)',
                }}
              >
                📦
              </div>

              <h2 className="text-2xl font-black text-white mb-2">Amazon Mode</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Professional & structured. Clean bento layout with timeline experience, skill tabs, and smooth animations.
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {['Bento Grid', 'Skill Tabs', 'Timeline', 'Dark Premium'].map(f => (
                  <span
                    key={f}
                    className="text-xs px-2.5 py-1 rounded-full border font-medium"
                    style={{ borderColor: '#FF990040', color: '#FF9900', background: '#FF990010' }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div
                className="w-full py-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-all"
                style={{ background: '#FF9900' }}
              >
                🛒 View Portfolio
              </div>
            </div>
          </motion.button>

        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-700 text-xs mt-10 text-center"
        >
          You can switch themes anytime from the navigation bar
        </motion.p>

      </div>
    </div>
  )
}
