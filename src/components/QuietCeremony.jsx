import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Lock, Clock } from 'lucide-react';

const QuietCeremony = () => {
  const steps = [
    {
      icon: Sparkles,
      n: "01",
      t: "Write & feel",
      d: "Pour your thoughts into a private capsule. Tag the mood of this moment and save it for later.",
    },
    {
      icon: Lock,
      n: "02",
      t: "Seal in time",
      d: "Choose the date it reopens. A week, a year, a decade. The capsule is locked — even from you.",
    },
    {
      icon: Clock,
      n: "03",
      t: "Meet yourself",
      d: "On the chosen day, a cinematic unlock ceremony reveals your past. See yourself on the chosen date.",
    },
  ];

  return (
    <section className="w-full relative py-32 bg-[#050505] overflow-hidden selection:bg-[#FF3B3B]/30">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="max-w-3xl mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-[#FF3B3B]" />
            <span className="text-[12px] tracking-[0.5em] uppercase text-[#FF3B3B] font-semibold">
              The Ritual
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-extralight tracking-tight text-white leading-[1.1]"
          >
            Three acts of a <br />
            <span className="italic font-light text-[#FF3B3B] serif">quiet ceremony.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2 pointer-events-none" />

          {steps.map((s, i) => (
            <RitualCard key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF3B3B]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF3B3B]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
    </section>
  );
};

const RitualCard = ({ step, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      /* Decreased padding from p-10 to py-7 px-8 to reduce height */
      className="group relative py-7 px-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 hover:border-[#FF3B3B] transition-colors duration-500 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 59, 59, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Spacing reduced from mb-20 to mb-10 */}
      <div className="flex items-start justify-between mb-10 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-[#FF3B3B]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative p-4 rounded-2xl bg-zinc-950 border border-white/10 group-hover:border-[#FF3B3B]/30 transition-all duration-500">
            <step.icon className="w-5 h-5 text-[#FF3B3B]" strokeWidth={1.5} />
          </div>
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] group-hover:text-[#FF3B3B] transition-colors duration-500">
          {step.n}
        </span>
      </div>

      <h3 className="text-2xl font-light mb-4 text-white tracking-wide group-hover:translate-x-1 transition-transform duration-500">
        {step.t}
      </h3>
      
      <p className="text-zinc-500 leading-relaxed text-sm font-light group-hover:text-zinc-300 transition-colors duration-500">
        {step.d}
      </p>

      <div className="absolute bottom-0 left-0 h-[2px] bg-[#FF3B3B] w-0 group-hover:w-full transition-all duration-700 ease-out" />
    </motion.div>
  );
};

function useMotionTemplate(fragments, ...values) {
  return useSpring(useTransform(values[0], (v) => fragments[0] + v + fragments[1] + values[1].get() + fragments[2]), {
    stiffness: 100,
    damping: 30,
  });
}

export default QuietCeremony;