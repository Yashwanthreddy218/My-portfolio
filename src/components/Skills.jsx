import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const TABS = [
  {
    id: 'backend',
    label: 'Backend & Java',
    emoji: '☕',
    skills: [
      'Java 8 / 21', 'J2EE', 'Spring Boot 3.4', 'Spring MVC', 'Spring Security',
      'Spring Data JPA', 'Spring Batch', 'Spring Cloud', 'Hibernate', 'JPA',
      'Servlets', 'JSP', 'JMS', 'EJB', 'JDBC', 'Struts', 'Microservices',
      'REST API', 'SOAP', 'JAX-RS', 'JAX-WS', 'gRPC', 'GraphQL',
      'Lambda / Streams', 'Multithreading',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    emoji: '🎨',
    skills: [
      'React 19', 'Angular 8/11', 'TypeScript', 'Next.js', 'Vite',
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'Bootstrap 5', 'Tailwind CSS',
      'SASS / SCSS', 'jQuery', 'AJAX', 'JSON', 'Redux',
      'Framer Motion', 'WCAG 2.1 / a11y', 'Responsive Design',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    emoji: '☁️',
    skills: [
      'AWS (EC2, S3, ECS, VPC)', 'AWS CodePipeline', 'AWS CloudFormation',
      'Docker', 'Kubernetes', 'Helm', 'Jenkins', 'CI/CD',
      'Pivotal Cloud Foundry (PCF)', 'IBM Cloud',
      'Linux / Shell Scripting', 'Apache Tomcat', 'JBoss', 'WebSphere', 'WebLogic',
    ],
  },
  {
    id: 'database',
    label: 'Databases',
    emoji: '🗄️',
    skills: [
      'Oracle', 'MySQL', 'SQL Server', 'IBM DB2',
      'MongoDB', 'Cassandra', 'NoSQL',
      'Hibernate ORM', 'JPA', 'Complex SQL / Stored Procedures',
      'CRUD Operations', 'Data Migration',
    ],
  },
  {
    id: 'messaging',
    label: 'Messaging & APIs',
    emoji: '📡',
    skills: [
      'Apache Kafka', 'RabbitMQ', 'ActiveMQ',
      'JWT / OAuth2', 'Spring Security', 'SAML / SSO',
      'Postman', 'SOAP UI', 'OpenAPI v3',
      'XML / XSLT / XSD', 'WSDL / UDDI', 'Apache Camel',
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Testing',
    emoji: '🔧',
    skills: [
      'Git', 'JIRA', 'Maven', 'Gradle', 'Ant',
      'JUnit', 'Mockito', 'Selenium', 'Cucumber',
      'SonarQube', 'Log4j', 'Kibana / Elasticsearch',
      'IntelliJ IDEA', 'Eclipse', 'VS Code', 'Spring Tool Suite',
    ],
  },
]

export default function Skills() {
  const { theme } = useTheme()
  const accent     = theme === 'netflix' ? '#E50914' : '#FF9900'
  const [active, setActive] = useState('backend')

  const current = TABS.find(t => t.id === active)

  return (
    <section id="skills" className="section" style={{ background: '#111' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-divider" style={{ background: accent }} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border"
              style={
                active === tab.id
                  ? { background: accent, color: '#000', borderColor: accent }
                  : { background: 'transparent', color: '#888', borderColor: '#2a2a2a' }
              }
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {current.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025, duration: 0.25 }}
                className="skill-pill"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-xs mt-6"
        >
          {current.skills.length} skills in this category · {TABS.reduce((a, t) => a + t.skills.length, 0)} total across all categories
        </motion.p>

      </div>
    </section>
  )
}
