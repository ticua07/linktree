import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    const { data } = await supabase.auth.getSession();

    if (data.session?.user === undefined) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return res
}

export const config = {
    matcher: ['/dashboard'],
};