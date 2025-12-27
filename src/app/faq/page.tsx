"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    name: "Orders",
    items: [
      {
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive an email with a tracking number and link. You can also view your order status by logging into your account.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact us immediately if you need to make changes.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay for secure, fast checkout.",
      },
      {
        question: "Why was my order cancelled?",
        answer: "Orders may be cancelled due to payment issues, suspected fraud, or stock availability. If your order is cancelled, you'll receive a full refund and an email explaining the reason.",
      },
    ],
  },
  {
    name: "Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days within the UK, 5-10 business days for EU, and 7-14 business days internationally. Express options are available at checkout.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over £100. This applies to UK and EU orders.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Import duties may apply for orders outside the UK.",
      },
      {
        question: "What if my package is lost or damaged?",
        answer: "Contact us within 14 days of the expected delivery date. We'll work with the carrier to locate your package or send a replacement if it's confirmed lost.",
      },
    ],
  },
  {
    name: "Returns",
    items: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unworn items with original tags attached. Items must be in their original condition. Sale items are final sale and cannot be returned.",
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account and select the order you wish to return. Follow the prompts to generate a return label. Pack items securely and drop off at the specified carrier.",
      },
      {
        question: "How long do refunds take?",
        answer: "Once we receive your return, please allow 5-7 business days for inspection and processing. Refunds are issued to the original payment method within 3-5 business days after approval.",
      },
      {
        question: "Can I exchange an item for a different size?",
        answer: "We don't offer direct exchanges. Please return the original item for a refund and place a new order for the correct size to ensure availability.",
      },
    ],
  },
  {
    name: "Products",
    items: [
      {
        question: "How do I find my size?",
        answer: "Check our detailed Size Guide for measurements across all product categories. If you're between sizes, we generally recommend sizing up for a more relaxed fit.",
      },
      {
        question: "What materials do you use?",
        answer: "We prioritize quality and sustainability. Our core range uses 100% organic cotton, recycled polyester, and eco-friendly dyes. Check individual product pages for specific material details.",
      },
      {
        question: "How should I care for my items?",
        answer: "We recommend machine washing cold with like colors, tumble dry low or hang dry, and avoiding bleach. Check the care label on each garment for specific instructions.",
      },
      {
        question: "Will sold out items be restocked?",
        answer: "We regularly restock popular items. Sign up for restock notifications on the product page or follow us on social media for announcements.",
      },
    ],
  },
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-neutral-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-4 flex items-center justify-between text-left group"
      >
        <span className="font-heading text-sm font-medium uppercase tracking-wide pr-4">
          {item.question}
        </span>
        <motion.span
          className="font-mono text-neutral-600 flex-shrink-0"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-neutral-400 text-sm leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Orders");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (question: string) => {
    setOpenItems((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const currentCategory = faqData.find((cat) => cat.name === activeCategory);

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
            <span className="text-neutral-400">FAQ</span>
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
                HELP DATABASE
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl tracking-wider">
              // FAQ
            </h1>
            <p className="text-neutral-500 mt-4">
              Frequently asked questions and answers.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {faqData.map((category) => (
              <motion.button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenItems([]);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-all ${
                  activeCategory === category.name
                    ? "border-white bg-white text-black"
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-neutral-800 relative"
          >
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

            <div className="p-6">
              <h2 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4">
                // {activeCategory}
              </h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentCategory?.items.map((item) => (
                    <FAQAccordion
                      key={item.question}
                      item={item}
                      isOpen={openItems.includes(item.question)}
                      onToggle={() => toggleItem(item.question)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Still need help? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-neutral-500 mb-4">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                // Contact Support
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
