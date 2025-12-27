"use client";

import { motion } from "framer-motion";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "all", label: "All" },
  { id: "hoodies", label: "Hoodies" },
  { id: "tees", label: "Tees" },
  { id: "jackets", label: "Jackets" },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex overflow-x-auto scrollbar-hide border-b border-neutral-800 mb-6 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-widest transition-colors whitespace-nowrap ${
            activeTab === tab.id ? "text-white" : "text-neutral-600 hover:text-white"
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
