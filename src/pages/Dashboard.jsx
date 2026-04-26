import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import {
  Loader2,
  Lock,
  Unlock,
  Sparkles,
  Trash2,
  Clock3,
  ShieldAlert,
  X,
} from "lucide-react";

import { auth, db } from "../firebase/firebase";
import LockedArchive from "../context/LockedArchive";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("locked");

  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const [now, setNow] = useState(Date.now());

  /* ------------------------------------ */
  /* Restore Firebase Login */
  /* ------------------------------------ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ------------------------------------ */
  /* Live Clock */
  /* ------------------------------------ */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ------------------------------------ */
  /* Fetch Capsules */
  /* ------------------------------------ */
  useEffect(() => {
    if (!user?.uid) {
      setCapsules([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "capsules"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        setCapsules(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  /* ------------------------------------ */
  /* Helpers */
  /* ------------------------------------ */
  const isReady = (capsule) =>
    new Date(capsule.unlockDate).getTime() <= now;

  const getUnlockTime = (capsule) =>
    new Date(capsule.unlockDate).getTime();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getCountdown = (date) => {
    const diff = new Date(date).getTime() - now;

    if (diff <= 0) return "Ready to open";

    const sec = Math.floor(diff / 1000);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const moodEmoji = (mood) => {
    const map = {
      Hopeful: "✨",
      Happy: "😊",
      Excited: "🔥",
      Focused: "🎯",
      Reflective: "🌊",
      Anxious: "🌪️",
      Grateful: "🙏",
    };

    return map[mood] || "📦";
  };

  /* ------------------------------------ */
  /* Sorting */
  /* ------------------------------------ */
  const lockedCapsules = useMemo(() => {
    return capsules
      .filter((c) => !c.isOpened)
      .sort((a, b) => {
        const aReady = isReady(a);
        const bReady = isReady(b);

        if (aReady && !bReady) return -1;
        if (!aReady && bReady) return 1;

        return getUnlockTime(a) - getUnlockTime(b);
      });
  }, [capsules, now]);

  const openedCapsules = useMemo(() => {
    return capsules
      .filter((c) => c.isOpened)
      .sort((a, b) => {
        const aTime = a.openedAt
          ? new Date(a.openedAt).getTime()
          : 0;

        const bTime = b.openedAt
          ? new Date(b.openedAt).getTime()
          : 0;

        return bTime - aTime;
      });
  }, [capsules]);

  const shownCapsules =
    view === "locked" ? lockedCapsules : openedCapsules;

  const stats = useMemo(
    () => ({
      total: capsules.length,
      locked: lockedCapsules.length,
      opened: openedCapsules.length,
    }),
    [capsules, lockedCapsules, openedCapsules]
  );

  /* ------------------------------------ */
  /* Actions */
  /* ------------------------------------ */
  const handleOpen = async (capsule) => {
    const ready = isReady(capsule);

    if (capsule.isOpened) {
      setSelectedCapsule(capsule);
      return;
    }

    if (!ready) {
      setSelectedCapsule(capsule);
      return;
    }

    try {
      await updateDoc(doc(db, "capsules", capsule.id), {
        isOpened: true,
        openedAt: new Date().toISOString(),
      });

      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.6 },
      });

      setView("decrypted");

      setSelectedCapsule({
        ...capsule,
        isOpened: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this capsule permanently?"
    );

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "capsules", id));
      setSelectedCapsule(null);
    } catch (error) {
      console.error(error);
    }
  };

  /* ------------------------------------ */
  /* Loading */
  /* ------------------------------------ */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (!user) return <LockedArchive />;

  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">
              Personal Vault
            </p>

            <h1 className="text-5xl font-serif">
              Capsule Dashboard
            </h1>

            <p className="text-zinc-500 mt-3 text-sm">
              {user.email}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setView("locked")}
              className={`px-6 py-3 rounded-xl hover:cursor-pointer  transition-all ${
                view === "locked"
                  ? "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  : "bg-zinc-900"
              }`}
            >
              Locked ({stats.locked})
            </button>

            <button
              onClick={() => setView("decrypted")}
              className={`px-6 py-3 rounded-xl hover:cursor-pointer transition-all ${
                view === "decrypted"
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-white"
              }`}
            >
              Decrypted ({stats.opened})
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Total Capsules", stats.total],
            ["Locked", stats.locked],
            ["Opened", stats.opened],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6"
            >
              <p className="text-zinc-500 text-sm">{label}</p>
              <h3 className="text-3xl font-bold mt-2">
                {value}
              </h3>
            </div>
          ))}
        </div>

        {/* Capsules */}
        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : shownCapsules.length === 0 ? (
          <div className="py-24 border border-dashed border-white/10 rounded-3xl text-center">
            <ShieldAlert className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-400">
              No capsules found.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            <AnimatePresence>
              {shownCapsules.map((capsule) => {
                const ready = isReady(capsule);

                return (
                  <motion.div
                    key={capsule.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleOpen(capsule)}
                    className={`group relative overflow-hidden rounded-3xl p-6 pb-8 border transition-all duration-300 cursor-pointer ${
                      capsule.isOpened
                        ? "bg-zinc-900 border-white/10 hover:border-red-500/50"
                        : ready
                        ? "bg-red-950/20 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.2)]"
                        : "bg-zinc-900/40 border-white/5 hover:border-red-600/50"
                    }`}
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)]" />
                    </div>

                    <div className="flex justify-between gap-5 relative z-10">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-2xl border border-white/5">
                          {moodEmoji(capsule.mood)}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">
                            {capsule.title}
                          </h3>

                          <p className="text-sm text-zinc-400 mt-1">
                            Mood: {capsule.mood}
                          </p>

                          <p className="text-zinc-500 text-sm mt-1">
                            Opens on{" "}
                            {formatDate(
                              capsule.unlockDate
                            )}
                          </p>

                          {!capsule.isOpened && (
                            <p
                              className={`text-xs mt-2 font-medium ${
                                ready
                                  ? "text-red-400 animate-pulse"
                                  : "text-zinc-400"
                              }`}
                            >
                              {getCountdown(
                                capsule.unlockDate
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Top Right Status Icon */}
                      <div className="flex flex-col items-center">
                        {capsule.isOpened ? (
                          <Unlock className="text-white" />
                        ) : ready ? (
                          <Sparkles className="text-red-400 animate-bounce" />
                        ) : (
                          <Lock className="text-zinc-500" />
                        )}
                      </div>
                    </div>

                    {/* DELETE BUTTON - ABSOLUTE POSITIONED BOTTOM RIGHT */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(capsule.id);
                      }}
                      className="absolute bottom-4 right-4 w-9 h-9 rounded-xl bg-red-600/20 hover:bg-red-600 flex items-center justify-center transition z-20"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 group-hover:text-white transition-colors" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCapsule && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="w-full max-w-xl bg-zinc-950 border border-white/10 rounded-3xl p-8 relative"
            >
              <button
                onClick={() =>
                  setSelectedCapsule(null)
                }
                className="absolute top-4 right-4 text-zinc-500 hover:text-white"
              >
                <X />
              </button>

              <h2 className="text-3xl font-serif mb-3">
                {selectedCapsule.title}
              </h2>

              <p className="text-zinc-400 mb-2">
                Mood: {selectedCapsule.mood}{" "}
                {moodEmoji(selectedCapsule.mood)}
              </p>

              <p className="text-zinc-500 text-sm mb-6">
                Opens on{" "}
                {formatDate(
                  selectedCapsule.unlockDate
                )}
              </p>

              {selectedCapsule.isOpened ? (
                <>
                  <p className="text-zinc-200 whitespace-pre-wrap leading-relaxed">
                    {selectedCapsule.message}
                  </p>

                  <button
                    onClick={() =>
                      handleDelete(
                        selectedCapsule.id
                      )
                    }
                    className="mt-8 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 flex gap-2 items-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Capsule
                  </button>
                </>
              ) : (
                <div className="rounded-2xl bg-zinc-900 p-6 border border-white/5">
                  <div className="flex gap-3 items-center mb-4">
                    <Clock3 className="text-red-500" />
                    <p>Unlocks In</p>
                  </div>

                  <p className="text-2xl font-bold text-red-400">
                    {getCountdown(
                      selectedCapsule.unlockDate
                    )}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}