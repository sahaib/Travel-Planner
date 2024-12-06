'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
          alt="Taj Mahal at sunset"
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Discover India
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Your AI-powered journey through the land of wonders
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Start Your Adventure
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

