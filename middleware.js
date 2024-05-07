import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFyYW1ha2l0YWtldG9AZ21haWwuY29tIiwiZXhwIjoxNzEzNjAwOTQ5fQ.BU-4VW2jxowGFUgOIV4MrLkYD2AMVKhAZjToGVD9Kqk"
    // const token = await request.headers.get("Authorization")?.sprit(" ")[1]

    if(!token){
        return NextResponse.json({message: "トークンがありません"})
    }
    try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        return NextResponse.next()

    }catch(err){
        return NextResponse.json({message: "トークンが正しくないのでログインし直してください"})
    }
}

export const config = {
    matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}
