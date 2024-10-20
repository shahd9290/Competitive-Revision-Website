import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import config from "@/tailwind.config";

export function middleware(req: NextRequest) {
    console.log("Middleware Running");
    const {pathname} = req.nextUrl;

    const publicPaths = ['/api/auth/'];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }


    const tokenExpiry = req.cookies.get("tokenExpiry")?.value;
    // not found?
    if (tokenExpiry !== undefined) {

        const isExpired = checkExpiration(tokenExpiry);
        // time is up?
        if (isExpired) {
            console.log("Token Expired!")
            const token = req.cookies.get("token")?.value;
            axios.post('http://localhost:8080/api/refresh/refresh-token', {},{
                headers: {
                    'Cookie': `token=${token}`,

                },
                withCredentials: true})
            console.log("Token Refreshed!");
        }

        return NextResponse.next()
    } else {
        NextResponse.redirect(new URL('/login', "http://localhost:3000/"));
    }
}

function checkExpiration(expiry: string) {
    const now = Math.floor(Date.now() / 1000);
    return (Number(expiry) < now)
}