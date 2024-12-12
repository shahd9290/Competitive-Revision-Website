import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

// Store subdirectories here?
export const config = {
    matcher: ['/dashboard', '/subjects', '/logout']
}

export async function middleware(req: NextRequest) {
    console.log("Middleware Running");

    const tokenExpiry = req.cookies.get("tokenExpiry")?.value;
    const response = NextResponse.next()

    // not found?
    if (req.url.endsWith('/logout')) {
        response.cookies.set("tokenExpiry", "0", {httpOnly: true, expires: new Date(0)});
        response.cookies.set("token", "", {httpOnly:true, expires: new Date(0)})

    }
    else if (tokenExpiry !== undefined && !req.url.endsWith('/')) {

        const isExpired = checkExpiration(tokenExpiry);
        // time is up?
        if (isExpired) {
            console.log("Token Expired!")
            const token = req.cookies.get("token")?.value;
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
    return NextResponse.redirect(new URL('/login', req.url));

}

function checkExpiration(expiry: string | undefined) {
    const now = Math.floor(Date.now() / 1000);
    return (Number(expiry) < now)
}