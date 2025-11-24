'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const carImageRef = useRef(null)
  const carContainerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(carContainerRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    )

    // Parallax effect for car image
    if (carImageRef.current && heroRef.current) {
      gsap.to(carImageRef.current, {
        y: -100,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-black"></div>

      <div className="relative z-10 w-full h-screen">
        <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16">
          {/* Car Image - Full Screen */}
          <div 
            ref={carContainerRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div 
              ref={carImageRef}
              className="relative w-full h-full max-w-[90vw] max-h-[100vh]"
              style={{ filter: 'drop-shadow(0 60px 120px rgba(0, 0, 0, 0.95)) drop-shadow(0 40px 80px rgba(0, 0, 0, 0.8)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))' }}
            >
              <Image
                src="https://ik.imagekit.io/us4g3mjub/download.png"
                alt="Luxury Vehicle"
                fill
                className="object-contain object-right"
                sizes="100vw"
                priority
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
            {/* Additional shadow overlay for depth */}
            <div className="absolute bottom-0 right-0 w-full h-48 bg-gradient-to-t from-black/80 via-black/40 to-transparent blur-3xl"></div>
          </div>
        </div>

        {/* Text Content - Overlay */}
        <div className="absolute inset-0 flex items-end pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-left max-w-2xl">
              <div className="mb-3">
                <span className="text-xs text-white/60 tracking-[0.2em] uppercase font-light">Welcome to</span>
              </div>
              <h1 
                ref={titleRef}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight leading-[1.1]"
              >
                LUXURY
                <span className="block mt-1">REDEFINED</span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xs md:text-sm text-white/70 mb-6 max-w-md leading-relaxed font-light"
              >
                Experience the pinnacle of automotive excellence where engineering meets artistry.
              </p>
              
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#vehicles"
                  className="inline-block px-6 py-2.5 bg-white text-black font-light tracking-wide uppercase hover:bg-white/90 transition-all duration-300 text-xs"
                >
                  Explore Collection
                </a>
                <a
                  href="#about"
                  className="inline-block px-6 py-2.5 border border-white text-white font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 text-xs"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

