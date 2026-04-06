export function decodeJwt(token: string) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(Buffer.from(payload, "base64").toString());
  } catch {
    return null;
  }
}

export function isJwtExpired(payload: unknown): boolean {
  if (!payload || typeof payload !== "object") {
    return true;
  }

  const exp = (payload as { exp?: unknown }).exp;
  if (typeof exp !== "number") {
    return true;
  }

  return exp <= Date.now() / 1000;
}
