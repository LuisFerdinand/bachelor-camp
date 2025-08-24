// components/common/FloatingWhatsApp.tsx
'use client'
import React from 'react'
import { MessageCircle } from 'lucide-react'

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6281234567890?text=Hello%20I%20am%20interested%20in%20your%20programs', '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  )
}

export default FloatingWhatsApp