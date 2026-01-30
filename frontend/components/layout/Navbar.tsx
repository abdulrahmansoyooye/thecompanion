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
  Settings,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import CreateCompanionModal from "../modals/CreateCompanionModal";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Companions", href: "/companions", icon: Sparkles },
  { label: "My Journey", href: "/my-journey", icon: Compass },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = session?.user;
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = pathname === "/sign-in" || pathname === "/signup";

  if (isAuthPage) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-[#FF5B37] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Sparkles size={20} fill="currentColor" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900">
              The Companion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-200/50">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl ${isActive
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white shadow-sm border border-gray-100 rounded-xl z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {user ? (
              <div className="flex items-center gap-6 pl-4 border-l border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 border-2 border-[#FF5B37]/20 rounded-full p-0.5 overflow-hidden">
                    <div className="w-full h-full bg-orange-50 rounded-full flex items-center justify-center overflow-hidden">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={18} className="text-orange-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">
                      {user.name?.split(" ")[0] || "User"}
                    </p>
                    <button
                      onClick={() => {
                        localStorage.setItem("manual_logout", "true");
                        signOut({ redirectTo: "/sign-in" });
                      }}
                      className="text-[10px] font-bold text-red-500 hover:underline transition-all mt-1 uppercase tracking-widest cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition active:scale-95 cursor-pointer shadow-lg shadow-gray-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-10 h-10 bg-[#FF5B37] text-white rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                <Plus size={20} />
              </button>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 bg-white border border-gray-200 text-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Navigation */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-110 md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-white z-120 shadow-2xl p-8 md:hidden flex flex-col"
              >
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-[#FF5B37] rounded-xl flex items-center justify-center text-white">
                    <Sparkles size={20} fill="currentColor" />
                  </div>
                  <span className="font-extrabold text-lg text-gray-900">
                    Menu
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${isActive
                          ? "bg-orange-50 text-[#FF5B37] font-bold"
                          : "text-gray-500 hover:bg-gray-50 font-medium"
                          }`}
                      >
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-orange-100">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={24} className="text-orange-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gray-50 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF5B37] text-white font-bold rounded-2xl hover:bg-[#e64d2b] transition shadow-lg shadow-orange-500/20 cursor-pointer"
                    >
                      <LogIn size={18} />
                      Sign In
                    </Link>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from going behind navbar */}
      <div className="h-20" />

      <CreateCompanionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
