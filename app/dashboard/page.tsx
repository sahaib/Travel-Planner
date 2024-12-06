import { auth } from '@clerk/nextjs'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    return <div>Please sign in to view your dashboard.</div>
  }

  const itineraries = await prisma.itinerary.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Itineraries</h1>
      {itineraries.length === 0 ? (
        <p>You haven't created any itineraries yet. <Link href="/" className="text-green-600 hover:underline">Create one now!</Link></p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{itinerary.name}</h2>
              <p className="text-gray-600 mb-4">{itinerary.duration} days • {itinerary.budget} budget</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {itinerary.interests.map((interest, index) => (
                  <span key={index} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {interest}
                  </span>
                ))}
              </div>
              <Link href={`/itinerary/${itinerary.id}`} className="text-green-600 hover:underline">
                View Itinerary
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

