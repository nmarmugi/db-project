'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiSettings } from 'react-icons/fi';

export default function LinkClient() {
    const pathname = usePathname();

    return (
        <>
            {pathname === '/settings' ? (
                <Link href="/userPage">
                    <FiHome />
                </Link>
            ) : pathname === '/userPage' ? (
                <Link href="/settings">
                    <FiSettings />
                </Link>
            ) : null}
        </>
    );
}
