import { redirect } from 'next/navigation';
import prisma from '@/services/prisma';
import bcrypt from 'bcryptjs';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SignupResult from '@/components/login/SignupResult'


export default function SignupForm({
  searchParams
}: {
  searchParams: { message: string }
}) {
  
  
  async function signUp(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (!name || !email || !username || !password) {
      throw redirect('/signup?message=All fields are required')
      return
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          email,
          username,
          password: hashedPassword,
        },
      })
    } catch (error) {
      console.error('Error creating user:', error)
      throw redirect('/signup?message=Failed to create user')
    }
    throw redirect('/signin?message=Sign up successful!')
  }



  return (
    <form action={signUp} className="space-y-4 max-w-md mx-auto">
      <SignupResult message={searchParams.message} />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" placeholder="Name" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" placeholder="Email" required />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" name="username" placeholder="Username" required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" placeholder="Password" required />
      </div>
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
  );
}