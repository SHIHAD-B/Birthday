export const AUTH_COOKIE = "birthday_site_auth";

export function getSitePassword(): string {
  return (
    process.env.SITE_PASSWORD?.trim() ||
    process.env.NEXT_PUBLIC_PASSWORD?.trim() ||
    ""
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Stable cookie token derived from the password (never stores the raw password). */
export async function getAuthToken(): Promise<string> {
  const password = getSitePassword();
  if (!password) return "";
  const data = new TextEncoder().encode(`birthday-site:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

export function passwordsMatch(input: string, expected: string): boolean {
  const a = input.normalize("NFKC");
  const b = expected.normalize("NFKC");
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isValidAuthToken(
  token: string | undefined
): Promise<boolean> {
  const expected = await getAuthToken();
  if (!expected || !token) return false;
  if (expected.length !== token.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}
