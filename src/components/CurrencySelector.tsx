"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, currencyConfig, setCurrency, currencies } = useCurrency();

  const handleSelect = (code: "GBP" | "USD" | "EUR") => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{
          textShadow: "0 0 15px rgba(255,255,255,0.5)",
        }}
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
      >
        <span className="w-4 h-4 border border-neutral-700 flex items-center justify-center text-[10px]">
          {currencyConfig.symbol}
        </span>
        <span className="hidden sm:inline">{currency}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[8px]"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 min-w-[160px] bg-black border border-neutral-800 overflow-hidden"
              style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.8)" }}
            >
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-neutral-700" />
              <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-neutral-700" />
              <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-neutral-700" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-neutral-700" />

              <div className="p-1">
                <div className="px-3 py-2 font-mono text-[9px] text-neutral-600 uppercase tracking-widest border-b border-neutral-900">
                  // SELECT REGION
                </div>

                {Object.values(currencies).map((curr) => (
                  <motion.button
                    key={curr.code}
                    onClick={() => handleSelect(curr.code)}
                    whileHover={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      x: 4,
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      currency === curr.code ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    <span className="w-5 h-5 border border-neutral-700 flex items-center justify-center text-xs font-mono">
                      {curr.symbol}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">{curr.label}</span>
                      <span className="text-[10px] text-neutral-600 font-mono">{curr.code}</span>
                    </div>
                    {currency === curr.code && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
