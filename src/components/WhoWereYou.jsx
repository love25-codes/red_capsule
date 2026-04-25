import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function WhoWereYou() {
  return (
    <section className="relative w-full bg-[#050505] py-24 border-t border-white/5 overflow-hidden">
      {/* 1. Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_70%)]" />
        
        {/* Animated Core Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3B3B] blur-[120px] rounded-full" 
        />
        
        {/* Subtle Scanline Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Header Label - Adds a sense of "system" or "ritual" */}
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 0.5, letterSpacing: "0.4em" }}
            className="block text-[10px] uppercase text-white mb-8 tracking-[0.4em] font-medium"
          >
            
          </motion.span>

          {/* Main Heading - Refined Serif/Italic Contrast */}
          <h2 className="text-4xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white font-light italic">
            <span className="relative inline-block">
              <motion.span 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#FF3B3B] drop-shadow-[0_0_15px_rgba(255,59,59,0.3)]"
              >
                "Who were you
              </motion.span>
            </span>
            <br className="md:hidden" /> 
            <span className="opacity-90"> a year ago?"</span>
          </h2>

          {/* Subtext - Balanced for readability and vibe */}
          <p className="text-zinc-400 text-base md:text-xl italic max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Some answers only exist in the <span className="text-white/60 underline decoration-[#FF3B3B]/30 underline-offset-4">past</span>. 
            Red Capsule keeps them safe until you're ready to remember.
          </p>

          {/* CTA Button - Enhanced with Hover Transition */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block relative group"
          >
            {/* Button Outer Glow */}
            <div className="absolute -inset-1 bg-[#FF3B3B]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Link
              to="/create"
              className="relative flex items-center gap-4 bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FF3B3B] hover:text-white"
            >
              Begin the ritual
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}