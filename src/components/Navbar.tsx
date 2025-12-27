"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GhostLogo from "./GhostLogo";
import CurrencySelector from "./CurrencySelector";
import { useCart } from "@/context/CartContext";

const navItems = [
  { name: "Shop", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-black/95 backdrop-blur-sm border-b border-neutral-900"
      >
        <Link href="/">
          <GhostLogo size="md" animated={true} />
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden sm:flex gap-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      color: "#fff",
                      textShadow: "0 0 20px rgba(255,255,255,0.6)",
                      scale: 1.05,
                    }}
                    className={`font-medium transition-colors cursor-pointer ${
                      isActive ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              );
            })}
          </div>

          <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

          <CurrencySelector />

          {/* Cart button */}
          <motion.button
            onClick={openCart}
            className="relative w-10 h-10 flex items-center justify-center border border-neutral-800 hover:border-white transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-neutral-400 group-hover:text-white transition-colors"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[10px] font-mono font-bold flex items-center justify-center"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>
            )}
            {/* Glow effect when items in cart */}
            {itemCount > 0 && (
              <motion.div
                className="absolute inset-0 border border-white/30"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            className="sm:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-5 h-px bg-white origin-left"
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? -1 : 0 }}
            />
            <motion.span
              className="w-5 h-px bg-white"
              animate={{ opacity: mobileMenuOpen ? 0 : 1, x: mobileMenuOpen ? -10 : 0 }}
            />
            <motion.span
              className="w-5 h-px bg-white origin-left"
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? 1 : 0, width: mobileMenuOpen ? 20 : 12 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 sm:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-black border-l border-neutral-800 pt-20 px-6"
              style={{ boxShadow: "-10px 0 40px rgba(0,0,0,0.5)" }}
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-neutral-700" />
              <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-neutral-700" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-neutral-700" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-neutral-700" />

              <div className="font-mono text-[10px] text-neutral-600 mb-8 tracking-widest">
                // NAVIGATION
              </div>

              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-4 text-2xl font-display tracking-wide border-b border-neutral-900 transition-colors ${
                          isActive ? "text-white" : "text-neutral-500"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Scan line effect */}
              <motion.div
                className="absolute left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
