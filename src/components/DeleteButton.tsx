"use client";

import { Button } from "./ui/button";
import { AddToast } from "./AddToast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({
  deleteAction,
  id,
}: {
  deleteAction: (
    id: string | number
  ) => Promise<{ success: boolean; error?: string }>;
  id: string | number;
}) {
  const router = useRouter();
  const [toast, setToast] = useState<{
    variant: "success" | "destructive" | "default" | null;
    title: string;
    description: string;
    callId: string;
  } | null>(null);
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const response = await deleteAction(id);
        const randomId = Math.random().toString(36).substring(7);
        setToast({
          variant: response.success ? "success" : "destructive",
          title: response.success ? "Success" : "Error",
          description: response.success
            ? "Operation successful"
            : response.error || "An error occurred",
          callId: randomId,
        });
        // refresh the page
        router.refresh();
      }}
    >
      <AddToast
        variant={toast?.variant || null}
        title={toast?.title || null}
        description={toast?.description || null}
        callId={toast?.callId || null}
      />
      Delete
    </Button>
  );
}
