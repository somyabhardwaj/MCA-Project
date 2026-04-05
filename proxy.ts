import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-key"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Define public and auth routes
  const isAuthRoute = pathname.startsWith("/auth");
  const isEmployeeDashboard = pathname.startsWith("/employee");
  const isEmployerDashboard = pathname.startsWith("/employer");

  if (!token) {
    // If not logged in and trying to access protected route, redirect to login
    if (isEmployeeDashboard) {
      return NextResponse.redirect(new URL("/auth/employee/login", request.url));
    }
    if (isEmployerDashboard) {
      return NextResponse.redirect(new URL("/auth/employer/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify token using jose for Edge compatibility
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // If logged in and trying to access auth route, redirect to appropriate dashboard
    if (isAuthRoute) {
      if (role === "EMPLOYEE") {
        return NextResponse.redirect(new URL("/employee/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/employer/dashboard", request.url));
      }
    }

    // Role-based route protection
    if (isEmployeeDashboard && role !== "EMPLOYEE") {
      return NextResponse.redirect(new URL("/employer/dashboard", request.url));
    }

    if (isEmployerDashboard && role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/employee/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Invalid token, clear cookie and redirect to landing page
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/employee/:path*",
    "/employer/:path*",
  ],
};
