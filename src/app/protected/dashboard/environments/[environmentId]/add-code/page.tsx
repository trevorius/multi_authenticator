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

export default async function AddCodePage({
  params,
  searchParams,
}: {
  params: { environmentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const createCode = async (formData: FormData) => {
    'use server';
    const name = formData.get('name') as string;
    const secretCode = formData.get('secretCode') as string;
    const environmentId = formData.get('environmentId') as string;

    try {
      const newCode = await prisma.code2Fa.create({
        data: {
          name,
          SecretCode: secretCode,
          EnvironmentId: environmentId,
        },
      });

      return { success: true, code: newCode };
    } catch (error) {
      console.error('Error creating code:', error);
      return { success: false, error: 'Failed to create code' };
    }
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
