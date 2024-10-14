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

export function Code2FaTable({
  codes,
  environmentId,
}: {
  codes: Code2Fa[];
  environmentId: string;
}) {
  const handleDelete = async (secretCode: string) => {
    // Implement delete functionality
  };

  return (
    <div>
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
          {codes?.map((code) => (
            <TableRow key={code.SecretCode}>
              <TableCell>{code.name}</TableCell>
              <TableCell>
                <Code2FaCell
                  secretCode={code.SecretCode}
                  environmentId={environmentId}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant='destructive'
                  onClick={() => handleDelete(code.SecretCode)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
