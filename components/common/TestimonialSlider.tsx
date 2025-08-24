'use client'
import React, { useState, useEffect } from 'react'
import {TestimonialCard} from './TestimonialCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ 
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemsPerSlide, setItemsPerSlide] = useState(1)

  // Calculate items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth
      if (width >= 1024) { // lg breakpoint
        setItemsPerSlide(3)
      } else if (width >= 768) { // md breakpoint
        setItemsPerSlide(2)
      } else {
        setItemsPerSlide(1)
      }
    }

    updateItemsPerSlide()
    window.addEventListener('resize', updateItemsPerSlide)
    return () => window.removeEventListener('resize', updateItemsPerSlide)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= itemsPerSlide) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isPaused, itemsPerSlide, maxIndex])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // Calculate the number of indicator dots needed
  const indicatorCount = Math.max(1, maxIndex + 1)

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div 
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`flex-shrink-0 px-2 ${
                itemsPerSlide === 1 ? 'w-full' : 
                itemsPerSlide === 2 ? 'w-1/2' : 'w-1/3'
              }`}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only show if there are more items than can be displayed */}
      {testimonials.length > itemsPerSlide && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators - Only show if there are multiple slides */}
      {indicatorCount > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: indicatorCount }, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { TestimonialSlider }