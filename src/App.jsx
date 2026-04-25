import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

// Context Provider
import { CapsuleProvider } from "./context/CapsuleContext";

import Navbar from "./components/Navbar";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import AuthModal from "./components/AuthModal";
import Create from "./pages/Create";

import { auth } from "./firebase/firebase";
import { logoutUser } from "./firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name:
            currentUser.displayName ||
            currentUser.email?.split("@")[0] ||
            "User",
          email: currentUser.email,
          uid: currentUser.uid, // Storing UID is essential for database queries
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111111",
            color: "#ffffff",
            border: "1px solid rgba(220,38,38,0.25)",
          },
        }}
      />

      <BrowserRouter>
        {/* Wrap everything that needs capsule data in the Provider */}
        <CapsuleProvider>
          {/* Navbar */}
          <Navbar
            user={user}
            logout={logout}
            setOpen={setOpen}
          />

          {/* Auth Modal */}
          {open && (
            <AuthModal
              setOpen={setOpen}
            />
          )}

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Learn />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </CapsuleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;