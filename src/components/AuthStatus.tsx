
'use client'

import { useSession } from "next-auth/react"
import { signIn, signOut } from "next-auth/react"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

  return (
    <div>
      <p>Signed in as {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
