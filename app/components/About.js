'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

export default function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      gsap.fromTo(contentRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={contentRef}>
            <div className="mb-4">
              <span className="text-sm text-white/60 tracking-[0.2em] uppercase font-light">About</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">
              Our Showroom
            </h2>
            <div className="space-y-6 text-white/80 text-base leading-relaxed font-light mb-12">
              <p>
                From our founding to our current team of dedicated specialists, our extraordinary vehicles 
                have always been designed and built by exceptional people using only the finest materials.
              </p>
              <p>
                Every vehicle in our collection represents the pinnacle of engineering, design, and craftsmanship. 
                We carefully curate each model to ensure it meets our uncompromising standards of quality and performance.
              </p>
              <p>
                With decades of experience and a passion for automotive excellence, we continue to set new benchmarks 
                in luxury and innovation.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-4xl font-light text-white mb-2">25+</div>
                <div className="text-white/60 text-xs uppercase tracking-wide font-light">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-light text-white mb-2">1000+</div>
                <div className="text-white/60 text-xs uppercase tracking-wide font-light">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-light text-white mb-2">50+</div>
                <div className="text-white/60 text-xs uppercase tracking-wide font-light">Awards Won</div>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-[4/3] bg-black overflow-hidden border border-white relative">
              <Image
                src="https://ik.imagekit.io/us4g3mjub/showroom.png"
                alt="Luxury Showroom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

