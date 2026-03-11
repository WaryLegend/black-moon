import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "@/utils/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // ---------- NON-AUTH ----------
  if (["/men", "/women", "/kids"].includes(pathname)) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  // ---------- TOKEN ----------
  const token = request.cookies.get("access_token")?.value;
  const payload = token ? decodeJwt(token) : null;

  const isLoggedIn = !!payload;
  const role = (payload?.role ?? payload?.scope) as string | undefined;

  // ---------- ROUTE FLAGS ----------
  const isUserAuthRoute = pathname.startsWith("/user/");
  const isAdminAuthRoute = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
    "/admin/verify-otp",
  ].includes(pathname);

  const isUserProtectedRoute =
    pathname.startsWith("/profile") || pathname === "/checkout";

  const isAdminProtectedRoute =
    pathname.startsWith("/admin") && !isAdminAuthRoute;

  // ---------- GUEST ----------
  if (!isLoggedIn) {
    if (isUserProtectedRoute) {
      return NextResponse.redirect(new URL("/user/login", request.url));
    }

    if (isAdminProtectedRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ---------- AUTHENTICATED ----------
  if (isLoggedIn) {
    // USER
    if (role === "USER") {
      if (isUserAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      if (isUserProtectedRoute && pathname === "/profile")
        return NextResponse.redirect(new URL("/profile/info", request.url));
      if (isAdminProtectedRoute)
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // ADMIN
    if (["ADMIN", "MANAGER", "STAFF"].includes(role || "")) {
      if (isAdminAuthRoute || pathname === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      if (isUserProtectedRoute)
        return NextResponse.redirect(new URL("/user/login", request.url));
    }
  }

  // ---------- DEFAULT ----------
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/profile/:path*",
    "/checkout",
    "/men",
    "/kids",
    "/women",
  ],
};
