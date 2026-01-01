"use client";

import Link from "next/link";
import {
  Home,
  Sparkles,
  Compass,
  LogIn,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Companion", href: "/companions", icon: Sparkles },
  { label: "My Journey", href: "/my-journey", icon: Compass },
  { label: "Sign In", href: "/sign-in", icon: LogIn },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar relative">
      {/* Logo */}
    <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF5B37] rounded-lg flex items-center justify-center text-white font-bold">TC</div>
          <span className="font-bold text-xl tracking-tight">The Companion</span>
        </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium hover:opacity-70 transition"
          >
            {item.label}
          </Link>
        ))}

        <Link href="/sign-in" className="btn-signin">
          Sign In
        </Link>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="rounded-border p-2"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 rounded-4xl border border-black bg-white shadow-sm z-50">
          <div className="flex flex-col divide-y divide-black/10">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-black/5 transition"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
