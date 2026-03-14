import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NetflixCard from './NetflixCard'

const CARD_WIDTH  = 220   // px
const CARD_GAP    = 10    // px
const STEP        = (CARD_WIDTH + CARD_GAP) * 3   // cards per click

/**
 * NetflixRow — uses transform: translateX for scrolling instead of
 * overflow-x: auto.  This keeps overflow: visible on all containers
 * so card hover popups are NEVER clipped by the scroll parent.
 */
export default function NetflixRow({ title, items, accent = '#E50914', onPlay }) {
  const [offset,  setOffset]  = useState(0)
  const [visible, setVisible] = useState(false)
  const trackRef              = useRef(null)

  const maxOffset = () => {
    if (!trackRef.current) return 0
    const totalWidth = items.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
    const viewWidth  = trackRef.current.parentElement?.offsetWidth || 0
    return Math.min(0, viewWidth - totalWidth)
  }

  const scrollLeft  = () => setOffset(o => Math.min(0, o + STEP))
  const scrollRight = () => setOffset(o => Math.max(maxOffset(), o - STEP))

  const canLeft  = offset < 0
  const canRight = trackRef.current
    ? offset > maxOffset()
    : true

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55 }}
      className="mb-12"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* ── ROW TITLE ── */}
      <div className="flex items-center gap-3 px-8 lg:px-14 mb-3">
        <h2 className="nf-row-title">{title}</h2>
        <AnimatePresence>
          {visible && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-bold flex items-center gap-1 cursor-pointer"
              style={{ color: accent }}
            >
              Explore All <ChevronRight size={11} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* ── SCROLL AREA (overflow: visible — no clipping!) ── */}
      <div className="relative" ref={trackRef} style={{ overflow: 'visible' }}>

        {/* Left arrow */}
        <AnimatePresence>
          {visible && canLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollLeft}
              className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center border-none cursor-pointer"
              style={{
                width:      '56px',
                background: 'linear-gradient(90deg, rgba(20,20,20,0.95) 60%, transparent)',
                color:      '#fff',
              }}
            >
              <ChevronLeft size={26} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Cards track — translateX-based scroll */}
        <motion.div
          animate={{ x: offset }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{
            display:         'flex',
            gap:             `${CARD_GAP}px`,
            paddingLeft:     '64px',     /* lg:px-14 = 56px */
            paddingRight:    '64px',
            paddingTop:      '16px',     /* room for scale-up */
            paddingBottom:   '24px',
            overflow:        'visible',  /* ← the magic: never clips hover popups */
            willChange:      'transform',
          }}
        >
          {items.map((item, i) => (
            <NetflixCard key={i} item={item} accent={accent} onPlay={onPlay} />
          ))}
        </motion.div>

        {/* Right arrow */}
        <AnimatePresence>
          {visible && canRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollRight}
              className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center border-none cursor-pointer"
              style={{
                width:      '56px',
                background: 'linear-gradient(270deg, rgba(20,20,20,0.95) 60%, transparent)',
                color:      '#fff',
              }}
            >
              <ChevronRight size={26} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
