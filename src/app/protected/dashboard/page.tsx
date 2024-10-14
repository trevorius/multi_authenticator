import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function DashboardPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Link href='/protected/dashboard/add-environment'>
          <Button>Add Environment</Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Example placeholder for environment cards */}
        <Card>
          <CardHeader>
            <CardTitle>Environment 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: Active</p>
          </CardContent>
        </Card>
        {/* Add more environment cards as needed */}
      </div>
    </div>
  );
}
