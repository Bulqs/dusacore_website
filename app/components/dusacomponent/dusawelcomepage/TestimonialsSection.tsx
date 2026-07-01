import React from 'react'
import TestimonialCard from './TestimonialCard'

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-white py-4 sm:py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-appTitleBgColor mb-12 text-center">
          Client <span className="text-appBanner">Testimonials</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            text="DUSA CORE helped us rethink how our entire system operates. What started as a technology upgrade became a full operational transformation."
            name="BulQ"
          />
          <TestimonialCard
            text="The team at DUSA CORE delivered beyond expectations. Their strategic approach to system design transformed our digital infrastructure completely."
            name="SendBulq"
          />
          <TestimonialCard
            text="Working with DUSA CORE was a game-changer. They brought clarity to complex challenges and built solutions that scaled with our growth."
            name="Dusa"
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
