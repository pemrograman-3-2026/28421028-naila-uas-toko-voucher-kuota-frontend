import { NextRequest, NextResponse } from "next/server";

export type IRole = 'ADMIN' | 'USER'
export interface IUser {
    username: string
    role: IRole
    no_telp: string
}

export function proxy (request: NextRequest) {
    const userCookie = request.cookies.get("user")?.value;

    const {pathname} = request.nextUrl;
    console.log(pathname)

    const toUserPage = pathname.startsWith("/user")
    const toAdminPage = pathname.startsWith("/admin")
    const isNeedSession = toUserPage || toAdminPage

    if (isNeedSession) {

      if (!userCookie) {
        return NextResponse.redirect (new URL ("/", request.url));
    }
    const user = JSON.parse(userCookie) as IUser

if (toAdminPage && user.role !== 'ADMIN') {
    return NextResponse.redirect (new URL ("/", request.url));
}
if (toUserPage && user.role !== 'USER') {
    return NextResponse.redirect (new URL ("/", request.url));
}

    return NextResponse.next()
}}