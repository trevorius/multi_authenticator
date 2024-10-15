'use client';

import { Code2Fa } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Code2FaCell } from '@/components/Code2FaCell';
import Link from 'next/link';
import { deleteCode } from '@/app/protected/dashboard/environments/actions';
import { AddToast } from './AddToast';
import { useState } from 'react';
import { Trash } from 'lucide-react';

export function Code2FaTable({
  codes,
  environmentId,
}: {
  codes: Code2Fa[];
  environmentId: string;
}) {
  const [toast, setToast] = useState<{
    title: string;
    description: string;
    variant: 'default' | 'destructive' | 'success';
    callId: string;
  } | null>();
  const [displayedCodes, setDisplayedCodes] = useState<Code2Fa[]>(codes);

  const handleDelete = async (secretCode: string) => {
    // Implement delete functionality
    const response = await deleteCode(secretCode);
    if (response.error) {
      setToast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
        callId: secretCode,
      });
    }
    if (response.success) {
      setToast({
        title: 'Success',
        description: response.success,
        variant: 'success',
        callId: secretCode,
      });
      setDisplayedCodes(
        displayedCodes.filter((code) => code.SecretCode !== secretCode)
      );
    }
  };

  return (
    <div>
      <AddToast
        title={toast?.title || null}
        description={toast?.description || null}
        variant={toast?.variant || null}
        callId={toast?.callId || null}
      />
      <div className='mb-4'>
        <Link
          href={`/protected/dashboard/environments/${environmentId}/add-code`}
        >
          <Button>Add New Code</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedCodes?.map((code, index) => (
            <TableRow
              key={index}
              //   key={code.SecretCode}
            >
              <TableCell>{code.name}</TableCell>
              <TableCell>
                <Code2FaCell
                  secretCode={code.secretCode}
                  environmentId={environmentId}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant='destructive'
                  size='icon'
                  onClick={() => handleDelete(code.secretCode)}
                >
                  <Trash className='w-4 h-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
