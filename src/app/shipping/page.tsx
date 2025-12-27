"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCurrency } from "@/context/CurrencyContext";

const shippingRates = [
  { region: "UK", standard: "FREE over £100 / £5.99", express: "£9.99", time: "3-5 days" },
  { region: "EU", standard: "FREE over £100 / £9.99", express: "£14.99", time: "5-10 days" },
  { region: "USA", standard: "£12.99", express: "£24.99", time: "7-14 days" },
  { region: "Canada", standard: "£14.99", express: "£29.99", time: "7-14 days" },
  { region: "Australia", standard: "£14.99", express: "£29.99", time: "10-18 days" },
  { region: "Rest of World", standard: "£19.99", express: "£34.99", time: "14-21 days" },
];

export default function ShippingPage() {
  const { formatPrice } = useCurrency();

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
            <span className="text-neutral-400">Shipping & Returns</span>
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
                LOGISTICS DATA
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider">
              // SHIPPING & RETURNS
            </h1>
            <p className="text-neutral-500 mt-4">
              Everything you need to know about delivery and returns.
            </p>
          </motion.div>

          {/* Shipping Rates Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Shipping Rates
            </h2>
            <div className="border border-neutral-800 overflow-hidden relative">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-neutral-700" />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-950">
                      <th className="px-4 py-3 text-left font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                        Region
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                        Standard
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                        Express
                      </th>
                      <th className="px-4 py-3 text-left font-mono text-[10px] text-neutral-500 uppercase tracking-widest border-b border-neutral-800">
                        Est. Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingRates.map((rate, index) => (
                      <tr
                        key={rate.region}
                        className="border-b border-neutral-900 last:border-0 hover:bg-neutral-950/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-sm font-semibold text-white">
                          {rate.region}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-neutral-400">
                          {rate.standard}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-neutral-400">
                          {rate.express}
                        </td>
                        <td className="px-4 py-3 font-mono text-sm text-neutral-400">
                          {rate.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-neutral-600 text-sm font-mono">
              * Express shipping includes tracking and signature confirmation.
            </p>
          </motion.section>

          {/* Shipping Info */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Shipping Information
            </h2>
            <div className="border border-neutral-800 p-6 space-y-4 relative">
              <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

              <div className="space-y-4 text-neutral-400 text-sm">
                <p>
                  <strong className="text-white">Order Processing:</strong> Orders are processed within 1-2 business days. Orders placed after 2pm GMT will be processed the next business day.
                </p>
                <p>
                  <strong className="text-white">Free Shipping:</strong> Enjoy free standard shipping on all orders over {formatPrice(100)} to the UK and EU.
                </p>
                <p>
                  <strong className="text-white">Tracking:</strong> All orders include tracking. You will receive a shipping confirmation email with tracking details once your order ships.
                </p>
                <p>
                  <strong className="text-white">International Orders:</strong> Please note that international orders may be subject to import duties, taxes, and customs fees. These are the responsibility of the recipient.
                </p>
                <p>
                  <strong className="text-white">Delivery Issues:</strong> If your package is delayed or appears lost, please wait until the estimated delivery window has passed before contacting us. We will work with the carrier to resolve the issue.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Returns Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Returns Policy
            </h2>
            <div className="border border-neutral-800 p-6 space-y-4 relative">
              <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

              <div className="space-y-4 text-neutral-400 text-sm">
                <p>
                  <strong className="text-white">30-Day Returns:</strong> We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached.
                </p>
                <p>
                  <strong className="text-white">How to Return:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                  <li>Log into your account and navigate to your orders</li>
                  <li>Select the order containing the item(s) you wish to return</li>
                  <li>Follow the prompts to generate a return shipping label</li>
                  <li>Pack items securely in their original packaging if possible</li>
                  <li>Drop off at the designated carrier location</li>
                </ol>
                <p>
                  <strong className="text-white">Return Shipping:</strong> UK returns are free. International customers are responsible for return shipping costs unless the item is defective.
                </p>
                <p>
                  <strong className="text-white">Refund Processing:</strong> Once your return is received and inspected, your refund will be processed within 5-7 business days. The refund will be issued to your original payment method.
                </p>
                <p>
                  <strong className="text-white">Final Sale Items:</strong> Items marked as "Final Sale" or purchased during clearance events cannot be returned or exchanged.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Damaged/Defective Items */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
              // Damaged or Defective Items
            </h2>
            <div className="border border-neutral-800 p-6 relative">
              <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

              <p className="text-neutral-400 text-sm mb-4">
                If you receive a damaged or defective item, please contact us within 7 days of delivery with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-400 text-sm pl-4">
                <li>Your order number</li>
                <li>Description of the damage or defect</li>
                <li>Photos of the item showing the issue</li>
              </ul>
              <p className="text-neutral-400 text-sm mt-4">
                We will arrange a free return and send a replacement or full refund.
              </p>
            </div>
          </motion.section>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-neutral-500 mb-4">
              Have questions about your order?
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                // Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
