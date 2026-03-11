import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const token = body?.accessToken;

  if (typeof token !== "string" || token.length === 0) {
    return NextResponse.json(
      { success: false, message: "Missing accessToken" },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
