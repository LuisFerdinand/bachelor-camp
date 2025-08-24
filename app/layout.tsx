import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import FloatingWA from '@/components/common/FloatingWA'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EduCamp - English Learning Center',
  description: 'Premium English learning experience with professional facilities and expert instructors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="relative">
          {children}
        </main>
        <FloatingWA />
        <Footer />
      </body>
    </html>
  )
}