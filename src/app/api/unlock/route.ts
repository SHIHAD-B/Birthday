import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  getAuthToken,
  getSitePassword,
  passwordsMatch,
} from "@/lib/auth";

export async function POST(request: Request) {
  const expected = getSitePassword();

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Password is not configured on the server." },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!passwordsMatch(password.trim(), expected)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, await getAuthToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}
