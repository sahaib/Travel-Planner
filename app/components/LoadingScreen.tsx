'use client'

import { motion } from 'framer-motion'
import { FaPlaneDeparture } from 'react-icons/fa'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-green-50 bg-opacity-95 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div 
          className="text-5xl text-green-600 mb-4"
          animate={{ 
            y: [-20, 20, -20],
            x: [-50, 50, -50],
            scale: [1, 1.2, 1],
            rotate: [-10, 0, -10]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaPlaneDeparture />
        </motion.div>
        <h2 className="text-2xl font-semibold text-green-800 mb-2">Crafting Your Perfect Journey</h2>
        <p className="text-green-600">
          Planning your adventure in India...
        </p>
      </div>
    </div>
  )
} 