import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import prisma from '@/services/prisma';
import { Label } from '@/components/ui/label';
import { AddToast } from '@/components/AddToast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUser } from '@/auth';

export default async function AddCodePage({
  params,
  searchParams,
}: {
  params: { environmentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const createCode = async (formData: FormData) => {
    'use server';
    const user = await getUser();
    if (!user) {
      const randomCallId = Math.random().toString(36).substring(2, 15);
      const searchParams = new URLSearchParams();
      searchParams.set('title', 'Unauthorized');
      searchParams.set('description', 'Unauthorized');
      searchParams.set('variant', 'destructive');
      searchParams.set('callId', randomCallId);
      throw redirect('/protected/dashboard/?' + searchParams.toString());
    }
    const name = formData.get('name') as string;
    const secretCode = formData.get('secretCode') as string;
    const environmentId = formData.get('environmentId') as string;

    try {
      const newCode = await prisma.code2Fa.create({
        data: {
          name,
          secretCode: secretCode,
          EnvironmentId: environmentId,
        },
      });
    } catch (error) {
      console.error('Error creating code:', error);
      const randomCallId = Math.random().toString(36).substring(2, 15);
      const searchParams = new URLSearchParams();
      searchParams.set('title', 'Failed to create code');
      searchParams.set('description', 'Failed to create code');
      searchParams.set('variant', 'destructive');
      searchParams.set('callId', randomCallId);
      throw redirect(
        '/protected/dashboard/environments/' +
          environmentId +
          '/add-code/' +
          '?' +
          searchParams.toString()
      );
    }
    const randomCallId = Math.random().toString(36).substring(2, 15);
    const searchParams = new URLSearchParams();
    searchParams.set('title', 'Code created');
    searchParams.set('description', 'Code created');
    searchParams.set('variant', 'success');
    searchParams.set('callId', randomCallId);
    throw redirect('/protected/dashboard/?' + searchParams.toString());
  };

  return (
    <div className='container mx-auto mt-8'>
      <AddToast
        title={searchParams.title as string}
        description={searchParams.description as string}
        variant={searchParams.variant as string}
        callId={searchParams.call as string}
      />
      <Card className='shadow-md mx-2 md:w-1/2 md:mx-auto'>
        <CardHeader>
          <CardTitle>
            <div className='text-2xl font-bold'>Add a 2fa code</div>
          </CardTitle>
          <CardDescription>Add a 2fa code to your environment</CardDescription>
        </CardHeader>
        <form action={createCode} className='space-y-4'>
          <CardContent>
            <input
              type='hidden'
              name='environmentId'
              value={params.environmentId}
            />
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input type='text' id='name' name='name' required />
            </div>
            <div>
              <Label htmlFor='secretCode'>Secret Code</Label>
              <Input type='text' id='secretCode' name='secretCode' required />
            </div>
          </CardContent>
          <CardFooter className='flex justify-end pt-4'>
            <Button type='submit'>Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
