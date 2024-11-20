import { NextRequest, NextResponse } from "next/server";
import { getUserMe } from "@/data/services/get-user-me";

const protectedRoutes = ["/"];
const publicRoutes = ["/signin", "/signup"];

function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const user = await getUserMe();
  const currentPath = request.nextUrl.pathname;

  if (
    isProtectedRoute(currentPath) &&
    user.ok === false &&
    !publicRoutes.includes(currentPath)
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
