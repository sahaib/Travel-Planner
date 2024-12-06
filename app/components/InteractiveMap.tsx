'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const states = [
  { id: 'delhi', name: 'Delhi', path: 'M200,100 L210,110 L200,120 L190,110 Z', attractions: ['Red Fort', 'India Gate'] },
  { id: 'maharashtra', name: 'Maharashtra', path: 'M100,250 L150,250 L150,300 L100,300 Z', attractions: ['Gateway of India', 'Ajanta Caves'] },
  { id: 'rajasthan', name: 'Rajasthan', path: 'M50,150 L100,150 L100,200 L50,200 Z', attractions: ['Hawa Mahal', 'Amber Fort'] },
  { id: 'kerala', name: 'Kerala', path: 'M150,400 L200,400 L200,450 L150,450 Z', attractions: ['Backwaters', 'Munnar'] },
  { id: 'westbengal', name: 'West Bengal', path: 'M300,200 L350,200 L350,250 L300,250 Z', attractions: ['Victoria Memorial', 'Sundarbans'] },
]

export default function InteractiveMap() {
  const [activeState, setActiveState] = useState(null)

  return (
    <div className="relative w-full h-[500px] bg-blue-100 rounded-lg overflow-hidden">
      <svg viewBox="0 0 400 500" className="w-full h-full">
        {states.map((state) => (
          <motion.path
            key={state.id}
            d={state.path}
            fill={activeState === state.id ? 'red' : 'green'}
            stroke="white"
            strokeWidth="2"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveState(state.id)}
          />
        ))}
      </svg>
      <AnimatePresence>
        {activeState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-bold">{states.find(s => s.id === activeState).name}</h3>
            <p className="text-sm text-gray-600 mb-2">Popular attractions:</p>
            <ul className="list-disc list-inside">
              {states.find(s => s.id === activeState).attractions.map((attraction, index) => (
                <li key={index} className="text-sm">{attraction}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

