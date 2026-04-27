import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import {
  signupUser,
  loginUser
} from "../firebase/auth";

export default function AuthModal({
  setOpen,
  setUser, // IMPORTANT
}) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    if (e) e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      if (isLogin) {
        const user =
          await loginUser(email, password);

        /* Instant Navbar Update */
        if (setUser) {
          setUser({
            ...user,
            name:
              user.displayName ||
              user.email?.split("@")[0],
          });
        }

        toast.success(
          "Logged in successfully"
        );
      } else {
        const user =
          await signupUser(
            name,
            email,
            password
          );

        /* FIXED: SHOW NAME IMMEDIATELY */
        if (setUser) {
          setUser({
            ...user,
            name: name.trim(),
            displayName: name.trim(),
          });
        }

        toast.success(
          "Account created"
        );
      }

      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <form
        onSubmit={submit}
        className="relative w-[400px] bg-zinc-950 border border-red-600/20 rounded-2xl p-8"
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-white text-2xl font-bold mb-6">
          {isLogin
            ? "Login"
            : "Create Account"}
        </h2>

        {!isLogin && (
          <input
            placeholder="Name"
            className="w-full mb-4 p-3 bg-black text-white rounded-lg"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-black text-white rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 bg-black text-white rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded-lg text-white font-bold hover:bg-red-500 transition-colors disabled:opacity-70 cursor-pointer"
        >
          {loading
            ? "Processing..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>

        <p
          onClick={() =>
            !loading &&
            setIsLogin(!isLogin)
          }
          className="text-zinc-400 mt-4 text-sm cursor-pointer hover:text-white transition-colors"
        >
          {isLogin
            ? "Create new account"
            : "Already have account?"}
        </p>
      </form>
    </div>
  );
}