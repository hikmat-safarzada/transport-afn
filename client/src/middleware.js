import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (!token && (pathname.startsWith("/owner") || pathname.startsWith("/renter"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    const targetDashboard = role === "owner" ? "/owner/dashboard" : "/renter/dashboard";
    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }
  if (token && pathname.startsWith("/renter") && role !== "renter") {
    return NextResponse.redirect(new URL("/owner/dashboard", request.url))
  }
  if (token && pathname.startsWith("/owner") && role !== "owner") {
    return NextResponse.redirect(new URL("/renter/dashboard", request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/renter/:path*", "/login", "/register"],
};