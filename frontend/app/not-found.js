"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden">
      {/* Animated floating shapes background */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-bounce-slow w-64 h-64 bg-[var(--primary-light)] opacity-20 rounded-full absolute top-[-4rem] left-[-4rem] blur-2xl" />
        <div className="animate-spin-slow w-40 h-40 bg-[var(--secondary)] opacity-20 rounded-full absolute bottom-[-3rem] right-[-3rem] blur-2xl" />
        <div className="animate-pulse w-24 h-24 bg-[var(--accent)] opacity-20 rounded-full absolute bottom-1/3 left-1/4 blur-2xl" />
      </div>

      {/* Animated 404 */}
      <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] animate-float drop-shadow-lg select-none">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 text-[var(--text)] animate-fade-in">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-lg text-[var(--text-light)] max-w-xl text-center animate-fade-in fade-in-delay-200">
        The page you’re looking for doesn’t exist or has been moved.<br />
        Let’s get you back on track!
      </p>
      <Link href="/">
        <button
  className="mt-10 px-10 py-4 text-xl font-extrabold rounded-full shadow-2xl border-4 border-[var(--primary)] bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] text-white hover:scale-105 transition-all duration-300 animate-pop focus:outline-none focus:ring-4 focus:ring-[var(--primary-light)]"
>
  Go Home
</button>
      </Link>

    </div>
  );
}
