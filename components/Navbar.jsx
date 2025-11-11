'use client';
import Link from 'next/link';
import LogoutButton from '@/app/logout/page';
import { getUserSession } from '@/lib/actions'
import { useEffect, useState } from 'react';
import { useSession } from '@/app/context/SessionContext';

export default function Navbar() {
 const { session } = useSession();
  // console.log('session at navbar',session);
  
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
     <Link href="/" className="font-bold hover:underline">
        NextHop.
      </Link>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>

        {session ? (
           <Link href="/logout" className="hover:underline">logout</Link>
        ) : (
          <>
            <Link href="/signup" className="hover:underline">Signup</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}