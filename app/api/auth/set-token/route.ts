import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access_token } = await req.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}
