'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  {
    number: '01',
    title: 'Performance',
    description: 'Cutting-edge engineering for unparalleled power and efficiency',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Timeless elegance meets modern aesthetics',
  },
  {
    number: '03',
    title: 'Safety',
    description: 'Advanced safety systems protecting what matters most',
  },
  {
    number: '04',
    title: 'Luxury',
    description: 'Premium materials and craftsmanship throughout',
  },
  {
    number: '05',
    title: 'Technology',
    description: 'State-of-the-art features for the modern driver',
  },
  {
    number: '06',
    title: 'Excellence',
    description: 'Uncompromising quality in every detail',
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const items = itemsRef.current

    items.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      id="features"
      ref={sectionRef}
      className="py-32 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24">
          <div className="mb-4">
            <span className="text-sm text-white/60 tracking-[0.2em] uppercase font-light">Excellence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            Premium Features
          </h2>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed">
            Every vehicle in our collection embodies the finest craftsmanship, cutting-edge technology, 
            and uncompromising attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => itemsRef.current[index] = el}
              className="bg-black p-8 border-b border-white/10 hover:border-white transition-all duration-300 group"
            >
              <div className="text-7xl font-light mb-6 group-hover:scale-110 transition-transform duration-300 tracking-tighter opacity-40">
                {feature.number}
              </div>
              <h3 className="text-xl font-light mb-4 text-white tracking-tight">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

