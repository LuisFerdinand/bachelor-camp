'use client'

import { useState } from 'react';
import Link from 'next/link';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface Accreditation {
  id: number;
  name: string;
  logo: string;
}

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState<string>('story');
  
  const milestones: Milestone[] = [
    {
      year: "2010",
      title: "Founded",
      description: "Established with a vision to provide quality English education in Indonesia."
    },
    {
      year: "2012",
      title: "First Campus",
      description: "Opened our first campus in Jakarta with state-of-the-art facilities."
    },
    {
      year: "2015",
      title: "International Recognition",
      description: "Received accreditation from international education bodies."
    },
    {
      year: "2018",
      title: "Expansion",
      description: "Expanded to three major cities across Indonesia."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched online learning platforms during the global pandemic."
    },
    {
      year: "2023",
      title: "10th Anniversary",
      description: "Celebrating a decade of excellence in English education."
    }
  ];
  
  const accreditations: Accreditation[] = [
    {
      id: 1,
      name: "British Council",
      logo: "/accreditations/british-council.png"
    },
    {
      id: 2,
      name: "Cambridge English",
      logo: "/accreditations/cambridge.png"
    },
    {
      id: 3,
      name: "IELTS Official Test Center",
      logo: "/accreditations/ielts.png"
    },
    {
      id: 4,
      name: "Ministry of Education",
      logo: "/accreditations/education-ministry.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Learn about our journey, mission, and commitment to providing quality English education.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="bg-background-secondary sticky top-16 z-10 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('story')}
              className={`px-6 py-4 font-medium ${activeTab === 'story' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-4 font-medium ${activeTab === 'mission' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Mission & Vision
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-6 py-4 font-medium ${activeTab === 'team' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Our Team
            </button>
            <button
              onClick={() => setActiveTab('accreditations')}
              className={`px-6 py-4 font-medium ${activeTab === 'accreditations' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Accreditations
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 bg-background-primary flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Our Story Tab */}
          {activeTab === 'story' && (
            <div className="animate-fade-in">
              <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Our Journey</h2>
                <p className="text-text-secondary mb-6">
                  Founded in 2010, our institution began with a simple mission: to provide high-quality English education that empowers individuals to achieve their personal and professional goals. Over the years, we've grown from a small language center to a comprehensive educational institution with multiple campuses across Indonesia.
                </p>
                <p className="text-text-secondary mb-6">
                  Our commitment to excellence has been recognized through numerous awards and accreditations. We've helped thousands of students improve their English skills, prepare for international exams, and succeed in their academic and professional pursuits.
                </p>
                <p className="text-text-secondary">
                  Today, we continue to innovate and expand our programs to meet the evolving needs of our students in an increasingly globalized world.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Our Milestones</h2>
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className="w-1/2 pr-8">
                        <div className="bg-background-secondary rounded-xl shadow-medium p-6">
                          <div className="text-primary-600 font-bold text-lg mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-semibold text-text-primary mb-2">{milestone.title}</h3>
                          <p className="text-text-secondary">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="w-1/2 flex justify-center items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-600 border-4 border-background-primary z-10"></div>
                      </div>
                      <div className="w-1/2 pl-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mission & Vision Tab */}
          {activeTab === 'mission' && (
            <div className="animate-fade-in">
              <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Our Mission</h2>
                <p className="text-text-secondary mb-8">
                  To provide exceptional English language education that empowers individuals to achieve their personal, academic, and professional goals in a globalized world.
                </p>
                
                <h2 className="text-2xl font-bold text-text-primary mb-6">Our Vision</h2>
                <p className="text-text-secondary mb-8">
                  To be the leading English education institution in Indonesia, recognized for our innovative teaching methods, outstanding student outcomes, and commitment to excellence.
                </p>
                
                <h2 className="text-2xl font-bold text-text-primary mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-background-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Excellence</h3>
                    <p className="text-text-secondary">We strive for the highest standards in teaching, curriculum, and student support.</p>
                  </div>
                  <div className="bg-background-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Innovation</h3>
                    <p className="text-text-secondary">We embrace new technologies and methodologies to enhance learning outcomes.</p>
                  </div>
                  <div className="bg-background-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Integrity</h3>
                    <p className="text-text-secondary">We operate with honesty, transparency, and ethical behavior in all we do.</p>
                  </div>
                  <div className="bg-background-primary rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Community</h3>
                    <p className="text-text-secondary">We foster a supportive, inclusive environment where everyone can thrive.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Team Tab */}
          {activeTab === 'team' && (
            <div className="animate-fade-in">
              <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Meet Our Leadership Team</h2>
                <p className="text-text-secondary mb-8">
                  Our team consists of experienced educators, administrators, and support staff who are passionate about English education and committed to helping our students succeed.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-subtle mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Dr. Sarah Johnson</h3>
                    <p className="text-text-secondary mb-3">Founder & Director</p>
                    <p className="text-text-sm text-text-muted">PhD in Applied Linguistics with over 20 years of experience in English education.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-subtle mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Michael Chen</h3>
                    <p className="text-text-secondary mb-3">Academic Director</p>
                    <p className="text-text-sm text-text-muted">Former IELTS examiner with 15 years of teaching experience across Asia.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-subtle mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Emily Williams</h3>
                    <p className="text-text-secondary mb-3">Operations Manager</p>
                    <p className="text-text-sm text-text-muted">MBA with expertise in educational management and student services.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-secondary rounded-xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
                <p className="max-w-2xl mx-auto mb-6">We're always looking for passionate educators and professionals to join our team.</p>
                <Link href="/contact-us" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-medium inline-block">
                  View Open Positions
                </Link>
              </div>
            </div>
          )}

          {/* Accreditations Tab */}
          {activeTab === 'accreditations' && (
            <div className="animate-fade-in">
              <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Our Accreditations</h2>
                <p className="text-text-secondary mb-8">
                  We are proud to be accredited by leading international and national educational organizations. These accreditations reflect our commitment to maintaining the highest standards of English language education.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {accreditations.map((accreditation) => (
                    <div key={accreditation.id} className="bg-background-primary rounded-lg p-6 flex flex-col items-center">
                      <div className="w-24 h-24 bg-gradient-subtle rounded-lg mb-4"></div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{accreditation.name}</h3>
                      <p className="text-text-secondary text-center">Recognized for excellence in English language teaching and assessment.</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-background-secondary rounded-xl shadow-medium p-6 md:p-8 mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Testimonial Video</h2>
                <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-text-secondary">Play testimonial video</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}