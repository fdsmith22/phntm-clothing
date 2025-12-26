"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GhostLogo from "./GhostLogo";

const navItems = [
  { name: "Shop", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-black/95 backdrop-blur-sm border-b border-neutral-900"
    >
      <Link href="/">
        <GhostLogo size="md" animated={true} />
      </Link>

      <div className="flex gap-8">
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
    </motion.nav>
  );
}
