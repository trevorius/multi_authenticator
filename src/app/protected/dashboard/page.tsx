import Link from "next/link";
import { Button } from "@/components/ui/button";

import { AddToast } from "@/components/AddToast";
import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { EnvironmentCard } from "@/components/EnvironmentCard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: session?.user?.email as string },
  });

  const environments = await prisma.environment.findMany({
    where: { userId: user.id },
    include: { Codes2Fa: true },
  });

  return (
    <div className="container mx-auto px-2 py-8">
      <AddToast
        title={searchParams.title as string}
        description={searchParams.description as string}
        variant={
          searchParams.variant as
            | "default"
            | "destructive"
            | "success"
            | null
            | undefined
        }
        callId={searchParams.call as string}
      />
      <div className="flex flex-wrap justify-between items-center mb-8 mx-2">
        <h1 className="mr-2 text-3xl font-bold mb-2">Dashboard</h1>
        <Link href="/protected/dashboard/add-environment">
          <Button>Add Environment</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {environments.map((environment) => (
          <EnvironmentCard environment={environment} key={environment.id} />
        ))}
      </div>
    </div>
  );
}
