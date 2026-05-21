"use client";

import { useState } from "react";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

const navLinks = [
  { href: "/landing", label: "Home" },
  { href: "#features", label: "Features" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2">
            <Logo />
            <span className="text-sm font-semibold text-gray-900">eAsset Management</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 transition hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Sign In
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3 pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
