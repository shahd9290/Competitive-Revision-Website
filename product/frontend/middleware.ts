import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

// Store sub-directories here?
export const config = {
    matcher: ['/dashboard']
}

export async function middleware(req: NextRequest) {
    console.log("Middleware Running");
    const {pathname} = req.nextUrl;

    const publicPaths = ['/api/auth/'];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }


    const tokenExpiry = req.cookies.get("tokenExpiry")?.value;
    // not found?
    if (tokenExpiry !== undefined) {

        let response = NextResponse.next()

        const isExpired = checkExpiration(tokenExpiry);
        // time is up?
        if (isExpired) {
            console.log("Token Expired!")
            const token = req.cookies.get("token")?.value;
            const axios_response = await axios.post('http://localhost:8080/api/refresh/refresh-token', {},{
                headers: {
                    'Cookie': `token=${token}`,

                },
                withCredentials: true}).then((resp) => {
                    response.cookies.set("token", resp.data.token);
                    response.cookies.set("tokenExpiry", resp.data.tokenExpiry);
                    console.log("Token Refreshed!");
                })
        }
        
        return response
    } else {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

function checkExpiration(expiry: string) {
    const now = Math.floor(Date.now() / 1000);
    return (Number(expiry) < now)
}