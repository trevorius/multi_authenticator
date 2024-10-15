import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Environment, Code2Fa } from "@prisma/client";
import { Code2FaTable } from "@/components/Code2FaTable";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteEnvironment } from "@/app/protected/dashboard/environments/actions";

export function EnvironmentCard({
  environment,
}: {
  environment: Environment & { Codes2Fa: Code2Fa[] };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex flex-wrap justify-between">
          <div className="flex flex-col">
            <div>{environment.name}</div>
            <div>{environment.type}</div>
          </div>
          <div className="">
            <DeleteButton
              deleteAction={deleteEnvironment}
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
