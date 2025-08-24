'use client'

import { useState } from 'react';
import Link from 'next/link';

interface RoomType {
  id: number;
  name: string;
  description: string;
  capacity: string;
  price: string;
  image: string;
}

interface ClassType {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export default function CampPage() {
  const [activeTab, setActiveTab] = useState<string>('rooms');
  
  const roomTypes: RoomType[] = [
    {
      id: 1,
      name: "Standard Room",
      description: "Comfortable room with shared bathroom facilities",
      capacity: "2-3 people",
      price: "Rp 500,000/night",
      image: "/rooms/standard.jpg"
    },
    {
      id: 2,
      name: "Deluxe Room",
      description: "Spacious room with private bathroom and workspace",
      capacity: "1-2 people",
      price: "Rp 750,000/night",
      image: "/rooms/deluxe.jpg"
    },
    {
      id: 3,
      name: "Suite",
      description: "Premium suite with living area and private balcony",
      capacity: "1-2 people",
      price: "Rp 1,200,000/night",
      image: "/rooms/suite.jpg"
    }
  ];
  
  const classTypes: ClassType[] = [
    {
      id: 1,
      name: "General English",
      description: "Comprehensive English language course for all levels",
      duration: "1-4 weeks",
      price: "Rp 3,500,000/week",
      image: "/classes/general-english.jpg"
    },
    {
      id: 2,
      name: "Business English",
      description: "Professional communication skills for the workplace",
      duration: "2 weeks",
      price: "Rp 4,500,000/week",
      image: "/classes/business-english.jpg"
    },
    {
      id: 3,
      name: "Academic English",
      description: "Preparation for university studies in English",
      duration: "4-12 weeks",
      price: "Rp 4,000,000/week",
      image: "/classes/academic-english.jpg"
    }
  ];
  
  const facilities: Facility[] = [
    {
      id: 1,
      name: "Modern Classrooms",
      description: "Well-equipped with interactive technology",
      icon: "📚"
    },
    {
      id: 2,
      name: "Library & Study Areas",
      description: "Quiet spaces for focused learning",
      icon: "📖"
    },
    {
      id: 3,
      name: "Recreation Center",
      description: "Indoor and outdoor activities",
      icon: "🏀"
    },
    {
      id: 4,
      name: "Dining Hall",
      description: "Nutritious meals with dietary options",
      icon: "🍽️"
    },
    {
      id: 5,
      name: "High-Speed WiFi",
      description: "Throughout the campus",
      icon: "📶"
    },
    {
      id: 6,
      name: "24/7 Security",
      description: "Safe and secure environment",
      icon: "🔒"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Premium Learning Camps</h1>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Immerse yourself in our state-of-the-art facilities designed for optimal learning and comfort.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="bg-background-secondary sticky top-16 z-10 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`px-6 py-4 font-medium ${activeTab === 'rooms' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Room Types
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-6 py-4 font-medium ${activeTab === 'classes' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Class Types
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-6 py-4 font-medium ${activeTab === 'facilities' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-text-muted hover:text-text-primary'}`}
            >
              Facilities
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 bg-background-primary">
        <div className="container mx-auto px-4">
          {/* Room Types Tab */}
          {activeTab === 'rooms' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Accommodation Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roomTypes.map((room) => (
                  <div key={room.id} className="bg-background-secondary rounded-xl shadow-medium overflow-hidden hover:shadow-glow transition-shadow">
                    <div className="h-48 bg-gradient-subtle"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{room.name}</h3>
                      <p className="text-text-muted mb-4">{room.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-text-secondary">Capacity: {room.capacity}</span>
                        <span className="font-semibold text-primary-600">{room.price}</span>
                      </div>
                      <Link href="/booking" className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors">
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Class Types Tab */}
          {activeTab === 'classes' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Available Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {classTypes.map((classItem) => (
                  <div key={classItem.id} className="bg-background-secondary rounded-xl shadow-medium overflow-hidden hover:shadow-glow transition-shadow">
                    <div className="h-48 bg-gradient-muted"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-text-primary mb-2">{classItem.name}</h3>
                      <p className="text-text-muted mb-4">{classItem.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-text-secondary">Duration: {classItem.duration}</span>
                        <span className="font-semibold text-primary-600">{classItem.price}</span>
                      </div>
                      <Link href="/booking" className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-colors">
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities Tab */}
          {activeTab === 'facilities' && (
            <div>
              <h2 className="text-3xl font-bold text-center text-text-primary mb-12">Camp Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((facility) => (
                  <div key={facility.id} className="bg-background-secondary rounded-xl shadow-medium p-6 hover:shadow-glow transition-shadow">
                    <div className="text-4xl mb-4">{facility.icon}</div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">{facility.name}</h3>
                    <p className="text-text-muted">{facility.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Camp?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">Book your spot today and transform your learning experience.</p>
          <Link href="/booking" className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-medium">
            Book Your Camp Experience
          </Link>
        </div>
      </section>
    </div>
  );
}