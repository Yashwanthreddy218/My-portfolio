import { motion } from 'framer-motion'

const SNIPPETS = [
  {
    code: `@RestController
@RequestMapping("/api/boats")
public class BoatController {
  @GetMapping
  List<Boat> getAll() {
    return service.findAll();
  }
}`,
    top: '8%', left: '2%', duration: 18, delay: 0,
  },
  {
    code: `@KafkaListener(topics = "seller-events")
public void process(SellerEvent e) {
  analyticsService.aggregate(e);
  metricsStore.update(e.getSellerId());
}`,
    top: '5%', right: '4%', duration: 22, delay: 3,
  },
  {
    code: `const [data, setData] = useState([])
useEffect(() => {
  fetchAnalytics(sellerId)
    .then(setData)
}, [sellerId])`,
    bottom: '18%', left: '3%', duration: 20, delay: 6,
  },
  {
    code: `@Service @Transactional
public class BoatService {
  // Java 21 virtual threads
  ExecutorService exec =
    Executors.newVirtualThreadPerTaskExecutor();
}`,
    top: '42%', right: '2%', duration: 25, delay: 2,
  },
  {
    code: `<Suspense fallback={<Loader />}>
  <BoatDashboard
    registrations={boats}
    onUpdate={handleUpdate}
  />
</Suspense>`,
    bottom: '10%', right: '5%', duration: 19, delay: 9,
  },
]

export default function CodeFloat() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {SNIPPETS.map((s, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          style={{
            position: 'absolute',
            top:    s.top,
            left:   s.left,
            right:  s.right,
            bottom: s.bottom,
            opacity: 0.08,
            filter: 'blur(0.3px)',
          }}
        >
          <pre style={{
            fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
            fontSize:   '0.72rem',
            color:      '#fff',
            lineHeight: 1.7,
            whiteSpace: 'pre',
            margin:     0,
          }}>
            {s.code}
          </pre>
        </motion.div>
      ))}
    </div>
  )
}
