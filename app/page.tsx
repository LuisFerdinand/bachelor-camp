import Link from 'next/link';
import FloatingWA from '@/components/FloatingWA';
import TestimonialCard from '@/components/TestimonialCard';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function HomePage() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Doe",
      role: "Parent",
      content: "The camp experience was transformative for my child. Highly recommended!",
      avatar: "/avatars/john.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Student",
      content: "The IELTS preparation course helped me achieve my target score.",
      avatar: "/avatars/jane.jpg"
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "Teacher",
      content: "Working here has been incredibly rewarding. The facilities are top-notch.",
      avatar: "/avatars/robert.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Your Learning Journey
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-slide-up">
            Experience our premium camps, courses, and test preparation programs designed for your success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in">
            <Link href="/booking" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-medium">
              Book Now
            </Link>
            <Link href="/special-program" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Camp Pillar */}
            <div className="bg-background-primary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Premium Camps</h3>
              <p className="text-text-muted mb-4">Immersive learning experiences in state-of-the-art facilities with comfortable accommodations.</p>
              <Link href="/camp" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                Explore Camps →
              </Link>
            </div>
            
            {/* Course Pillar */}
            <div className="bg-background-primary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Specialized Courses</h3>
              <p className="text-text-muted mb-4">Comprehensive programs for General English, IELTS prep, and CEFR certification.</p>
              <Link href="/special-program" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                View Courses →
              </Link>
            </div>
            
            {/* Test Pillar */}
            <div className="bg-background-primary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Test Preparation</h3>
              <p className="text-text-muted mb-4">Expert guidance and resources to help you excel in your English proficiency exams.</p>
              <Link href="/special-program" className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                Prepare Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">Join thousands of satisfied students who have transformed their learning experience with us.</p>
          <Link href="/booking" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-medium">
            Book Your Spot Today
          </Link>
        </div>
      </section>

      <FloatingWA />
    </div>
  );
}