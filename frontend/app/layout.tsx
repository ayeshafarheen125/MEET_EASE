import type { Metadata } from 'next'
import { Suspense } from 'react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import Image from 'next/image'
import Chatbot from '@/components/Chatbot'
import TopBar from '@/components/TopBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'MeetEase - AI-Powered Meeting Transcriptions & Notes',
  description: 'MeetEase - AI-powered meeting transcriptions and notes',
  generator: 'MeetEase',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <TopBar />
        </Suspense>
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}