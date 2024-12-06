import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { ClerkProvider, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'India Travel Planner',
  description: 'AI-powered travel itineraries for exploring India',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = auth()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="bg-green-800 text-white p-4 sticky top-0 z-10">
            <nav className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold hover:text-green-200 transition duration-300">
                India Travel Planner
              </Link>
              <ul className="flex space-x-6 items-center">
                <li><Link href="/" className="hover:text-green-200 transition duration-300">Home</Link></li>
                <li><Link href="/destinations" className="hover:text-green-200 transition duration-300">Destinations</Link></li>
                <li><Link href="/about" className="hover:text-green-200 transition duration-300">About</Link></li>
                <li><Link href="/contact" className="hover:text-green-200 transition duration-300">Contact</Link></li>
                {userId ? (
                  <>
                    <li><Link href="/dashboard" className="hover:text-green-200 transition duration-300">Dashboard</Link></li>
                    <li><UserButton afterSignOutUrl="/" /></li>
                  </>
                ) : (
                  <li><SignInButton mode="modal" /></li>
                )}
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-green-800 text-white p-8 mt-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">India Travel Planner</h3>
                <p className="text-sm">Your AI-powered journey through the land of wonders.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-green-200 transition duration-300">Home</Link></li>
                  <li><Link href="/destinations" className="hover:text-green-200 transition duration-300">Destinations</Link></li>
                  <li><Link href="/about" className="hover:text-green-200 transition duration-300">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-green-200 transition duration-300">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-green-200 transition duration-300">Facebook</a>
                  <a href="#" className="hover:text-green-200 transition duration-300">Twitter</a>
                  <a href="#" className="hover:text-green-200 transition duration-300">Instagram</a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-sm">
              <p>&copy; 2023 India Travel Planner. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}

