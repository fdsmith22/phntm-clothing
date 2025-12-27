"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhostParticles from "@/components/GhostParticles";

const stats = [
  { number: "2019", label: "Founded", id: "STAT-01" },
  { number: "50K+", label: "Customers", id: "STAT-02" },
  { number: "100%", label: "Sustainable", id: "STAT-03" },
  { number: "15+", label: "Countries", id: "STAT-04" },
];

const values = [
  {
    title: "Quality",
    description: "Premium materials and expert craftsmanship in every piece we create.",
    id: "VAL-01",
  },
  {
    title: "Sustainability",
    description: "Organic cotton, recycled materials, and ethical manufacturing.",
    id: "VAL-02",
  },
  {
    title: "Design",
    description: "Clean aesthetics and versatile styles built to last.",
    id: "VAL-03",
  },
];

export default function AboutPage() {
  const [bgBrightness, setBgBrightness] = useState(1);
  const [bgOffsetX, setBgOffsetX] = useState(0);
  const [timestamp, setTimestamp] = useState("");
  const [ghostPhase, setGhostPhase] = useState(1);

  // Update timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.toLocaleTimeString("en-US", { hour12: false }) +
          ":" +
          String(now.getMilliseconds()).padStart(3, "0").slice(0, 2)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // Background logo flicker effect - subtle
  const flickerTick = useCallback(() => {
    const rand = Math.random();
    if (rand < 0.03) {
      setBgBrightness(0.7 + Math.random() * 0.2);
      setTimeout(() => setBgBrightness(1), 100 + Math.random() * 150);
    } else if (rand < 0.08) {
      setBgBrightness(1.2 + Math.random() * 0.3);
      setTimeout(() => setBgBrightness(1), 80 + Math.random() * 120);
    }
    if (Math.random() < 0.02) {
      setBgOffsetX(Math.random() * 4 - 2);
      setTimeout(() => setBgOffsetX(0), 80);
    }
    // Ghost phase
    if (Math.random() < 0.04) {
      setGhostPhase(0.8 + Math.random() * 0.2);
      setTimeout(() => setGhostPhase(1), 150);
    }
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 300 + Math.random() * 500;
      return setTimeout(() => {
        flickerTick();
        scheduleNext();
      }, delay);
    };
    const timeoutId = scheduleNext();
    return () => clearTimeout(timeoutId);
  }, [flickerTick]);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Global ghost particles */}
      <GhostParticles count={20} />

      {/* Global scan line */}
      <motion.div
        className="fixed left-0 right-0 h-[1px] pointer-events-none z-50"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Flickering background PHNTM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.06,
            x: bgOffsetX,
            filter: `brightness(${bgBrightness})`,
          }}
          transition={{ opacity: { duration: 1 }, x: { duration: 0.05 }, filter: { duration: 0.05 } }}
          className="absolute inset-0 text-[20vw] font-display font-bold text-white leading-none select-none pointer-events-none flex items-center justify-center"
          style={{
            textShadow:
              bgBrightness > 1.2
                ? "0 0 40px rgba(255,255,255,0.3), 2px 0 #ff0000, -2px 0 #00ffff"
                : "0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          PHNTM
        </motion.div>

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          animate={{ top: ["-5%", "105%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Surveillance header */}
        <div className="absolute top-4 left-6 right-6 flex justify-between items-start font-mono text-[10px] text-neutral-600 z-30">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-500">FEED ACTIVE</span>
          </div>
          <div className="tabular-nums">{timestamp}</div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ghostPhase, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] text-neutral-600 tracking-widest block mb-4">
              // SECTION: ORIGIN
            </span>
            <h1 className="text-5xl md:text-7xl font-display tracking-tight mb-8">
              OUR STORY
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto font-body"
          >
            PHNTM was founded on a simple principle: create clothing that combines
            exceptional quality with understated design.
          </motion.p>
        </div>

        {/* CRT vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.5)" }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-neutral-900 relative">
        <div className="absolute top-4 left-6 font-mono text-[10px] text-neutral-600">
          // DATA METRICS
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.3)",
              }}
              className="relative text-center p-6 border border-neutral-800 bg-black"
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-neutral-700" />

              <span className="font-mono text-[9px] text-neutral-700 block mb-2">
                {stat.id}
              </span>
              <motion.span
                className="block text-4xl md:text-5xl font-display mb-2"
                animate={{ opacity: ghostPhase }}
              >
                {stat.number}
              </motion.span>
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-mono">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-4 left-6 font-mono text-[10px] text-neutral-600">
          // TRANSMISSION LOG
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center pt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span className="font-mono text-[10px] text-neutral-600 block mb-4">
              // MESSAGE: CRAFTED_WITH_PURPOSE
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-6 tracking-tight">
              CRAFTED WITH PURPOSE
            </h2>
            <div className="space-y-4 text-neutral-400 font-body">
              <p>
                Founded in 2019, PHNTM started with a focus on creating versatile,
                high-quality essentials that fit seamlessly into any wardrobe.
              </p>
              <p>
                Every piece is designed with intention—from material selection to
                final construction. We partner with certified sustainable suppliers
                and maintain strict quality standards throughout production.
              </p>
              <p>
                Our commitment extends beyond product. We operate with transparency,
                fair labor practices, and minimal environmental impact at every stage.
              </p>
            </div>

            {/* Signal indicator */}
            <div className="flex items-center gap-2 mt-6 font-mono text-[10px] text-neutral-600">
              <span>SIGNAL:</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-white"
                    style={{ height: `${(i + 1) * 3}px`, opacity: i < 3 ? 1 : 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ boxShadow: "0 0 40px rgba(255,255,255,0.1)" }}
            className="aspect-square bg-neutral-950 flex items-center justify-center border border-neutral-800 relative overflow-hidden"
          >
            {/* Corner brackets */}
            <div className="absolute inset-4 pointer-events-none">
              <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-neutral-700" />
              <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-neutral-700" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-neutral-700" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-neutral-700" />
            </div>

            {/* Ghost layers */}
            <motion.span
              className="absolute text-[12rem] font-display text-red-500/10"
              animate={{ x: [-2, 2, -1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ mixBlendMode: "screen" }}
            >
              P
            </motion.span>
            <motion.span
              className="absolute text-[12rem] font-display text-cyan-500/10"
              animate={{ x: [2, -2, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
              style={{ mixBlendMode: "screen" }}
            >
              P
            </motion.span>
            <motion.span
              className="text-[12rem] font-display text-neutral-800 relative z-10"
              animate={{ opacity: ghostPhase }}
              style={{
                textShadow: `0 0 ${30 * ghostPhase}px rgba(255,255,255,0.1)`,
              }}
            >
              P
            </motion.span>

            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.1) 50%, transparent 90%)",
              }}
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-neutral-950 relative">
        <div className="absolute top-4 left-6 right-6 flex justify-between font-mono text-[10px] text-neutral-600">
          <span>// CORE VALUES</span>
          <span>RECORDS: {values.length}</span>
        </div>

        <div className="max-w-6xl mx-auto pt-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display mb-16 text-center tracking-tight"
          >
            WHAT WE STAND FOR
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.08)",
                  borderColor: "rgba(255,255,255,0.3)",
                }}
                className="p-8 border border-neutral-800 bg-black relative"
              >
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
                <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

                <span className="font-mono text-[9px] text-neutral-700 block mb-4">
                  {value.id}
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                  className="h-0.5 bg-white mb-6"
                />
                <h3 className="text-xl font-heading font-semibold mb-4">{value.title}</h3>
                <p className="text-neutral-500 font-body text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`,
          }}
        />
      </section>

      <Footer />
    </main>
  );
}
