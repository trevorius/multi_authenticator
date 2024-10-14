import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

export default function AddEnvironmentPage() {

    const addEnvironment = async (formData: FormData) => {
    'use server';
    const user = await auth();
    const name = formData.get('name');
    const type = formData.get('type');

    console.log(name, type);
  };

  return (
    <div className='container mx-auto mt-8'>
      <Card className='shadow-md mx-2 md:w-1/2 md:mx-auto'>
        <CardHeader>
          <CardTitle>
            <h2 className='text-2xl font-bold'>Add an environment</h2>
          </CardTitle>
          <CardDescription>
            <p>Add an environment to your account</p>
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-row flex-wrap'>
                <div className='flex flex-col w-full lg:w-1/2 lg:pr-2'>
                  <Label htmlFor='environment-name'>Environment Name</Label>
                  <Input
                    type='text'
                    name='name'
                    id='environment-name'
                    placeholder='Environment Name'
                    required
                  />
                </div>
                <div className='flex flex-col w-full lg:w-1/2 lg:pl-2'>
                  <Label htmlFor='environment-type'>Environment Type</Label>
                  <Input
                    type='text'
                    name='type'
                    id='environment-type'
                    placeholder='Environment Type'
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-end pt-4'>
            <Button type='submit'>Sign In</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
