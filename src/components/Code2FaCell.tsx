'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Code2FaCell({
  secretCode,
  environmentId,
}: {
  secretCode: string;
  environmentId: string;
}) {
  const [code, setCode] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0); // Assuming 30 seconds validity
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('Copy');

  const fetchCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/protected/code2fa/?secretCode=${encodeURIComponent(
          secretCode
        )}&environmentId=${encodeURIComponent(environmentId)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch 2FA code');
      }
      const data = await response.json();
      setCode(data.code);
      setTimeLeft(Math.floor((Date.now() - data.expires) / -1000)); // Reset timer when new code is fetched
    } catch (err) {
      setError('Error fetching 2FA code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCode();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          fetchCode(); // Fetch new code when timer reaches 0
          return 30; // Reset timer to 30 seconds
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secretCode, environmentId]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyStatus('Failed to copy');
    }
  };

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;

  return (
    <div className='flex items-center flex-wrap'>
      <span>{code}</span>
      <span className='text-xs text-gray-500 px-1'>
        (Valid for {timeLeft} seconds)
      </span>
      <Button
        className='text-xs text-gray-500 px-1 '
        variant='ghost'
        onClick={copyToClipboard}
      >
        {copyStatus}
      </Button>
    </div>
  );
}
