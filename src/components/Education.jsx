import { motion } from 'framer-motion'
import { GraduationCap, BookOpen } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const DEGREES = [
  {
    degree:   'M.S. in Computer Science',
    school:   'Texas A&M University – Kingsville',
    location: 'Kingsville, TX',
    period:   'Jan 2021 – May 2022',
    gpa:      '3.6 / 4.0',
    courses:  [
      'Computer Communication Networks',
      'Database Management Systems',
      'Analysis of Algorithms',
      'Cloud Computing',
      'Software Engineering',
      'Operating Systems',
    ],
    highlight: true,
  },
  {
    degree:   'B.Tech in Electronics & Engineering',
    school:   'CVR College of Engineering',
    location: 'Hyderabad, India',
    period:   'Aug 2016 – May 2020',
    gpa:      null,
    courses:  [
      'Cloud Computing',
      'Applied Physics',
      'Electrical Machines',
      'Database Management Systems',
      'Digital Logic Design',
      'Microprocessors & Microcontrollers',
      'Programming',
    ],
    highlight: false,
  },
]

export default function Education() {
  const { theme } = useTheme()
  const accent     = theme === 'netflix' ? '#E50914' : '#FF9900'

  return (
    <section id="education" className="section" style={{ background: '#111' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">Education</h2>
          <div className="section-divider" style={{ background: accent }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {DEGREES.map((deg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bento-card"
              style={{ borderColor: deg.highlight ? `${accent}40` : '#252525' }}
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}16` }}
                >
                  <GraduationCap size={22} style={{ color: accent }} />
                </div>
                {deg.gpa && (
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: `${accent}16`, color: accent }}
                  >
                    ★ GPA {deg.gpa}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-1">{deg.degree}</h3>
              <p className="font-semibold text-sm mb-1" style={{ color: accent }}>{deg.school}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                <span>📍 {deg.location}</span>
                <span>🗓 {deg.period}</span>
              </div>

              {/* Courses */}
              <div className="border-t border-[#252525] pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-gray-500" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Coursework</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {deg.courses.map((c, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-full border border-[#2a2a2a] text-gray-400"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
