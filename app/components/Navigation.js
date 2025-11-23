'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo('.mobile-menu', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
    }
  }, [isMobileMenuOpen])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-light tracking-widest text-white uppercase">LUXURY SHOWROOM</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              <a href="#home" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide uppercase font-light">Models</a>
              <a href="#vehicles" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide uppercase font-light">Collection</a>
              <a href="#features" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide uppercase font-light">Features</a>
              <a href="#about" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide uppercase font-light">About</a>
              <a href="#contact" className="text-sm text-white hover:text-white/70 transition-colors tracking-wide uppercase font-light">Contact</a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <a href="#vehicles" className="text-sm text-white border border-white px-6 py-2 hover:bg-white hover:text-black transition-all duration-300 tracking-wide uppercase font-light">
              Request Test Drive
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-black/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#vehicles" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Vehicles</a>
            <a href="#features" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Features</a>
            <a href="#about" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">About</a>
            <a href="#contact" className="block px-3 py-2 text-white hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}

