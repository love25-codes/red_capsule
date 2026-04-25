import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Loader2, Lock, ArrowLeft, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase";
import { useCapsules } from "../context/CapsuleContext";
import LockedArchive from "../context/LockedArchive";

const PRESETS = [
  { label: "1 Week", days: 7 },
  { label: "1 Month", days: 30 },
  { label: "1 Year", days: 365 },
  { label: "5 Years", days: 1825 },
];

const MOODS = [
  { label: "Happy", emoji: "😊", color: "text-yellow-400" },
  { label: "Hopeful", emoji: "✨", color: "text-blue-400" },
  { label: "Excited", emoji: "🔥", color: "text-orange-500" },
  { label: "Sad", emoji: "🌧️", color: "text-indigo-400" },
  { label: "Calm", emoji: "🌊", color: "text-teal-400" },
  { label: "Reflective", emoji: "🕯️", color: "text-purple-400" },
  { label: "Anxious", emoji: "🌪️", color: "text-zinc-400" },
  { label: "Grateful", emoji: "🙏", color: "text-rose-400" },
];

export default function Create() {
  const navigate = useNavigate();
  const { createCapsule, loading } = useCapsules();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState(MOODS[1]); // Default to Hopeful
  const [unlockDate, setUnlockDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  if (!user) return <LockedArchive />;

  const applyPreset = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setUnlockDate(d.toISOString().slice(0, 16));
  };

  const handleAddTag = () => {
    const val = tagInput.trim().toLowerCase();
    if (val && !tags.includes(val) && tags.length < 6) {
      setTags([...tags, val]);
      setTagInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim() || !unlockDate) {
      return toast.error("The archive requires complete entries.");
    }

    try {
      await createCapsule({
        title: title.trim(),
        message: message.trim(),
        mood: mood.label,
        tags,
        unlockDate: new Date(unlockDate).toISOString(),
      });
      toast.success("Capsule sealed in the void.");
      navigate("/dashboard");
    } catch (err) {
      toast.error("The sealing process failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-light relative overflow-x-hidden selection:bg-red-900/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-12 italic font-serif"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Silence
        </motion.button>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Header Section */}
          <section>
            <p className="text-red-800 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
              — Preservation Protocol
            </p>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white leading-[1.1] tracking-tight">
              What should your <span className="text-red-900/80">future self</span> inherit?
            </h1>
          </section>

          {/* Title Input */}
          <div className="group">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 group-focus-within:text-red-800 transition-colors">Entry Nomenclature</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A name for this moment..."
              className="w-full mt-4 bg-transparent border-b border-white/5 py-4 text-4xl font-serif italic outline-none focus:border-red-900/50 transition-all placeholder:text-zinc-800 text-white"
            />
          </div>

          {/* Mood Selector */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-6">Internal Resonance (Mood)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOODS.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ${
                    mood.label === m.label 
                    ? "bg-white/5 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.03)]" 
                    : "border-white/5 opacity-40 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span className={`text-sm italic font-serif ${mood.label === m.label ? "text-white" : "text-zinc-500"}`}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="relative">
            <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">The Transmission</label>
            <textarea
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write to the person you haven't become yet..."
              className="w-full mt-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 resize-none outline-none focus:border-red-900/30 transition-all italic font-serif text-lg leading-relaxed text-zinc-200"
            />
          </div>

          {/* Unlock Logic */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-8">
             <label className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 block mb-6 text-center">Temporal Lock</label>
             
             <div className="flex flex-wrap justify-center gap-2 mb-8">
               {PRESETS.map((p) => (
                 <button
                   key={p.label}
                   type="button"
                   onClick={() => applyPreset(p.days)}
                   className="px-5 py-2 rounded-full border border-white/5 text-xs hover:bg-white hover:text-black transition-all font-medium uppercase tracking-widest"
                 >
                   {p.label}
                 </button>
               ))}
             </div>

             <div className="relative max-w-sm mx-auto">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-900" />
                <input
                  type="datetime-local"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-red-900 text-sm uppercase tracking-tighter"
                  // Customizing the "choose a date" appearance
                  style={{ colorScheme: 'dark' }}
                />
                {!unlockDate && (
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none italic text-sm">
                    Select a date to re-emerge...
                  </span>
                )}
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button
              type="submit"
              disabled={loading}
              className="group relative px-12 py-5 rounded-full bg-white text-black font-bold uppercase tracking-[0.2em] text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-3 h-3" /> Seal Memory
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-zinc-600 hover:text-red-800 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
            >
              Discard Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}