import { motion } from 'framer-motion'


export default function DeliveryInfo({ info }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose max-w-none"
    >
      {info.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </motion.div>
  )
}

