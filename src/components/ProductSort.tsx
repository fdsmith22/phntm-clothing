"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

interface ProductSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function ProductSort({ value, onChange }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 border border-neutral-800 hover:border-neutral-600 transition-colors bg-black"
      >
        <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
          Sort:
        </span>
        <span className="font-mono text-xs text-white">
          {selectedOption?.label}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-500"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-black border border-neutral-800 z-50"
          >
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-neutral-700" />
            <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-neutral-700" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-neutral-700" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-neutral-700" />

            <div className="py-2">
              {sortOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  className={`w-full px-4 py-2 text-left font-mono text-xs transition-colors ${
                    value === option.value
                      ? "text-white bg-neutral-900"
                      : "text-neutral-500 hover:text-white hover:bg-neutral-900/50"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
