'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import VehicleShowcase from './components/VehicleShowcase'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <VehicleShowcase />
      <Features />
      <About />
      <Footer />
    </main>
  )
}