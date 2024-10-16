import { auth } from "@/auth";
import { AddToast } from "@/components/AddToast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import prisma from "@/services/prisma";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

export default function AddEnvironmentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const addEnvironment = async (formData: FormData) => {
    "use server";
    const session = await auth();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const randomCallId = Math.random().toString(36).substring(2, 15);

    if (!session?.user) {
      throw redirect("/signin");
    }
    try {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });

      await prisma.environment.create({
        data: {
          name,
          type,
          userId: user?.id as unknown as number,
        },
      });
    } catch (error) {
      console.log(error);
      throw redirect(
        `/protected/dashboard/add-environment?title=Error&description=Failed+to+create+environment&variant=destructive&call=${randomCallId}`
      );
    }
    throw redirect(
      "/protected/dashboard/?title=Success&description=Environment+added+successfully&variant=success"
    );
  };

  return (
    <div className="container mx-auto mt-8">
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
      <Card className="shadow-md mx-2 md:w-1/2 md:mx-auto">
        <CardHeader>
          <CardTitle>
            <div className="text-2xl font-bold">Add an environment</div>
          </CardTitle>
          <CardDescription>Add an environment to your account</CardDescription>
        </CardHeader>
        <form action={addEnvironment}>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row flex-wrap">
                <div className="flex flex-col w-full lg:w-1/2 lg:pr-2 mb-2">
                  <Label className="mb-1" htmlFor="environment-name">
                    Environment Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="environment-name"
                    placeholder="Environment Name"
                    required
                  />
                </div>
                <div className="flex flex-col w-full lg:w-1/2 lg:pl-2">
                  <Label className="mb-1" htmlFor="environment-type">
                    Environment Type
                  </Label>
                  <Input
                    type="text"
                    name="type"
                    id="environment-type"
                    placeholder="Environment Type"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
