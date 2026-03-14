import { useMemo } from 'react'

/**
 * Particles — deterministic floating dots.
 * Uses index-based math (no Math.random on render) so it's SSR-safe
 * and doesn't flicker on re-renders.
 */
export default function Particles({ count = 28, color = '#FF9900', maxSize = 3 }) {
  const dots = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      // golden-angle spiral for even distribution
      const angle   = i * 137.508
      const radius  = Math.sqrt(i / count)
      return {
        id:       i,
        size:     1 + (i % 4) * (maxSize / 4),
        left:     ((angle * 0.277) % 100),
        top:      ((i * 89.3 + 7) % 100),
        dur:      5 + (i % 9) * 1.8,
        delay:    (i % 7) * 0.9,
        opacity:  0.15 + (i % 5) * 0.07,
        dx:       `${-15 + (i % 6) * 6}px`,
        // alternate between two animation types
        anim:     i % 2 === 0 ? 'particleRise' : 'particleDrift',
      }
    }), [count, maxSize])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {dots.map(d => (
        <div
          key={d.id}
          style={{
            position:     'absolute',
            width:        d.size,
            height:       d.size,
            borderRadius: '50%',
            left:         `${d.left}%`,
            top:          `${d.top}%`,
            background:   color,
            opacity:      d.opacity,
            boxShadow:    `0 0 ${d.size * 3}px ${color}`,
            animation:    `${d.anim} ${d.dur}s ease-in-out ${d.delay}s infinite`,
            '--dx':        d.dx,
            willChange:   'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
