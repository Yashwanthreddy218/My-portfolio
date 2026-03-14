import { useEffect, useRef } from 'react'

/* Animated space canvas: twinkling stars + shooting stars + floating code orbs */
export default function SpaceCanvas({ opacity = 0.55 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Stars
    const STAR_COUNT = 160
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       0.4 + Math.random() * 1.6,
      speed:   0.05 + Math.random() * 0.12,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
    }))

    // Shooting stars
    const makeShoot = () => ({
      x:      Math.random() * canvas.width * 0.7,
      y:      Math.random() * canvas.height * 0.4,
      len:    60 + Math.random() * 80,
      speed:  7 + Math.random() * 6,
      alpha:  1,
      angle:  Math.PI / 5 + (Math.random() - 0.5) * 0.3,
      active: false,
      timer:  Math.floor(Math.random() * 180),
    })
    const shoots = Array.from({ length: 4 }, makeShoot)

    // Floating tech orbs
    const ORBS = ['☕','⚛️','☁️','🐳','📡','🌱','📘','⚙️']
    const orbs = ORBS.map((e, i) => ({
      emoji: e,
      x:     50 + Math.random() * (canvas.width - 100),
      y:     50 + Math.random() * (canvas.height - 100),
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    (Math.random() - 0.5) * 0.35,
      size:  14 + Math.random() * 8,
      alpha: 0.12 + Math.random() * 0.12,
      pulse: Math.random() * Math.PI * 2,
    }))

    let frame = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Stars
      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed
        const brightness = 0.4 + Math.sin(s.twinkle) * 0.3
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${brightness * opacity})`
        ctx.fill()
        s.y += s.speed
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width }
      })

      // Shooting stars
      shoots.forEach(s => {
        if (s.timer > 0) { s.timer--; return }
        if (!s.active) { s.active = true; s.alpha = 1 }
        const dx = Math.cos(s.angle) * s.speed
        const dy = Math.sin(s.angle) * s.speed
        // Trail gradient
        const grd = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        grd.addColorStop(0, `rgba(255,255,255,${s.alpha * 0.85 * opacity})`)
        grd.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        ctx.strokeStyle = grd
        ctx.lineWidth   = 1.5
        ctx.stroke()
        s.x += dx; s.y += dy
        s.alpha -= 0.012
        if (s.alpha <= 0 || s.x > canvas.width || s.y > canvas.height) {
          Object.assign(s, makeShoot(), { timer: 80 + Math.floor(Math.random() * 150) })
        }
      })

      // Floating orbs
      orbs.forEach(o => {
        o.pulse += 0.025
        o.x += o.vx; o.y += o.vy
        if (o.x < 10 || o.x > canvas.width  - 10) o.vx *= -1
        if (o.y < 10 || o.y > canvas.height - 10) o.vy *= -1
        const alpha = (o.alpha + Math.sin(o.pulse) * 0.04) * opacity
        ctx.globalAlpha = alpha
        ctx.font        = `${o.size}px serif`
        ctx.fillText(o.emoji, o.x, o.y)
        ctx.globalAlpha = 1
      })

      frame++
    }

    const id = setInterval(draw, 33) // ~30fps
    return () => { clearInterval(id); window.removeEventListener('resize', resize) }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
