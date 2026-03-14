/**
 * Project narratives — the full story behind each role.
 * Written for recruiters: problem → what I built → measurable impact.
 */
export const PROJECTS = {

  /* ──────────────────────────────────────────────────────── */
  tpwd: {
    id:       'tpwd',
    emoji:    '🏛️',
    title:    'Texas Parks & Wildlife',
    subtitle: 'Boat Titling & Registration System',
    role:     'Full Stack Java Developer',
    period:   'Jan 2023 – Present',
    location: 'Austin, TX (Hybrid)',
    badge:    '🏆 Current Role',
    accent:   '#4f8ef7',
    bg:       'linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #0d2340 100%)',

    tagline: 'Replacing a 23-Year-Old Government App with Modern Cloud Infrastructure',

    prologue: `When I joined Texas Parks & Wildlife in January 2023, the department was still processing
    every boat title and registration in Texas using Oracle Forms — technology built in the year 2000.
    TPWD staff were navigating clunky, pixel-era screens to manage 300,000+ registered boats across the
    entire state of Texas. The system hadn't had a meaningful upgrade in over two decades.

    My mission: lead the full-stack modernization and give TPWD a platform they could be proud of for
    the next 20 years.`,

    problem: {
      title: 'The Legacy Crisis',
      color: '#ef4444',
      items: [
        { icon: '🕰️', text: 'Oracle Forms app built in ~2000 — running for 23+ years with minimal changes' },
        { icon: '🖥️', text: 'Desktop-only, pixel-era UI — zero mobile or tablet support for field staff' },
        { icon: '🐌', text: 'Build and deploy cycles took hours, blocking new feature delivery' },
        { icon: '🔒', text: 'Tightly coupled monolith — impossible to scale or modernize incrementally' },
        { icon: '♿', text: 'No accessibility standards — non-compliant with federal WCAG requirements' },
      ],
    },

    solution: {
      title: 'What I Built',
      color: '#4f8ef7',
      items: [
        { icon: '⚡', text: 'Migrated frontend from CRA → Vite + React 19 + TypeScript — slashing build times by 60%+' },
        { icon: '☕', text: 'Upgraded backend from Java 11 → Java 21 with Spring Boot 3.4 — unlocking virtual threads & concurrent rendering' },
        { icon: '🏗️', text: 'Architected reusable microservice frameworks in Java 21, reducing boilerplate setup time by 40%+ across feature teams' },
        { icon: '♿', text: 'Led WCAG 2.1 compliance — ARIA attributes, keyboard navigation, screen-reader layouts validated with Axe & Lighthouse' },
        { icon: '🔐', text: 'Secured REST APIs with JWT / OAuth2 / Spring Security across all microservices' },
        { icon: '📱', text: 'Built fully responsive UIs with Flexbox, Bootstrap 5 and custom SASS — mobile & tablet ready for field staff' },
      ],
    },

    metrics: [
      { value: 60,   suffix: '%',  label: 'Faster Builds',       sub: 'CRA → Vite migration',                color: '#4f8ef7' },
      { value: 40,   suffix: '%',  label: 'Less Boilerplate',     sub: 'Reusable Java 21 framework',          color: '#4ade80' },
      { value: 300,  suffix: 'K+', label: 'Boats Served',         sub: 'TX registrations per year',           color: '#fbbf24' },
      { value: 23,   suffix: ' yr', label: 'Legacy Replaced',     sub: 'Oracle Forms 2000 → React 19',        color: '#e879f9' },
    ],

    timeline: [
      { phase: 'Discovery',     desc: 'Audited 23-year-old Oracle Forms codebase, mapped all business flows, identified migration risks' },
      { phase: 'Architecture',  desc: 'Designed microservice blueprint in Java 21 + Spring Boot 3.4 with reusable framework layer' },
      { phase: 'Frontend',      desc: 'Built React 19 + TypeScript component library, migrated CRA → Vite, established design system' },
      { phase: 'Backend',       desc: 'Java 11 → 21 upgrade, virtual thread configuration, REST APIs secured with JWT/OAuth2' },
      { phase: 'Accessibility', desc: 'WCAG 2.1 audit & remediation — ARIA, keyboard nav, Axe/Lighthouse validation' },
      { phase: 'Delivery',      desc: 'Live for TPWD staff statewide — 300K+ boat registrations now processed on modern infrastructure' },
    ],

    endUserImpact: `TPWD staff who spent years navigating a year-2000 Oracle interface now use a fast,
    accessible, mobile-friendly application. Field officers can look up and update boat registrations
    from any device. New features that once took weeks to ship now deploy in hours.`,

    tech: ['React 19', 'Vite', 'TypeScript', 'Java 21', 'Spring Boot 3.4', 'Spring Security', 'JWT/OAuth2', 'AWS S3/EC2', 'Docker', 'Maven', 'Oracle DB', 'SASS/SCSS', 'Bootstrap 5', 'Git'],
  },

  /* ──────────────────────────────────────────────────────── */
  amazon: {
    id:       'amazon',
    emoji:    '📦',
    title:    'Amazon Brand Analytics',
    subtitle: 'Seller Intelligence Platform',
    role:     'Software Developer (SDE-I)',
    period:   'Sep 2022 – Dec 2023',
    location: 'Tempe, AZ',
    badge:    '⭐ FAANG',
    accent:   '#FF9900',
    bg:       'linear-gradient(135deg, #0f0600 0%, #1a0d00 50%, #2a1800 100%)',

    tagline: 'Giving Amazon Sellers the Data Intelligence to Compete and Win',

    prologue: `At Amazon's Brand Analytics team in Tempe, Arizona, I was part of a team solving a
    critical problem: Amazon sellers — from small businesses to global brands — had vast amounts of
    data about their products but lacked the tools to make sense of it.

    I helped build the analytics platform that puts market intelligence directly in sellers' hands:
    real-time dashboards showing their product's market share, competitor performance, search term
    rankings, repeat purchase rates, and revenue trends — all in one place.`,

    problem: {
      title: "The Seller's Data Gap",
      color: '#ef4444',
      items: [
        { icon: '📊', text: 'Sellers had raw data but no way to visualize market share and competitive position' },
        { icon: '💰', text: 'Profit and revenue trends required manual spreadsheet work — time-consuming and error-prone' },
        { icon: '🔍', text: 'Search term performance data existed in silos — sellers couldn\'t connect keywords to conversions' },
        { icon: '⏱️', text: 'Analytics refreshes were slow — sellers making decisions on day-old or week-old data' },
        { icon: '📈', text: 'No unified view of repeat purchase rates, new-to-brand metrics, or customer acquisition costs' },
      ],
    },

    solution: {
      title: 'What I Built',
      color: '#FF9900',
      items: [
        { icon: '📊', text: 'Built dynamic analytics dashboards with MUI Charts — line graphs, bar charts, pie charts for market share & revenue' },
        { icon: '⚡', text: 'Developed Spring Boot REST APIs delivering seller metrics to Angular 2 frontend in under 200ms' },
        { icon: '🔄', text: 'Implemented Kafka consumer pipelines to process real-time seller event streams at scale' },
        { icon: '🚀', text: 'Created automated CI/CD: AWS CodePipeline → CodeBuild → Docker → ECS — zero-downtime deployments' },
        { icon: '🏗️', text: 'Built N-tier microservices with Spring Cloud Config, RabbitMQ, Cassandra for analytics data storage' },
        { icon: '🔐', text: 'Implemented Spring Security + OAuth2 for seller data isolation and secure multi-tenant access' },
      ],
    },

    metrics: [
      { value: 1,    suffix: 'M+', label: 'Sellers Reached',     sub: 'Via Brand Analytics platform',        color: '#FF9900' },
      { value: 200,  suffix: 'ms', label: 'API Response',         sub: 'Avg latency on analytics endpoints', color: '#4ade80' },
      { value: 99,   suffix: '.9%', label: 'Uptime SLA',          sub: 'High-availability on AWS ECS',        color: '#60a5fa' },
      { value: 100,  suffix: '%',  label: 'Kafka Events',         sub: 'Real-time seller data pipeline',      color: '#e879f9' },
    ],

    timeline: [
      { phase: 'Onboarding',   desc: 'Ramped up on Brand Analytics codebase, joined Agile sprints, presented first demo in week 3' },
      { phase: 'APIs',         desc: 'Developed RESTful analytics endpoints in Spring Boot — market share, search term, revenue APIs' },
      { phase: 'Charts UI',    desc: 'Built seller-facing dashboards with MUI Charts in Angular 2 — line, bar, pie, heatmap visuals' },
      { phase: 'Kafka',        desc: 'Implemented Kafka consumer services for real-time seller event processing and aggregation' },
      { phase: 'CI/CD',        desc: 'Automated Docker → AWS ECS deployments via CodePipeline, CodeBuild, CloudFormation' },
      { phase: 'Scale',        desc: 'Analytics dashboards rolled out to seller base — real-time insights now driving seller decisions' },
    ],

    endUserImpact: `Amazon sellers across the globe — from individual entrepreneurs to Fortune 500
    brands — now see their market position, profit trends, and competitor analytics in real-time
    dashboards. Decisions that once required a data analyst now take seconds. The platform directly
    contributes to seller growth on the world's largest e-commerce platform.`,

    tech: ['Spring Boot', 'Angular 2', 'MUI Charts', 'Apache Kafka', 'AWS ECS', 'AWS CodePipeline', 'Docker', 'Cassandra', 'RabbitMQ', 'Spring Cloud', 'Spring Security', 'Jenkins', 'Selenium', 'Git'],
  },

  /* ──────────────────────────────────────────────────────── */
  mercy: {
    id:       'mercy',
    emoji:    '🏥',
    title:    'Mercy Hospital',
    subtitle: 'Healthcare Enterprise Systems',
    role:     'Full Stack Java Developer',
    period:   'Feb 2021 – Aug 2022',
    location: 'Cincinnati, OH',
    badge:    '🏥 Healthcare IT',
    accent:   '#4ade80',
    bg:       'linear-gradient(135deg, #030f07 0%, #0a1a10 50%, #0d2a18 100%)',

    tagline: 'Building Reliable Healthcare Systems That Staff Can Trust With Patient Data',

    prologue: `Healthcare IT is unforgiving — systems must be accurate, always available, and
    completely secure. At Mercy Hospital in Cincinnati, I developed enterprise Java applications
    that clinical and administrative staff depended on daily to manage patient data, scheduling,
    and operational workflows.`,

    problem: {
      title: 'Healthcare IT Challenges',
      color: '#ef4444',
      items: [
        { icon: '🗃️', text: 'Legacy data scattered across multiple systems — no unified patient data view' },
        { icon: '🔒', text: 'Strict HIPAA compliance requirements for all data access and storage' },
        { icon: '📂', text: 'Inefficient file storage — secure document retrieval was slow and unreliable' },
        { icon: '⚙️', text: 'Aging Cassandra data migration needed — legacy data in incompatible schemas' },
        { icon: '📨', text: 'Asynchronous messaging between systems was fragile and hard to monitor' },
      ],
    },

    solution: {
      title: 'What I Built',
      color: '#4ade80',
      items: [
        { icon: '🏗️', text: 'Built Spring MVC + Hibernate architecture with Spring Security for role-based access control' },
        { icon: '☁️', text: 'Integrated AWS S3 for secure, compliant storage and retrieval of sensitive healthcare documents' },
        { icon: '🔄', text: 'Designed and executed data migration strategies — legacy schemas safely moved into Cassandra' },
        { icon: '📨', text: 'Implemented Kafka producer/consumer pipelines with Zookeeper for reliable async messaging' },
        { icon: '🧪', text: 'Developed comprehensive test suites with JUnit, Cucumber, and Selenium for HIPAA compliance verification' },
        { icon: '📊', text: 'Built REST APIs with Express Router + MongoDB for dynamic clinical reporting dashboards' },
      ],
    },

    metrics: [
      { value: 100,  suffix: '%',   label: 'HIPAA Compliant',    sub: 'All data access audited',            color: '#4ade80' },
      { value: 0,    suffix: ' breaches', label: 'Data Security', sub: 'Zero security incidents',           color: '#60a5fa' },
      { value: 18,   suffix: ' mo', label: 'Tenure',              sub: 'Feb 2021 – Aug 2022',               color: '#fbbf24' },
      { value: 3,    suffix: 'x',   label: 'Faster Retrieval',    sub: 'S3 vs legacy file system',          color: '#e879f9' },
    ],

    timeline: [
      { phase: 'Onboard',    desc: 'Audited existing Spring MVC application, mapped data flows, identified compliance gaps' },
      { phase: 'Backend',    desc: 'Implemented Spring Security RBAC, Spring AOP audit logging, Hibernate ORM layer' },
      { phase: 'AWS S3',     desc: 'Built secure document storage and retrieval system on AWS S3 with encrypted access' },
      { phase: 'Migration',  desc: 'Designed source-to-target mappings and safely migrated legacy data into Cassandra' },
      { phase: 'Kafka',      desc: 'Kafka producer/consumer setup with Zookeeper — reliable async messaging between systems' },
      { phase: 'Testing',    desc: 'JUnit, Cucumber, Selenium test suites — validated HIPAA controls across all modules' },
    ],

    endUserImpact: `Clinical staff and administrators at Mercy Hospital now work with reliable,
    fast, and secure systems. Patient documents are instantly accessible via S3. Data from legacy
    systems is fully migrated and searchable. Kafka-powered messaging means zero lost transactions
    between hospital systems.`,

    tech: ['Spring MVC', 'Spring Security', 'Hibernate', 'AWS S3', 'Cassandra', 'Apache Kafka', 'MongoDB', 'JUnit', 'Cucumber', 'Selenium', 'WebSphere', 'MySQL', 'SVN', 'JIRA'],
  },

  /* ──────────────────────────────────────────────────────── */
  cookiegen: {
    id:       'cookiegen',
    emoji:    '🚀',
    title:    'Cookiegen Info Technologies',
    subtitle: 'Full-Stack Enterprise Applications',
    role:     'Full Stack Java Developer',
    period:   'Jan 2018 – Nov 2020',
    location: 'Hyderabad, India',
    badge:    '🚀 Career Start',
    accent:   '#c084fc',
    bg:       'linear-gradient(135deg, #0c0014 0%, #1a0020 50%, #2a0030 100%)',

    tagline: 'Where It All Began — End-to-End Ownership From Day One',

    prologue: `Cookiegen was where I discovered my love for full-stack engineering.
    From day one, I had complete ownership of features — from database design through
    backend APIs to the user-facing UI. Three years here gave me a foundation that
    prepared me for everything that came next, including Amazon.`,

    problem: {
      title: 'Startup Engineering Challenges',
      color: '#ef4444',
      items: [
        { icon: '🏗️', text: 'No established architecture — needed to design scalable systems from scratch' },
        { icon: '🚀', text: 'Deployment was manual and error-prone — no CI/CD pipeline in place' },
        { icon: '📦', text: 'No container strategy — applications ran directly on bare servers' },
        { icon: '📨', text: 'Event-driven requirements with no messaging infrastructure' },
        { icon: '🔑', text: 'No centralized configuration or logging across microservices' },
      ],
    },

    solution: {
      title: 'What I Built',
      color: '#c084fc',
      items: [
        { icon: '🏗️', text: 'Designed and built Spring Boot microservices from scratch — SOLID principles throughout' },
        { icon: '🐳', text: 'Containerized all services with Docker, orchestrated with Kubernetes and Helm charts' },
        { icon: '🔄', text: 'Set up Kafka topics and clusters for event-driven architecture across multiple environments' },
        { icon: '🚀', text: 'Built CI/CD pipelines with Jenkins and Concourse — automated from commit to deployment' },
        { icon: '⚙️', text: 'Implemented Spring Config Server for centralized configuration + Splunk for centralized logging' },
        { icon: '🔐', text: 'Implemented SAML/SSO, RBAC with AJAX/JSON, and Spring Security across all services' },
      ],
    },

    metrics: [
      { value: 3,   suffix: ' yrs', label: 'Full Ownership',     sub: 'End-to-end delivery',              color: '#c084fc' },
      { value: 100, suffix: '%',    label: 'SDLC Coverage',       sub: 'Design → Deploy',                  color: '#4ade80' },
      { value: 0,   suffix: ' ops', label: 'Manual Deploys',      sub: 'After Jenkins CI/CD rollout',      color: '#60a5fa' },
      { value: 10,  suffix: '+',    label: 'Microservices',        sub: 'Deployed on Kubernetes',           color: '#fbbf24' },
    ],

    timeline: [
      { phase: 'Foundation',  desc: 'Set up Spring Boot microservice architecture, Hibernate ORM, Spring Security from scratch' },
      { phase: 'Frontend',    desc: 'Built responsive UIs with HTML/CSS/JS, jQuery, AJAX, Spring MVC and PrimeFaces JSF' },
      { phase: 'Containers',  desc: 'Dockerized all services, wrote Kubernetes manifests and Helm charts for deployment' },
      { phase: 'Kafka',       desc: 'Designed and configured Kafka topics across dev, QA, and production environments' },
      { phase: 'CI/CD',       desc: 'Jenkins + Concourse pipelines — automated test → build → deploy for every service' },
      { phase: 'Maturity',    desc: 'Splunk logging, Spring Config Server, SAML SSO — production-grade observability achieved' },
    ],

    endUserImpact: `The systems I built at Cookiegen went from zero to production-ready enterprise
    applications. Customers got reliable, fast web applications. The engineering team got a
    foundation of microservices, CI/CD, and Kubernetes that scaled with the company's growth.`,

    tech: ['Spring Boot', 'Kubernetes', 'Helm', 'Docker', 'Apache Kafka', 'Jenkins', 'MongoDB', 'Oracle DB', 'Spring Security', 'SAML/SSO', 'Splunk', 'Spring Config Server', 'IBM WebSphere', 'Maven'],
  },
}

// Map card titles → project IDs
export const CARD_TO_PROJECT = {
  'Texas Parks & Wildlife': 'tpwd',
  'Amazon Web Services':    'amazon',
  'Mercy Hospital':         'mercy',
  'Cookiegen Info Tech':    'cookiegen',
}
