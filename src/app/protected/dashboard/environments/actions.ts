'use server';

import prisma from '@/services/prisma';
import { getUser } from '@/auth';

export async function deleteCode(codeId: string) {
  const user = await getUser();
  if (!user) {
    return { error: 'User not found' };
  }

  // find the code and its environemnt if nvironment user is user then delete it
  const code = await prisma.code2Fa.findUnique({
    where: {
      SecretCode: codeId,
    },
    include: {
      environment: true,
    },
  });
  if (!code) {
    return { error: 'Code not found' };
  }
  if (code.environment.userId !== user.id) {
    return { error: 'You are not authorized to delete this code' };
  }
  await prisma.code2Fa.delete({
    where: {
      SecretCode: codeId,
    },
  });
  return { success: 'Code deleted' };
}
