import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("authToken");

    const protectedPaths = ["/admin"];

    if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            return NextResponse.redirect(new URL("/user/signin", request.url));
        }

        try {
            // Verify the token
            jwt.verify(token, process.env.SECRET_KEY);
            return NextResponse.next(); 
        } catch (error) {
            return NextResponse.redirect(new URL("/user/signin", request.url));
        }
    }

    return NextResponse.next(); 
}
