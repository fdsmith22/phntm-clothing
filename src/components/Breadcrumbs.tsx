"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-[11px] text-neutral-600 uppercase tracking-widest mb-8"
    >
      <ol className="flex items-center flex-wrap gap-x-2">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            // Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-neutral-700">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-400">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
