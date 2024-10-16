import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Environment, Code2Fa } from '@prisma/client';
import { Code2FaTable } from '@/components/Code2FaTable';
import { DeleteButton } from '@/components/DeleteButton';
import { deleteEnvironment } from '@/app/protected/dashboard/environments/actions';

// Adjust the deleteEnvironment function to accept string | number
const adjustedDeleteEnvironment = async (id: string | number) => {
  'use server';
  const result = await deleteEnvironment(id.toString());
  return {
    ...result,
    success: result.success === 'true', // Convert success to boolean
  };
};

export function EnvironmentCard({
  environment,
}: {
  environment: Environment & { Codes2Fa: Code2Fa[] };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold flex flex-wrap justify-between'>
          <div className='flex flex-col'>
            <div>{environment.name}</div>
            <div>{environment.type}</div>
          </div>
          <div className=''>
            <DeleteButton
              deleteAction={adjustedDeleteEnvironment}
              id={environment.id}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Code2FaTable
          codes={environment.Codes2Fa}
          environmentId={environment.id}
        />
      </CardContent>
    </Card>
  );
}
