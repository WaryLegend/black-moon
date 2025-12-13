import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname === "/men" || pathname === "/kids" || pathname === "/women") {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (pathname === "/profile") {
    return NextResponse.redirect(new URL("/profile/info", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/women", "/men", "/kids", "/profile"],
};
