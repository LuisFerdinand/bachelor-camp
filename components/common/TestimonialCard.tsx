'use client'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 text-brand-500">
          <Quote className="h-8 w-8" />
        </div>
        <div className="flex mb-4">
          {renderStars()}
        </div>
        <p className="text-neutral-600 mb-6 flex-grow italic">&quot;{testimonial.content}&quot;</p>
        <div className="flex items-center mt-auto">
          {testimonial.avatar ? (
            <img 
              src={testimonial.avatar} 
              alt={testimonial.name} 
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold mr-4">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-neutral-500">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { TestimonialCard }