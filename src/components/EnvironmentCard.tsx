import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Environment, Code2Fa } from '@prisma/client';
import { Code2FaTable } from '@/components/Code2FaTable';

export function EnvironmentCard({
  environment,
}: {
  environment: Environment & { Codes2Fa: Code2Fa[] };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>{environment.name}</CardTitle>
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
