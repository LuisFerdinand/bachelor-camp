// components/layout/Footer.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500"></div>
              <span className="font-bold text-xl">Bachelor Camp</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Premium English learning experience with professional facilities and expert instructors.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-neutral-400 hover:text-brand-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-neutral-400 hover:text-brand-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-neutral-400 hover:text-brand-400 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-400 hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link href="/camp" className="text-neutral-400 hover:text-brand-400 transition-colors">Camp</Link></li>
              <li><Link href="/special-program" className="text-neutral-400 hover:text-brand-400 transition-colors">Programs</Link></li>
              <li><Link href="/about-us" className="text-neutral-400 hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-brand-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact-us" className="text-neutral-400 hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link href="/special-program" className="text-neutral-400 hover:text-brand-400 transition-colors">General English</Link></li>
              <li><Link href="/special-program" className="text-neutral-400 hover:text-brand-400 transition-colors">IELTS Preparation</Link></li>
              <li><Link href="/special-program" className="text-neutral-400 hover:text-brand-400 transition-colors">CEFR Levels</Link></li>
              <li><Link href="/camp" className="text-neutral-400 hover:text-brand-400 transition-colors">Camp Programs</Link></li>
              <li><Link href="/special-program" className="text-neutral-400 hover:text-brand-400 transition-colors">Special Courses</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-brand-500 mt-0.5" />
                <span className="text-neutral-400">123 Education Street, Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-brand-500" />
                <span className="text-neutral-400">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-brand-500" />
                <span className="text-neutral-400">info@bachelorCamp.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 bg-neutral-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Bachelor Camp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-neutral-500 hover:text-brand-400 text-sm">Privacy Policy</Link>
            <Link href="#" className="text-neutral-500 hover:text-brand-400 text-sm">Terms of Service</Link>
            <Link href="#" className="text-neutral-500 hover:text-brand-400 text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer