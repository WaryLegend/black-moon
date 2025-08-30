import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname === "/men" || pathname === "/kids") {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}
