import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  let session = null;

  try {
    session = await auth.api.getSession({
      headers: req.headers,
    });
  } catch {
    session = null;
  }

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard/:path*",
    "/dashboard2/:path*",
  ],
};
