
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
        <h2 className="text-2xl font-bold">You are not signed in.</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Signed in as {session?.user?.name}</h2>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
