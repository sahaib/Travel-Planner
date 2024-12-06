import Image from 'next/image'

const destinations = [
  { name: 'Taj Mahal, Agra', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' },
  { name: 'Hawa Mahal, Jaipur', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { name: 'Gateway of India, Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { name: 'Golden Temple, Amritsar', image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80' },
]

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Popular Destinations in India</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((destination, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              width={600}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{destination.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

