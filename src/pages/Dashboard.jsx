import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, User, Plus, Archive } from "lucide-react";
import AuthModal from "../components/AuthModal";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // 1. Create a state for the actual user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Listen to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Show a blank screen or spinner while checking auth status
  if (loading) return <div className="min-h-screen bg-[#050505]" />;

  // --- LOGGED OUT STATE ---
  // Now we check if user object exists
  if (!user) {
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

  // --- LOGGED IN STATE ---
  return (
    <div className="min-h-screen w-full bg-[#050505] pt-24 pb-12 px-6 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#800000] text-xs uppercase tracking-[0.3em] font-bold mb-2"
            >
              Identity Verified
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl text-white italic"
            >
              Welcome back, {user.displayName || "Alexander"}
            </motion.h1>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#800000] hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
            New Capsule
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 aspect-video rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center p-8">
            <Archive className="w-8 h-8 text-zinc-700 mb-4" />
            <p className="text-zinc-500 italic font-light">
              No active capsules found in this timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6">
            <h3 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#800000]" />
              Your Profile
            </h3>
            <div className="space-y-4">
              <div className="pb-4 border-b border-white/5">
                <p className="text-[10px] uppercase text-zinc-600 tracking-widest">
                  Active Sync
                </p>
                <p className="text-zinc-300 text-sm italic underline decoration-[#800000]">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-zinc-600 tracking-widest">
                  Member Since
                </p>
                <p className="text-zinc-300 text-sm italic">
                   {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "April 2026"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}