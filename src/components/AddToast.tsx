'use client';

import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export function AddToast({
  title,
  description,
  variant,
  callId,
}: {
  title: string;
  description: string;
  callId: string;
  variant: string;
}) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title,
      description,
      variant,
      duration: 5000,
    });
  }, [title, description, toast, callId]);

  return null;
}
