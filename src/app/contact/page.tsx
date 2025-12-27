"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhostParticles from "@/components/GhostParticles";

const contactInfo = [
  { label: "Email", value: "hello@phntm.co", href: "mailto:hello@phntm.co", id: "CH-01" },
  { label: "Instagram", value: "@phntm.co", href: "#", id: "CH-02" },
  { label: "Location", value: "Los Angeles, CA", href: "#", id: "CH-03" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Flickering background PHNTM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.05,
            x: bgOffsetX,
            filter: `brightness(${bgBrightness})`,
          }}
          transition={{ opacity: { duration: 1 }, x: { duration: 0.05 }, filter: { duration: 0.05 } }}
          className="absolute inset-0 text-[18vw] font-display font-bold text-white leading-none select-none pointer-events-none flex items-center justify-center"
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
            <span className="text-green-500">CHANNEL OPEN</span>
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
              // SECTION: COMMUNICATION
            </span>
            <h1 className="text-5xl md:text-7xl font-display tracking-tight mb-6">
              CONTACT US
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-neutral-400 max-w-xl mx-auto font-body"
          >
            Questions about orders, collaborations, or general inquiries.
          </motion.p>
        </div>

        {/* CRT vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.5)" }}
        />
      </section>

      {/* Contact Content */}
      <section className="py-12 px-6 relative">
        <div className="absolute top-4 left-6 font-mono text-[10px] text-neutral-600">
          // TRANSMISSION INTERFACE
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 pt-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] text-neutral-600">// SEND_MESSAGE</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <label className="block text-[10px] text-neutral-600 uppercase tracking-widest mb-2 font-mono">
                  // Name
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.5)" }}
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-800 text-white focus:outline-none transition-all duration-300 font-body"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-[10px] text-neutral-600 uppercase tracking-widest mb-2 font-mono">
                  // Email
                </label>
                <motion.input
                  whileFocus={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.5)" }}
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-800 text-white focus:outline-none transition-all duration-300 font-body"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-[10px] text-neutral-600 uppercase tracking-widest mb-2 font-mono">
                  // Subject
                </label>
                <motion.select
                  whileFocus={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.5)" }}
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-neutral-800 text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-body"
                >
                  <option value="">Select channel...</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="press">Press & Media</option>
                </motion.select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-[10px] text-neutral-600 uppercase tracking-widest mb-2 font-mono">
                  // Message
                </label>
                <motion.textarea
                  whileFocus={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.5)" }}
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-neutral-800 text-white focus:outline-none transition-all duration-300 resize-none font-body"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 font-mono relative overflow-hidden ${
                  isSubmitted
                    ? "bg-green-500 text-black border border-green-500"
                    : "bg-white text-black hover:bg-black hover:text-white border border-white"
                }`}
              >
                {isSubmitting ? "// TRANSMITTING..." : isSubmitted ? "// TRANSMITTED" : "// TRANSMIT"}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:pl-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] text-neutral-600">// CHANNELS</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    x: 10,
                    boxShadow: "0 0 20px rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  className="group p-4 border border-neutral-800 bg-black relative"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-neutral-700" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-neutral-700" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-neutral-700" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-neutral-700" />

                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] text-neutral-700 uppercase tracking-widest font-mono">
                      {info.id}
                    </span>
                    <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-mono">
                      {info.label}
                    </span>
                  </div>
                  <a
                    href={info.href}
                    className="text-lg font-body hover:text-neutral-300 transition-colors block"
                  >
                    {info.value}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ boxShadow: "0 0 30px rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.3)" }}
              className="mt-8 p-6 border border-neutral-800 bg-black relative"
            >
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-neutral-700" />
              <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-neutral-700" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-neutral-700" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-neutral-700" />

              <span className="font-mono text-[9px] text-neutral-700 block mb-3">FAQ-SYS</span>
              <h3 className="text-xl font-heading font-semibold mb-2">FAQ</h3>
              <p className="text-neutral-500 mb-4 text-sm font-body">
                Find answers to common questions about orders, shipping, and returns.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 border border-white text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-mono"
              >
                // ACCESS
              </motion.button>
            </motion.div>

            {/* Signal strength */}
            <div className="flex items-center gap-2 mt-6 font-mono text-[10px] text-neutral-600">
              <span>SIGNAL:</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white"
                    style={{ height: `${(i + 1) * 3}px` }}
                    animate={{ opacity: i < 4 ? [1, 0.5, 1] : 0.3 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="ml-2">STRONG</span>
            </div>
          </motion.div>
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
