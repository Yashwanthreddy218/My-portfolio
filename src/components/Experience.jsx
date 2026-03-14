import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const JOBS = [
  {
    role:    'Full Stack Java Developer',
    company: 'Texas Parks & Wildlife Department',
    location: 'Austin, TX (Hybrid)',
    period:  'Jan 2023 – Present',
    current: true,
    bullets: [
      'Led end-to-end modernization of Boat Titling & Registration (BTR) system — migrated frontend from CRA → Vite + React 19, backend from Java 11 → 21 with Spring Boot 3.4, achieving 60%+ build time reduction.',
      'Architected reusable frameworks in Java 21 / Spring Boot 3.4 to standardize microservice creation, reducing boilerplate setup time by >40% across new feature teams.',
      'Led UI development for state-level enterprise apps using Angular (v7–11) + TypeScript, building SPAs with responsive design and reusable component libraries.',
      'Architected and secured REST APIs using JWT, OAuth2, and Spring Security for authentication across services.',
      'Implemented WCAG 2.1-compliant features — ARIA attributes, keyboard navigation, screen-reader-friendly layouts — validated with Axe and Lighthouse.',
      'Integrated Flexbox, Bootstrap 5, and custom SASS utilities for full mobile/tablet compatibility.',
    ],
    env: 'Java 21, Spring Boot 3.4, React 19, TypeScript, Angular, Vite, AWS S3/EC2, Maven, Oracle DB, Git, Docker',
  },
  {
    role:    'Software Developer (SDE-I)',
    company: 'Amazon Web Services',
    location: 'Tempe, AZ',
    period:  'Sep 2022 – Dec 2023',
    current: false,
    bullets: [
      'Developed dynamic, responsive UIs using HTML5, CSS3, JavaScript, jQuery, Bootstrap, and Angular 2.',
      'Built RESTful and SOAP-based web services using Spring Boot, JAX-RS, and Apache Camel with well-defined routing.',
      'Created automated deployment pipelines in AWS CodePipeline deploying Docker containers to AWS ECS using CloudFormation, CodeBuild, and CodeDeploy.',
      'Worked extensively with Spring Kafka API for smooth message processing within Kafka Cluster setups.',
      'Gained experience in N-tier microservices using Spring Boot, Spring Cloud Config, AWS, RabbitMQ, Kafka, and Cassandra.',
      'Implemented Log4j for error logging and debugging; used Selenium for test automation.',
    ],
    env: 'Java, J2EE, Spring Boot, Angular 2, Kafka, Docker, AWS (ECS, S3, EC2), JBoss, Jenkins, Git, UNIX',
  },
  {
    role:    'Full Stack Java Developer',
    company: 'Mercy Hospital',
    location: 'Cincinnati, OH',
    period:  'Feb 2021 – Aug 2022',
    current: false,
    bullets: [
      'Developed frontend components using JSP, JSTL, jQuery, Servlets, HTML5, JavaScript, and AJAX.',
      'Implemented Spring MVC + Hibernate architecture with Spring Security for authentication and authorization.',
      'Used AWS S3 Object Storage for storing and retrieving secure files through APIs.',
      'Designed and implemented data migration strategies for migrating legacy data into Cassandra databases.',
      'Developed REST APIs using Express Router middleware with MongoDB integration.',
      'Implemented Kafka producer/consumer applications using Zookeeper; gained knowledge of Kibana and Elasticsearch.',
    ],
    env: 'Spring, Hibernate, AngularJS, Cassandra, MongoDB, Kafka, AWS, WebSphere, MySQL, JUnit, JIRA, SVN',
  },
  {
    role:    'Full Stack Java Developer',
    company: 'Cookiegen Info Technologies',
    location: 'Hyderabad, India',
    period:  'Jan 2018 – Nov 2020',
    current: false,
    bullets: [
      'Designed and developed user-friendly GUIs using HTML, jQuery, AJAX, and JavaScript following Agile methodology.',
      'Implemented Spring MVC architecture with Dependency Injection, Spring DAO, and Hibernate ORM.',
      'Deployed microservices using Concourse CI/CD and Jenkins; used NoSQL MongoDB for data persistence.',
      'Worked with Docker, Kubernetes, and Helm for containerized cloud-native deployments.',
      'Designed and configured Kafka topics and clusters across multiple environments for event-driven systems.',
      'Built enterprise apps with Spring Boot, Spring IOC, Spring Transactions, and Spring Security.',
    ],
    env: 'HTML, CSS, Node.js, Spring MVC, RESTful, MongoDB, SQL, IBM WebSphere, Oracle, JMS, Maven, Eclipse, JIRA',
  },
]

function JobCard({ job, index, accent }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-5 w-4 h-4 rounded-full border-2 z-10"
        style={{
          background: job.current ? accent : '#1a1a1a',
          borderColor: accent,
          boxShadow: job.current ? `0 0 12px ${accent}60` : 'none',
        }}
      />

      {/* Card */}
      <div
        className="bento-card mb-6 cursor-pointer select-none"
        style={{ borderColor: expanded ? `${accent}40` : '#252525' }}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="text-white font-bold text-base">{job.role}</h3>
              {job.current && (
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: `${accent}20`, color: accent }}
                >
                  ● Current
                </span>
              )}
            </div>
            <p className="font-semibold text-sm mb-1" style={{ color: accent }}>{job.company}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span>📍 {job.location}</span>
              <span>🗓 {job.period}</span>
            </div>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors mt-1 flex-shrink-0">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-5 pt-5 border-t border-[#252525]"
          >
            <ul className="space-y-2.5 mb-5">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                  <span style={{ color: accent }} className="mt-0.5 flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div
              className="rounded-lg px-4 py-3"
              style={{ background: '#111', borderLeft: `3px solid ${accent}` }}
            >
              <p className="text-xs font-bold mb-1.5" style={{ color: accent }}>ENVIRONMENT</p>
              <p className="text-xs text-gray-500 leading-relaxed">{job.env}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { theme } = useTheme()
  const accent     = theme === 'netflix' ? '#E50914' : '#FF9900'

  return (
    <section id="experience" className="section bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">Where I've Worked</p>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-divider" style={{ background: accent }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1.5 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(180deg, ${accent} 0%, transparent 100%)` }}
          />

          <div className="space-y-2">
            {JOBS.map((job, i) => (
              <JobCard key={i} job={job} index={i} accent={accent} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
