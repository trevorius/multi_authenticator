import { TOTP } from 'totp-generator';

export function generateTOTP(secret: string): { otp: string; expires: number } {
  console.log('generating TOTP', secret);
  const { otp, expires } = TOTP.generate(secret);

  return { otp, expires };
}
