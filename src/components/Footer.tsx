"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center py-12 border-t border-neutral-900 mt-16"
    >
      <p className="text-neutral-600 text-sm">
        &copy; 2025 PHNTM. All rights reserved.
      </p>
    </motion.footer>
  );
}
