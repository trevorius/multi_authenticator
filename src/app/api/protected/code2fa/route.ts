import { NextResponse } from 'next/server';
import prisma from '@/services/prisma';
import { generateTOTP } from '@/lib/totp'; // You'll need to implement this function

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secretCode = searchParams.get('secretCode');
  const environmentId = searchParams.get('environmentId');

  if (!secretCode || !environmentId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const code2fa = await prisma.code2Fa.findUnique({
      where: { secretCode: secretCode, EnvironmentId: environmentId },
    });

    if (!code2fa) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    const totpCode = generateTOTP(code2fa.secretCode);

    return NextResponse.json({ code: totpCode.otp, expires: totpCode.expires });
  } catch (error) {
    console.error('Error generating TOTP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
