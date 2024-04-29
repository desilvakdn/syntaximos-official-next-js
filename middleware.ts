import VerifyLoginServer from "@/utils/verifyloginserver";
import VerifyLoginServerAdmin from "@/utils/verifyloginserveradmin";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await VerifyLoginServer();
  const adminsession = await VerifyLoginServerAdmin();

  if (request.nextUrl.pathname.includes("/admin/dashboard") && !adminsession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.includes("/member/dashboard") && !session) {
    return NextResponse.redirect(new URL("/member/login", request.url));
  }

  if (
    (request.nextUrl.pathname.includes("/member/login") ||
      request.nextUrl.pathname.includes("/member/register")) &&
    session
  ) {
    return NextResponse.redirect(new URL("/member/dashboard", request.url));
  }
  if (request.nextUrl.pathname.includes("/admin/login") && adminsession) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/member/:path*", "/admin/:path*"],
};
