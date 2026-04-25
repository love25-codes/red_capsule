import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock,Sparkles } from "lucide-react";

export default function Banner() {
  // Increased count for a continuous flow
  const particles = Array.from({ length: 40 });

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center px-6 md:px-20 overflow-hidden relative">
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF3B3B]/5 rounded-full blur-[180px] -z-20" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF3B3B]/10 rounded-full blur-[120px] -z-20" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-20 relative">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-30 order-2 lg:order-1"
        >
          <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF3B3B]/30 text-[#FF3B3B] text-xs font-mono-disp tracking-[0.2em] uppercase mb-8"
>
  <Sparkles className="w-3 h-3" strokeWidth={1.5} />
  <span>A time vault for your soul</span>
</motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-6">
            Send a message <br />
            <span className="italic text-zinc-400">to your </span>
            <span className="text-[#FF3B3B] drop-shadow-[0_0_15px_rgba(255,59,59,0.4)]">future self.</span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Seal a thought, a hope, or a fear inside a capsule. Lock it in time. 
            When the day comes — open it, and meet who you used to be.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/create"
              className="bg-[#FF3B3B] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#D62E2E] transition-all shadow-[0_10px_30px_rgba(255,59,59,0.3)] "
            >
              Create Your First Capsule
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/dashboard"
              className="border border-white/10 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <Lock className="w-4 h-4 text-[#FF3B3B]" />
              Open the vault
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Capsule and Rapid Particles */}
        <div className="relative flex justify-center items-center h-[500px] w-full order-1 lg:order-2">
          
          {/* RAPID SHINY PARTICLES */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            {particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                initial={{ 
                  x: (Math.random() - 0.5) * 100, 
                  y: (Math.random() - 0.5) * 150, 
                  opacity: 0,
                  scale: 0 
                }}
                animate={{ 
                  x: (Math.random() - 0.5) * 600, 
                  y: (Math.random() - 0.5) * 600,
                  opacity: [0, 1, 1, 0],
                  scale: [0, Math.random() * 1.2 + 0.3, 0],
                }}
                transition={{ 
                  duration: Math.random() * 2 + 1.5,
                  repeat: Infinity, 
                  ease: "easeOut",
                  delay: Math.random() * 5 
                }}
                style={{
                  width: i % 5 === 0 ? '4px' : '2px', 
                  height: i % 5 === 0 ? '4px' : '2px',
                  boxShadow: i % 3 === 0 
                    ? '0 0 10px 2px #FF3B3B' 
                    : '0 0 8px 1px rgba(255, 255, 255, 0.9)',
                  mixBlendMode: 'screen'
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            // NEW HOVER LOGIC
            whileHover={{ 
              rotateY: 15, 
              rotateX: -10, 
              scale: 1.05,
              transition: { duration: 0.4, ease: "easeOut" } 
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-20 flex justify-center items-center cursor-pointer perspective-1000"
            style={{ perspective: "1000px" }} // Enhances the 3D tilt effect
          >
            {/* Background Glow */}
            <div className="absolute w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-[#FF3B3B] rounded-full blur-[130px] opacity-30 animate-pulse" />

            {/* Glass Capsule */}
            <div className="relative w-64 md:w-72 h-auto aspect-[1/1.6] border-[2.5px] border-white/20 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[inset_0_0_50px_rgba(255,59,59,0.3)] overflow-hidden">
              
              {/* Internal Refraction Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3B3B]/10 via-transparent to-white/5" />
              
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  filter: ["blur(6px)", "blur(3px)", "blur(6px)"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-auto aspect-[1/2] bg-gradient-to-b from-[#FF3B3B] via-[#FF3B3B]/40 to-transparent rounded-full opacity-60 relative"
              >
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1/2 h-[15%] bg-white blur-[10px] opacity-40" />
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-7xl select-none drop-shadow-[0_0_20px_#FF3B3B]"
                >
                  ⏳
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}