"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sizeCharts = {
  hoodies: {
    title: "Hoodies",
    headers: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
    rows: [
      ["S", "38-40", "27", "33"],
      ["M", "40-42", "28", "34"],
      ["L", "42-44", "29", "35"],
      ["XL", "44-46", "30", "36"],
      ["XXL", "46-48", "31", "37"],
    ],
  },
  tees: {
    title: "T-Shirts",
    headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
    rows: [
      ["S", "36-38", "27", "17"],
      ["M", "38-40", "28", "18"],
      ["L", "40-42", "29", "19"],
      ["XL", "42-44", "30", "20"],
      ["XXL", "44-46", "31", "21"],
    ],
  },
  jackets: {
    title: "Jackets",
    headers: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
    rows: [
      ["S", "40-42", "26", "34"],
      ["M", "42-44", "27", "35"],
      ["L", "44-46", "28", "36"],
      ["XL", "46-48", "29", "37"],
      ["XXL", "48-50", "30", "38"],
    ],
  },
};

const measurements = [
  {
    name: "Chest",
    icon: "M",
    description: "Measure around the fullest part of your chest, keeping the tape horizontal.",
  },
  {
    name: "Length",
    icon: "L",
    description: "Measure from the highest point of the shoulder down to the hem.",
  },
  {
    name: "Sleeve",
    icon: "S",
    description: "Measure from the center back of the neck to the wrist with arm bent.",
  },
  {
    name: "Shoulder",
    icon: "W",
    description: "Measure from shoulder seam to shoulder seam across the back.",
  },
];

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[11px] text-neutral-600 uppercase tracking-widest mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-400">Size Guide</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-green-500 font-mono text-[10px] font-semibold">
                MEASUREMENT DATA
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider">
              // SIZE GUIDE
            </h1>
            <p className="text-neutral-500 mt-4 max-w-2xl">
              Find your perfect fit. All measurements are in inches. For the best fit,
              measure yourself and compare to our size charts below.
            </p>
          </motion.div>

          {/* How to Measure */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-6">
              // How to Measure
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {measurements.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="border border-neutral-800 p-4 relative group"
                >
                  <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-neutral-950 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-2xl text-neutral-600">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold uppercase tracking-wide mb-1">
                        {item.name}
                      </h3>
                      <p className="text-neutral-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Size Charts */}
          {Object.entries(sizeCharts).map(([key, chart], chartIndex) => (
            <motion.section
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + chartIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
                // {chart.title}
              </h2>
              <div className="border border-neutral-800 overflow-hidden relative">
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-neutral-700" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-neutral-700" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-neutral-700" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-neutral-700" />

                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-950">
                      {chart.headers.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-800"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chart.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-neutral-900 last:border-0 hover:bg-neutral-950/50 transition-colors"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`px-4 py-3 font-mono text-sm ${
                              cellIndex === 0
                                ? "font-semibold text-white"
                                : "text-neutral-400"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          ))}

          {/* Fit Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border border-neutral-800 p-6 relative"
          >
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Fit Tips
            </h2>
            <ul className="space-y-2 text-neutral-400 text-sm">
              <li>- If you are between sizes, we recommend sizing up for a relaxed fit.</li>
              <li>- Our hoodies and jackets are designed with a regular fit.</li>
              <li>- T-shirts have a slightly oversized, streetwear-inspired cut.</li>
              <li>- Still unsure? Contact us and we will help you find your size.</li>
            </ul>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-6 py-3 border border-neutral-700 font-mono text-xs uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
