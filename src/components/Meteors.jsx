import { useMemo } from 'react'

/**
 * Meteors — shooting-star streaks across the background.
 * Inspired by MagicUI / Aceternity meteor component.
 */
export default function Meteors({ count = 14, color = '#ffffff' }) {
  const meteors = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id:     i,
      top:    `${(i * 61) % 80}%`,
      left:   `${(i * 137) % 110 - 10}%`,
      delay:  `${(i * 0.8) % 6}s`,
      dur:    `${3 + (i % 4)}s`,
      width:  `${80 + (i % 5) * 40}px`,
    })), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {meteors.map(m => (
        <span
          key={m.id}
          style={{
            position:          'absolute',
            top:               m.top,
            left:              m.left,
            width:             m.width,
            height:            '1px',
            background:        `linear-gradient(90deg, ${color}, transparent)`,
            opacity:           0.25,
            borderRadius:      '9999px',
            animation:         `meteor ${m.dur} ease-in-out ${m.delay} infinite`,
            boxShadow:         `0 0 4px 0 ${color}`,
          }}
        />
      ))}
    </div>
  )
}
