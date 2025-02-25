import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

/**
 * Configuration for middleware matcher.
 *
 * Defines routes where this middleware should be applied.
 */
export const config = {
    matcher: [ '/', '/dashboard', '/subjects', '/logout', '/quiz', '/admin/:path*']
}

/**
 * Middleware for handling authentication and token expiration.
 *
 * Refreshes tokens when expired and redirects unauthenticated users to the login page.
 *
 * @param req - The incoming request object.
 * @returns A modified response or a redirect response.
 */
export async function middleware(req: NextRequest) {
    console.log("Middleware Running");

    const tokenExpiry = req.cookies.get("tokenExpiry")?.value;
    let response = NextResponse.next()



    // not found?
    if (req.url.endsWith('/logout')) {
        response = NextResponse.redirect(new URL("/login", req.url))
        response.cookies.set("tokenExpiry", "0", {httpOnly: true, expires: new Date(0)});
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)})
        return response;
    }
    else if (req.nextUrl.pathname === "/admin/login" || req.nextUrl.pathname === "/login") {
        return response
    }
    else if (tokenExpiry !== undefined && !req.url.endsWith('/')) {
        console.log("Checking token!")
        const isExpired = checkExpiration(tokenExpiry);
        const token = req.cookies.get("token")?.value;
        // time is up?

        // @ts-ignore
        const decoded: {role?:string; exp?:number;} = jwtDecode(token);

        if (decoded.role !== "ROLE_ADMIN" && req.nextUrl.pathname.startsWith("/admin")) {
            return new Response(null, {status: 403});
        }
        else if (decoded.role !== "ROLE_USER" && config.matcher.some(path=>!req.nextUrl.pathname.startsWith("/admin"))) {
            return new Response(null, {status: 403});
        }

        if (isExpired) {
            console.log("Token Expired!")
            await axios.post('http://localhost:8080/api/refresh/refresh-token', {},{
                headers: {
                    'Cookie': `token=${token}`,

                },
                withCredentials: true}).then((resp) => {
                // Apply new values to the cookies
                const newToken = resp.data.token;
                const newExpiry = resp.data.tokenExpiry;
                // Calculate cookie expiry time
                const cookieExpiry = Number(newExpiry) + 120;
                const newExpiryDate = new Date(0).setUTCSeconds(cookieExpiry);
                // Apply to new cookies
                response.cookies.set("token", newToken, {expires:newExpiryDate, httpOnly:true, secure:true, sameSite:"strict"});
                response.cookies.set("tokenExpiry", newExpiry, {expires:newExpiryDate, httpOnly:true, secure:true, sameSite:"strict"});
                console.log("Token Refreshed!");
            });
        }

        return response
    }
    if (req.nextUrl.pathname.startsWith("/admin"))
        return NextResponse.redirect(new URL("/admin/login", req.url));
    return NextResponse.redirect(new URL('/login', req.url));

}

/**
 * Checks if a token expiration timestamp has passed.
 *
 * @param expiry - The token expiration timestamp as a string.
 * @returns True if the token has expired, false otherwise.
 */
function checkExpiration(expiry: string | undefined) {
    const now = Math.floor(Date.now() / 1000);
    return (Number(expiry) < now)
}