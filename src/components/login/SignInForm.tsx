'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';

export default function SignInForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push(callbackUrl); // Redirect to dashboard or home page
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Input
                id='user-name'
                placeholder='user name'
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Input
                id='password'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          <CardFooter className='flex justify-between px-0 pt-4'>
            <Button type='submit'>Sign In</Button>
          </CardFooter>
        </form>
      </CardContent>
      <CardFooter>
        <Link href='/signup' className='text-sm text-gray-500'>
          Don't have an account...?
          <Button variant='link' className='ps-3 text-blue-500 font-bold'>
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
