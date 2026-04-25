import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function LockedArchive() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full bg-[#800000]/30 blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
              />
            ))}
            <div className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-white/5 border border-white/10">
              <Lock className="w-6 h-6 text-[#800000]" />
            </div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4">
            "The archive is locked."
          </h2>

          <p className="text-zinc-500 max-w-sm mx-auto mb-8 font-light italic">
            To view your past self and your stored capsules, you must first
            authenticate your identity.
          </p>
        </motion.div>
      </div>
    );
}