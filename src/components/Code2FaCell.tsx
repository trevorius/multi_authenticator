'use client';

import { useState, useEffect } from 'react';

export function Code2FaCell({
  secretCode,
  environmentId,
}: {
  secretCode: string;
  environmentId: string;
}) {
  const [code, setCode] = useState<string>('');

  const fetchCode = async () => {
    const response = await fetch(
      `/api/protected/code2fa?secretCode=${secretCode}&environmentId=${environmentId}`
    );
    const data = await response.json();
    setCode(data.code);
  };

  useEffect(() => {
    fetchCode();
    const interval = setInterval(fetchCode, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [secretCode, environmentId]);

  return <span>{code}</span>;
}
