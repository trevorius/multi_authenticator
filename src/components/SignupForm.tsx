import { redirect } from 'next/navigation';
import prisma from '@/services/prisma';
import bcrypt from 'bcryptjs';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

async function signUp(formData: FormData) {
  'use server'

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !username || !password) {
    return { error: 'All fields are required' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    redirect('/login');
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user' };
  }
}

export default function SignupForm() {
  return (
    <form action={signUp} className="space-y-4 max-w-md mx-auto">
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