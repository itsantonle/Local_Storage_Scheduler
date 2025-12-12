import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Local Storage Scheduler - Manage Your Schedule Offline',
  description:
    'A powerful, offline-first schedule management app for students. No signups, no cloud storage - your data stays with you.',

  icons: {
    icon: [
      {
        url: '/lss_icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/lss_icon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/lss_icon.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
