/**
 * Aurora — Aceternity-inspired animated blob background.
 * Renders N colour blobs with slow, organic movement.
 * Completely CSS — zero JavaScript animation loop.
 */
const BLOB_PRESETS = [
  { anim: 'blob1', dur: '18s', size: '55vw', top: '-15%', left: '-10%' },
  { anim: 'blob2', dur: '22s', size: '50vw', top: '20%',  left: '55%'  },
  { anim: 'blob3', dur: '26s', size: '45vw', top: '50%',  left: '10%'  },
  { anim: 'blob4', dur: '20s', size: '40vw', top: '-5%',  left: '40%'  },
]

export default function Aurora({ colors = ['#E50914', '#FF9900', '#a855f7', '#3b82f6'], opacity = 0.13 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {BLOB_PRESETS.slice(0, colors.length).map((b, i) => (
        <div
          key={i}
          style={{
            position:        'absolute',
            width:           b.size,
            height:          b.size,
            borderRadius:    '50%',
            background:      `radial-gradient(circle at 40% 40%, ${colors[i]} 0%, transparent 70%)`,
            filter:          'blur(72px)',
            opacity,
            top:             b.top,
            left:            b.left,
            animation:       `${b.anim} ${b.dur} ease-in-out infinite`,
            willChange:      'transform',
          }}
        />
      ))}

      {/* Aceternity-style moving gradient layer */}
      <div
        style={{
          position:           'absolute',
          inset:              0,
          backgroundImage:    `
            repeating-linear-gradient(100deg, transparent 0%, ${colors[0]}18 7%, transparent 10%),
            repeating-linear-gradient(100deg, ${colors[1]}12 10%, transparent 15%),
            repeating-linear-gradient(100deg, ${colors[2] || colors[0]}08 20%, transparent 25%)
          `,
          backgroundSize:     '300%, 200%, 300%',
          animation:          'aurora 20s linear infinite',
          opacity:            0.6,
          mixBlendMode:       'screen',
        }}
      />
    </div>
  )
}
