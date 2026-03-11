import { randomBytes } from 'crypto';

const ALPHANUMERIC =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMERIC = '0123456789';

const ACTIVATION_KEY_LENGTH = 50;
const CODE_LENGTH = 6;

function generateRandomString(length: number, charset: string): string {
  const buffer = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i += 1) {
    const index = buffer[i] % charset.length;
    result += charset[index];
  }
  return result;
}

export function generateActivationKey(): string {
  return generateRandomString(ACTIVATION_KEY_LENGTH, ALPHANUMERIC);
}

export function generateActivationCode(): string {
  return generateRandomString(CODE_LENGTH, NUMERIC);
}

export function generateResetCode(): string {
  return generateRandomString(CODE_LENGTH, NUMERIC);
}
