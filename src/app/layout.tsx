import './globals.css'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'EggWorth - Net Worth in Eggs',
  description: 'See how many eggs your net worth is equivalent to, and compare with the richest people in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
} 