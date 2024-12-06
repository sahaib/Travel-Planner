'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import LoadingScreen from './LoadingScreen'

const indianCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Jaipur', 'Agra', 'Varanasi', 'Udaipur', 'Rishikesh',
  'Hampi', 'Khajuraho', 'Gokarna', 'Pushkar', 'Orchha',
  'Dharamshala', 'Ladakh', 'Kaziranga', 'Kutch', 'Coorg'
]

export default function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    duration: '',
    interests: [],
    budget: '',
    currentCity: '',
    destinationCity: '',
    includeHiddenGems: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) {
      alert('Please sign in to generate an itinerary')
      return
    }
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      })

      const data = await response.json()
      if (response.ok) {
        router.push(`/itinerary/${data.itineraryId}`)
      } else {
        console.error('Failed to generate itinerary')
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">Your Preferences</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
              Your Current City
            </label>
            <input
              type="text"
              id="currentCity"
              list="indianCities"
              value={preferences.currentCity}
              onChange={(e) => setPreferences({ ...preferences, currentCity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700 mb-1">
              Destination City
            </label>
            <input
              type="text"
              id="destinationCity"
              list="indianCities"
              value={preferences.destinationCity}
              onChange={(e) => setPreferences({ ...preferences, destinationCity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Where do you want to go?"
            />
          </div>
        </div>

        <datalist id="indianCities">
          {indianCities.map(city => (
            <option key={city} value={city} />
          ))}
        </datalist>

        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            Trip Duration (days)
          </label>
          <input
            type="number"
            id="duration"
            value={preferences.duration}
            onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
            max="30"
          />
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-2">Interests</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Culture', 'Nature', 'Food', 'Adventure', 'History', 'Hidden Gems', 'Local Life', 'Architecture'].map((interest) => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={interest}
                  checked={preferences.interests.includes(interest)}
                  onChange={(e) => {
                    const newInterests = e.target.checked
                      ? [...preferences.interests, interest]
                      : preferences.interests.filter(i => i !== interest)
                    setPreferences({ ...preferences, interests: newInterests })
                  }}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range
          </label>
          <select
            id="budget"
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a range</option>
            <option value="budget">Budget (Under ₹2000/day)</option>
            <option value="mid-range">Mid-range (₹2000-5000/day)</option>
            <option value="luxury">Luxury (Above ₹5000/day)</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 text-lg font-semibold"
          disabled={isLoading}
        >
          {isLoading ? 'Crafting Your Journey...' : 'Generate Your Perfect Itinerary'}
        </motion.button>
      </motion.form>
    </>
  )
}

