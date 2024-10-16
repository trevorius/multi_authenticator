"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function AddToast({
  title,
  description,
  variant,
  callId,
}: {
  title: string | null;
  description: string | null;
  callId: string | null;
  variant: "default" | "destructive" | "success" | null | undefined;
}) {
  const { toast } = useToast();

  useEffect(() => {
    if (title || description || variant || callId)
      toast({
        title: title || "",
        description: description || "",
        variant: variant || "default",
        duration: 5000,
      });
  }, [title, description, toast, callId, variant]);

  return null;
}
