"use client";

import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";
import Link from "next/link";

const navLinks = [
  { href: "/landing", label: "Home" },
  { href: "#features", label: "Features" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-gray-900">eAsset Management</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login">
              <Button variant="primary">Sign In</Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-4 pb-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="primary" className="w-full">Sign In</Button>
            </Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
