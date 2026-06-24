import { NextRequest, NextResponse } from "next/server";

export type IRole = 'CUSTOMER' | 'ADMIN'
export interface ICustomer {
    username: string
    role: 'ADMIN' | 'CUSTOMER',
    no_telp: string
}

export function proxy (request: NextRequest) {
    const customerCookie = request.cookies.get("admin")?.value;

    const {pathname} = request.nextUrl;
    console.log(pathname)

    const toCustomerPage = pathname.startsWith("/customer")
    const toAdminPage = pathname.startsWith("/admin")
    const isNeedSession = toCustomerPage || toAdminPage

    if (isNeedSession) {

      if (!customerCookie) {
        return NextResponse.redirect (new URL ("/", request.url));
    }
    const customer = JSON.parse(customerCookie) as ICustomer

if (toAdminPage && customer.role !== 'ADMIN') {
    return NextResponse.redirect (new URL ("/", request.url));
}
if (toCustomerPage && customer.role !== 'CUSTOMER') {
    return NextResponse.redirect (new URL ("/", request.url));
}

    return NextResponse.next()
}}