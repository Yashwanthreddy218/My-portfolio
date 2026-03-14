import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, MapPin, Briefcase } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const TYPING_WORDS = [
  'Full Stack Developer',
  'Java / Spring Boot Expert',
  'React & Angular Engineer',
  'Cloud & AWS Practitioner',
  'Microservices Architect',
]

function useTypingEffect(words, speed = 80, pause = 1800) {
  const [display, setDisplay]   = useState('')
  const [wordIdx, setWordIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

const stats = [
  { num: '6+',  label: 'Years Experience' },
  { num: '4',   label: 'Companies'        },
  { num: '3.6', label: 'M.S. GPA'         },
  { num: '10+', label: 'Technologies'     },
]

export default function Hero() {
  const { theme } = useTheme()
  const typed     = useTypingEffect(TYPING_WORDS)
  const accent    = theme === 'netflix' ? '#E50914' : '#FF9900'

  const heroBg = theme === 'netflix'
    ? 'radial-gradient(ellipse at 70% 40%, rgba(229,9,20,0.13) 0%, transparent 60%), linear-gradient(160deg, #0a0a0a 0%, #141414 100%)'
    : 'radial-gradient(ellipse at 30% 40%, rgba(255,153,0,0.11) 0%, transparent 60%), linear-gradient(160deg, #0f1923 0%, #131921 100%)'

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: heroBg }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Main content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold mb-8"
              style={{ borderColor: accent, color: accent, background: `rgba(${theme === 'netflix' ? '229,9,20' : '255,153,0'},0.08)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              Available for New Opportunities
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-400 text-lg font-medium mb-2">Hi, I'm</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-2">
                Yashwanth
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-6 gradient-text">
                Katta
              </h1>
            </motion.div>

            {/* Typing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6 h-8"
            >
              <span
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: accent }}
              >
                {typed}
              </span>
              <span
                className="inline-block w-0.5 h-6 animate-blink"
                style={{ background: accent }}
              />
            </motion.div>

            {/* Desc */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-base leading-relaxed max-w-lg mb-4"
            >
              6 years crafting scalable enterprise systems — microservices in Spring Boot,
              modern UIs in React & Angular, and cloud infrastructure on AWS.
              Currently modernizing state-level apps at <span className="text-white font-medium">Texas Parks & Wildlife</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 text-gray-500 text-sm mb-8"
            >
              <MapPin size={14} />
              United States &nbsp;·&nbsp;
              <Briefcase size={14} />
              Open to Remote &amp; Hybrid roles
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#experience" className="btn-primary">
                View My Work
                <ArrowDown size={16} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="btn-outline"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid grid-cols-4 gap-4 mt-12 pt-10 border-t border-[#222]"
            >
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-black"
                    style={{ color: accent }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Floating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="bento-card rounded-2xl p-6 max-w-sm mx-auto"
                style={{ borderColor: `${accent}40` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-black text-lg"
                    style={{ background: accent }}
                  >
                    YK
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Yashwanth Katta</p>
                    <p className="text-gray-400 text-xs">Full Stack Java Developer</p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Current',  val: 'Texas Parks & Wildlife', color: '#4ade80' },
                    { label: 'Previous', val: 'Amazon Web Services',    color: accent    },
                    { label: 'Stack',    val: 'Java · React · AWS',     color: '#60a5fa' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-semibold" style={{ color: item.color }}>{item.val}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#2a2a2a] pt-4">
                  <p className="text-xs text-gray-500 mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Java 21', 'Spring Boot', 'React 19', 'AWS', 'Kafka', 'Docker'].map(s => (
                      <span
                        key={s}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Small floating badge — top right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -right-4 glass rounded-xl px-4 py-2 text-xs font-bold"
                style={{ color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
              >
                ● Open to Work
              </motion.div>

              {/* Small floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-6 -left-4 glass rounded-xl px-4 py-2 text-xs font-bold text-white"
              >
                🎓 M.S. CS · GPA 3.6
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
