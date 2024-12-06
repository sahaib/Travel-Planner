import { auth } from '@clerk/nextjs'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { FaMapMarkerAlt, FaClock, FaWallet, FaBus, FaInfoCircle, FaUtensils, FaLightbulb } from 'react-icons/fa'
import Link from 'next/link'
import ExportPDFButton from '../../components/ExportPDFButton'

const prisma = new PrismaClient()

export default async function ItineraryPage({ params }: { params: { id: string } }) {
  const { userId } = auth()

  if (!userId) {
    return <div>Please sign in to view this itinerary.</div>
  }

  const itinerary = await prisma.itinerary.findFirst({
    where: { id: params.id, userId },
    include: { places: true },
  })

  if (!itinerary) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard" className="text-green-600 hover:underline">
          ← Back to Dashboard
        </Link>
        <ExportPDFButton itinerary={itinerary} />
      </div>

      <div id="itinerary-content">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">{itinerary.name}</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2" />
              <span>{itinerary.duration} days</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaWallet className="mr-2" />
              <span>{itinerary.budget} budget</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span>{itinerary.currentCity} → {itinerary.destinationCity}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {itinerary.interests.map((interest, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {Array.from({ length: itinerary.duration }, (_, i) => i + 1).map((day) => (
            <div key={day} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold text-white bg-green-800 p-4">Day {day}</h2>
              <div className="p-4">
                {itinerary.places
                  .filter((place) => place.day === day)
                  .sort((a, b) => a.order - b.order)
                  .map((place, idx) => (
                    <div key={place.id} className="mb-6 last:mb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-1 rounded">
                          Activity {idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-800">{place.name}</h3>
                      </div>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="divide-y divide-gray-200">
                            {place.description.split('\n').map((section, sIdx) => {
                              const [key, value] = section.split(':').map(s => s.trim())
                              return (
                                <tr key={sIdx} className="hover:bg-gray-100">
                                  <td className="px-4 py-3 whitespace-nowrap w-1/4">
                                    <div className="flex items-center">
                                      {getIconForKey(key)}
                                      <span className="ml-2 font-medium text-green-700">{key}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-gray-600">{value}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper function to get icons for different categories
function getIconForKey(key: string) {
  const iconMap = {
    Time: <FaClock className="text-green-600" />,
    Cost: <FaWallet className="text-green-600" />,
    Transport: <FaBus className="text-green-600" />,
    Description: <FaInfoCircle className="text-green-600" />,
    'Food Nearby': <FaUtensils className="text-green-600" />,
    Tips: <FaLightbulb className="text-green-600" />
  }
  return iconMap[key] || <FaMapMarkerAlt className="text-green-600" />
}

