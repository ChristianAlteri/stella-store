import type { Metadata } from 'next'
import { Arimo } from 'next/font/google'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/NavBar/NavBar'
import ToastProvider from '@/providers/toast-provider'

const font = Arimo({
  weight: '400',

  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '@nondrobe',
  description: "@@@",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
