'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkClient() {
    const pathname = usePathname();

    return (
        <>
            {pathname === '/settings' ? (
                <Link href="/userPage">HOME</Link>
            ) : pathname === '/userPage' ? (
                <Link href="/settings">Settings</Link>
            ) : null}
        </>
    );
}
