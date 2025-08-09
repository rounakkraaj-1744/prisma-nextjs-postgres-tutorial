'use client'

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [framework, setFramework] = useState("")
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, framework }),
      })
      if (response.ok) {
        alert('Signup successful!')
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFramework("")
      }
      else {
        const data = await response.json()
        alert(`Signup failed: ${data.error}`)
      }
    }
    catch (error) {
      console.error('Signup error:', error)
      alert('An error occurred during signup')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to access the extra features</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="John Doe" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@xmail.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cnfpassword">Confirm Password</Label>
              <Input id="cnfpassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*********"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="NEXT_JS">Next.js</SelectItem>
                  <SelectItem value="SVELTE">SvelteKit</SelectItem>
                  <SelectItem value="ASTRO">Astro</SelectItem>
                  <SelectItem value="NUXT_JS">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            
              <Button variant="outline" type="button" onClick={()=>router.push("/login")}>Log In</Button>
            
            <Button type="submit">Sign Up</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}