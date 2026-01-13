"use client";

import Link from "next/link";
import {
  Home,
  Sparkles,
  Compass,
  LogIn,
  Menu,
  LogOut,
  User,
  Plus,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import CreateCompanionModal from "../modals/CreateCompanionModal";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Companion", href: "/companions", icon: Sparkles },
  { label: "My Journey", href: "/my-journey", icon: Compass },
  { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
];

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = session?.user;

  return (
    <>
      <nav className="navbar relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF5B37] rounded-lg flex items-center justify-center text-white font-bold">
            TC
          </div>
          <span className="font-bold text-xl tracking-tight">The Companion</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:opacity-70 transition text-gray-700"
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded-full text-xs font-bold hover:bg-black/80 transition shadow-sm active:scale-95 ml-2 cursor-pointer"
            >
              <Plus size={14} />
              Create
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span className="text-sm font-medium">
                  {user.name?.split(" ")[0] || "User"}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium hover:opacity-70 transition flex items-center gap-1 text-red-600 cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link href="/sign-in" className="btn-signin">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-black text-white rounded-full cursor-pointer"
            >
              <Plus size={16} />
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
            className="rounded-border p-2 cursor-pointer"
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

              {user ? (
                <>
                  <div className="px-4 py-3 bg-black/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-black/10 overflow-hidden">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={16} />
                        )}
                      </div>
                      <div className="overflow-hidden min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-black/50 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-black/5 transition text-red-600 w-full text-left font-medium cursor-pointer"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-black/5 transition font-medium"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <CreateCompanionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};


export default Navbar;
