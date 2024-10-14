'use client';

import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SignupResultProps {
  message?: string | null;
}

export default function SignupResult({ message }: SignupResultProps) {
  const { toast } = useToast();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (message && !toastShownRef.current) {
      const isError = message.includes('Failed');
      console.log('Attempting to show toast:', { isError, message });

      toast({
        title: isError ? 'Error' : 'Success',
        description: message,
        variant: isError ? 'destructive' : 'success',
        duration: 5000,
      });

      toastShownRef.current = true;
    }
  }, [message, toast]);

  return null; // This component doesn't render anything visible
}
