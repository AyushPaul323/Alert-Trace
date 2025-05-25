import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Navigation from '@/components/Navigation'

import { ClerkProvider, currentUser } from '@clerk/nextjs';
import { UserButton } from "@clerk/nextjs";
import React from 'react'
const inter = Inter({ subsets: ['latin'] })


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Navigation />
        </body>
    </html>
    </ClerkProvider>
  )
}
