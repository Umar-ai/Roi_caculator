'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import HeroSection from '@/components/HeroSection'

function Page() {
  const { data: session, status } = useSession()

  // Wait for the session to be loaded before rendering
  if (status === 'loading') {
    return <p>Loading...</p>
  }
  
  if (status === 'authenticated' && session?.user) {
    const user: User = session.user as User
    // The CSS will now be used when the component renders with data
    return (
      <div>
        <HeroSection/>
      </div>
    )
  }

  // Handle unauthenticated state if needed
  return <p>Access Denied</p>
}

export default Page