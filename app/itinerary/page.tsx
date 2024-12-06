import { notFound } from 'next/navigation'
import { db } from '../../lib/db'

export default async function ItineraryPage() {
  // Replace with actual user ID from authentication
  const userId = 'user123'

  const itinerary = await db.itinerary.findFirst({
    where: { userId },
    include: { places: true },
    orderBy: { createdAt: 'desc' },
  })

  if (!itinerary) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{itinerary.name}</h1>
      <div className="grid gap-6">
        {Array.from({ length: itinerary.duration }, (_, i) => i + 1).map((day) => (
          <div key={day} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Day {day}</h2>
            <ul className="space-y-4">
              {itinerary.places
                .filter((place) => place.day === day)
                .sort((a, b) => a.order - b.order)
                .map((place) => (
                  <li key={place.id}>
                    <h3 className="text-xl font-medium">{place.name}</h3>
                    <p className="text-gray-600">{place.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

