'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SignupResultProps {
  error?: string | null
  success?: boolean
  message?: string|null
}

export default function SignupResult({ error, success, message }: SignupResultProps) {
  const router = useRouter()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [success, router])

 
    return (
      <Alert>
        <AlertTitle>{message.includes("Failed") ? "Error" : "Success"}</AlertTitle>
        <AlertDescription>{message || "Sign up successful! Redirecting to login..."}</AlertDescription>
      </Alert>
    )
  }
