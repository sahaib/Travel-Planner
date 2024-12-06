import Hero from './components/Hero'
import PopularDestinations from './components/PopularDestinations'
import InteractiveMap from './components/InteractiveMap'
import PreferencesForm from './components/PreferencesForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">Explore India's Wonders</h2>
        <PopularDestinations />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">Discover Destinations</h3>
            <InteractiveMap />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">Plan Your Journey</h3>
            <PreferencesForm />
          </div>
        </div>
      </div>
    </main>
  )
}

