"use client";

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">WELCOME TO EVENT FINDER</h1>
      <button className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        {isSignedIn ? (
          <Link href="/event">Browse</Link>
        ) : (
          <Link href="/sign-in">Sign in to Browse</Link>
        )}
      </button>
    </div>
  );
};

export default LandingPage;
