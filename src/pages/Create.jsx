import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Loader2,
  Lock,
  X,
  Plus
} from "lucide-react";
import toast from "react-hot-toast";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";
import LockedArchive from "../context/LockedArchive";

const PRESETS = [
  { label: "1 Week", days: 7 },
  { label: "1 Month", days: 30 },
  { label: "6 Months", days: 183 },
  { label: "1 Year", days: 365 },
  { label: "5 Years", days: 1825 },
];

const moodList = [
  { label: "Hopeful", emoji: "✨" },
  { label: "Happy", emoji: "😊" },
  { label: "Excited", emoji: "🔥" },
  { label: "Focused", emoji: "🎯" },
  { label: "Reflective", emoji: "🌊" },
  { label: "Anxious", emoji: "🌪️" },
  { label: "Grateful", emoji: "🙏" },
];

export default function Create() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("Hopeful");
  const [unlockDate, setUnlockDate] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Auth Guard
  if (!user) return <LockedArchive />;

  // Logic to block past dates
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const clearForm = () => {
    setTitle("");
    setMessage("");
    setMood("Hopeful");
    setUnlockDate("");
    setTags([]);
    setTagInput("");
    toast.success("Form cleared successfully.");
  };

  const applyPreset = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setUnlockDate(d.toISOString().slice(0, 16));
  };

  const addTag = () => {
    const val = tagInput.trim().toLowerCase();
    if (!val || tags.includes(val) || tags.length >= 6) return;
    setTags([...tags, val]);
    setTagInput("");
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim() || !unlockDate) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    if (new Date(unlockDate) <= new Date()) {
      toast.error("Unlock date must be in the future.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "capsules"), {
        userId: user.uid,
        userEmail: user.email,
        title: title.trim(),
        message: message.trim(),
        mood,
        tags,
        unlockDate: new Date(unlockDate).toISOString(),
        isOpened: false,
        createdAt: serverTimestamp(),
      });
      
      toast.success("Capsule sealed successfully.");
      
      setTitle("");
      setMessage("");
      setMood("Hopeful");
      setUnlockDate("");
      setTags([]);
      setTagInput("");
      
    } catch (err) {
      toast.error("Failed to seal capsule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-red-500/30 py-20 px-6">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-zinc-900/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-red-500 font-mono tracking-[0.4em] text-[10px] font-bold mb-4 uppercase">
            — A new Capsule
          </p>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            What do you want your <span className="text-red-600 italic">Future self</span><br/>to know?
          </h1>
        </motion.div>

        {/* The Form Container */}
        <form 
          onSubmit={submit} 
          className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl space-y-10"
        >
          
          {/* Section 1: Core Info */}
          <div className="space-y-8">
            <div className="group">
              <label className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 group-focus-within:text-red-500 transition-colors block mb-2">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give this moment a name..."
                className="w-full bg-transparent border-b border-white/10 py-3 text-2xl font-serif outline-none focus:border-red-600 transition-all placeholder:text-zinc-800 text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 block mb-4">
                your message
              </label>
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear future me..."
                className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl p-5 resize-none outline-none focus:border-red-900 focus:bg-white/[0.04] transition-all placeholder:text-zinc-700 leading-relaxed text-white"
              />
            </div>
          </div>

          {/* Section 2: Details Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mood Selector */}
            <div className="space-y-4">
              <label className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 block">
                how do you feel today?
              </label>
              <div className="flex flex-wrap gap-2">
                {moodList.map((m) => (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setMood(m.label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs transition-all duration-300 ${
                      mood === m.label
                        ? "bg-white text-black border-white shadow-lg"
                        : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-red-500/50"
                    }`}
                  >
                    <span>{m.emoji}</span>
                    <span className="font-medium truncate">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Input */}
            <div className="space-y-4">
              <label className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 block">Index Tags</label>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="dreams, secret..."
                  className="flex-1 bg-zinc-950/50 border border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-red-600 transition-all text-white"
                />
                <button 
                  type="button" 
                  onClick={addTag} 
                  className="p-2 rounded-xl border border-white/5 bg-zinc-900/60 hover:bg-white hover:text-black transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span 
                    key={tag} 
                    onClick={() => removeTag(tag)} 
                    className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/20 text-[10px] text-red-400 cursor-pointer hover:bg-red-600 hover:text-white transition-all"
                  >
                    #{tag} <X className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Time Logic */}
          <div className="space-y-6 pt-8 border-t border-white/5">
            <label className="text-[11px] uppercase tracking-[0.3em] text-zinc-500 block font-bold">
              Temporal Lock (Awakening Date)
            </label>
            
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => applyPreset(item.days)}
                  className="px-4 py-1.5 rounded-lg border border-white/5 bg-zinc-950 text-[10px] font-bold hover:bg-red-600 hover:border-red-600 transition-all uppercase tracking-widest text-zinc-500 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 z-10 pointer-events-none" />
              <input
                type="datetime-local"
                min={getMinDateTime()}
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xs outline-none focus:border-red-600 transition-all font-mono text-white"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Section 4: Submission */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-red-600 hover:bg-red-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-xl shadow-red-600/10 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <div className="relative">
                   <Lock className="w-4 h-4" />
                   <Sparkles className="absolute -top-3 -right-3 w-3 h-3 text-white/50 animate-pulse" />
                </div>
              )}
              {loading ? "Sealing Protocol..." : "Seal Transmission"}
            </motion.button>

            <button
              type="button"
              onClick={clearForm}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/5 text-zinc-500 hover:text-red-500 hover:bg-red-500/5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Footer info */}
        <p className="mt-8 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
          End of entry — All data is encrypted and locked
        </p>

      </div>
    </div>
  );
}