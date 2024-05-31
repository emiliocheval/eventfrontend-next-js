"use client";

import React from 'react';
import Link from 'next/link';
import { useClerk, useUser } from '@clerk/nextjs';

const NavBar = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-gray-600 bg-opacity-50 p-4 flex justify-between items-center">
      <Link href="/">
        <div className="text-white text-lg font-bold cursor-pointer">
          Event Finder
        </div>
      </Link>
      <ul className="flex space-x-4">
        <li className="text-white cursor-pointer">
          <Link href="/event">Home</Link> 
        </li>
        {isSignedIn ? (
          <li className="text-white cursor-pointer" onClick={() => signOut()}>
            Sign Out
          </li>
        ) : (
          <>
            <li className="text-white cursor-pointer">
              <Link href="/sign-in/page.jsx">Sign In</Link>
            </li>
            <li className="text-white cursor-pointer">
              <Link href="/sign-up/page.jsx">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
