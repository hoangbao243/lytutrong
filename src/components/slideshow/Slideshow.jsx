'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Slider props:
 *  - slides: [{ id, src, alt, caption? }]
 *  - interval: ms between auto slides (default 4000)
 *  - height: Tailwind-compatible height class or CSS (default 'h-[50vh]')
 */
export default function Slideshow({ data, interval = 4000, height = 'h-[40vh]'}) {
  const slides = data
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  const prev = () => setIndex((i) => (i - 1 + slides?.length) % slides?.length)
  const next = () => setIndex((i) => (i + 1) % slides?.length)
  const goTo = (i) => setIndex(i % slides?.length)

  // autoplay
  useEffect(() => {
    if (isPaused || slides?.length <= 1) return
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides?.length), interval)
    return () => clearInterval(timerRef.current)
  }, [isPaused, slides?.length, interval])

  // cleanup on unmount
  useEffect(() => () => clearInterval(timerRef.current), [])

  if (!slides || slides?.length === 0) return null

  return (
    <section
      className={`relative w-full ${height} overflow-hidden bg-gray-100 shadow-[0px_0px_7px_2px_#58545488]`}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides wrapper */}
      <div
        className="h-full flex transition-transform duration-700 ease-in-out"
        style={{ width: `${slides?.length * 100}%`, transform: `translateX(-${index * (100 / slides?.length)}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="shrink-0 w-full relative flex items-center justify-center"
            style={{ width: `${100 / slides?.length}%` }}
          >
            {/* If using next/image: use layout='fill' or responsive */}
            {/* Using simple <img> for easier drop-in */}
            <img
              src={s.src}
              alt={s.alt ?? ''}
              className={`w-full ${height} object-cover`}
              draggable={false}
            />

            {s.caption && (
              <div className="absolute left-1/2 max-w-2/3 w-fit h-fit line-clamp-4 bottom-8 -translate-x-1/2 bg-black/40 text-white hover:bg-black/70 px-4 py-2 rounded-md text-sm md:text-base">
                {s.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white p-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white p-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-white/90 scale-110' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  )
}
