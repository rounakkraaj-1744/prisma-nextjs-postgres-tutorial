'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the User type to match your Prisma schema
interface User {
  id: number
  username: string
  email: string
  framework: 'NEXT_JS' | 'ASTRO' | 'NUXT_JS' | 'SVELTE'
  createdAt: string
}

export default function Details() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [router])

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="flex justify-between">
            <strong>Username:</strong> 
            <span>{user.username}</span>
          </p>
          <p className="flex justify-between">
            <strong>Email:</strong> 
            <span>{user.email}</span>
          </p>
          <p className="flex justify-between">
            <strong>Framework:</strong> 
            <span>{user.framework}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}