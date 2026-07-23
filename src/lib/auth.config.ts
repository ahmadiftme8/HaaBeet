import type { NextAuthConfig } from "next-auth";

const protectedRoutes = ["/dashboard", "/report", "/about"];
const authRoutes = ["/login", "/signup"];

export default {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isAuthenticated = !!auth?.user;

      const isProtectedRoute = protectedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      );
      const isAuthRoute = authRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`),
      );

      if (isProtectedRoute) {
        if (isAuthenticated) return true;
        return false;
      }

      if (isAuthRoute && isAuthenticated) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
