'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const vehicles = [
  {
    id: 1,
    name: 'Elite Sport',
    category: 'Sports Car',
    description: 'Unmatched performance meets elegant design. Responsive, raw and incredibly exhilarating.',
    specs: {
      power: '650 HP',
      speed: '205 MPH',
      acceleration: '3.2 SEC',
      engine: 'V8 Twin Turbo'
    },
    image: 'https://ik.imagekit.io/us4g3mjub/1.png',
  },
  {
    id: 2,
    name: 'Luxury Sedan',
    category: 'Sedan',
    description: 'Sophisticated comfort for the discerning driver. An extraordinary four-door luxury sedan.',
    specs: {
      power: '550 HP',
      speed: '195 MPH',
      acceleration: '4.1 SEC',
      engine: 'V8 Hybrid'
    },
    image: 'https://ik.imagekit.io/us4g3mjub/2.png',
  },
  {
    id: 3,
    name: 'Grand SUV',
    category: 'SUV',
    description: 'Commanding presence with refined luxury. Go-anywhere capability with handcrafted excellence.',
    specs: {
      power: '600 HP',
      speed: '190 MPH',
      acceleration: '3.8 SEC',
      engine: 'V8 Biturbo'
    },
    image: 'https://ik.imagekit.io/us4g3mjub/3.png',
  },
]

export default function VehicleShowcase() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const imagesRef = useRef([])

  useEffect(() => {
    const cards = cardsRef.current
    const images = imagesRef.current
    const cleanupFunctions = []

    cards.forEach((card, index) => {
      if (card) {
        // Card entrance animation
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Parallax effect for images
        if (images[index]) {
          gsap.to(images[index], {
            y: -50,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        // Hover animation
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.02,
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
          })
          if (images[index]) {
            gsap.to(images[index], {
              scale: 1.15,
              duration: 0.3,
              ease: 'power2.out',
            })
          }
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
          if (images[index]) {
            gsap.to(images[index], {
              scale: 1.1,
              duration: 0.3,
              ease: 'power2.out',
            })
          }
        }

        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)

        cleanupFunctions.push(() => {
          card.removeEventListener('mouseenter', handleMouseEnter)
          card.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    })

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      id="vehicles"
      ref={sectionRef}
      className="py-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="mb-4">
            <span className="text-sm text-white/60 tracking-[0.2em] uppercase font-light">Models</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            Our Collection
          </h2>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Every vehicle in our collection represents the pinnacle of engineering, design, and craftsmanship. 
            Built by hand for over a century of automotive excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-black overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <div className="aspect-[3/4] bg-black relative overflow-hidden mb-8">
                <div 
                  ref={el => imagesRef.current[index] = el}
                  className="absolute inset-0"
                >
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-contain p-12 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ transform: 'translateZ(0)' }}
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="text-white/60 text-xs tracking-[0.15em] uppercase font-light mb-2">
                    {vehicle.category}
                  </div>
                  <h3 className="text-3xl font-light text-white mb-4 tracking-tight">{vehicle.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed font-light mb-8">
                    {vehicle.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-white/20">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide font-light mb-1">Power</div>
                    <div className="text-white text-lg font-light">{vehicle.specs.power}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide font-light mb-1">Top Speed</div>
                    <div className="text-white text-lg font-light">{vehicle.specs.speed}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide font-light mb-1">0-60 MPH</div>
                    <div className="text-white text-lg font-light">{vehicle.specs.acceleration}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide font-light mb-1">Engine</div>
                    <div className="text-white text-lg font-light">{vehicle.specs.engine}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={`#vehicle-${vehicle.id}`}
                    className="flex-1 text-center py-3 border border-white text-white font-light tracking-wide uppercase hover:bg-white hover:text-black transition-all duration-300 text-sm"
                  >
                    Explore
                  </a>
                  <a
                    href="#contact"
                    className="flex-1 text-center py-3 bg-white text-black font-light tracking-wide uppercase hover:bg-white/90 transition-all duration-300 text-sm"
                  >
                    Configure
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

