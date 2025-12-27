"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GhostLogo from "./GhostLogo";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/" },
    { name: "Hoodies", href: "/?category=hoodies" },
    { name: "Tees", href: "/?category=tees" },
    { name: "Jackets", href: "/?category=jackets" },
  ],
  help: [
    { name: "Size Guide", href: "/size-guide" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-neutral-900 mt-12 sm:mt-16 relative overflow-hidden"
    >
      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/">
              <GhostLogo size="md" animated={false} />
            </Link>
            <p className="text-neutral-600 text-sm mt-4 leading-relaxed">
              Premium streetwear from the shadows. Quality crafted for those who dare to stand out.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] text-green-500">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Help
            </h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Newsletter
            </h3>
            <p className="text-neutral-600 text-sm mb-4">
              Subscribe for exclusive drops and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm font-mono text-white placeholder:text-neutral-700 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-3 bg-white text-black font-mono text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Join
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-neutral-600 text-xs font-mono">
              &copy; 2025 PHNTM. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-neutral-600 hover:text-white text-xs font-mono transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Social icons */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      {/* CRT vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.4)" }}
      />
    </motion.footer>
  );
}
