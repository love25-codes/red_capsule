import { createContext, useContext, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CapsuleContext = createContext();

export const CapsuleProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const createCapsule = async (capsuleData) => {
    if (!auth.currentUser) throw new Error("No user authenticated");
    
    setLoading(true);
    try {
      // This is the "Individual Storage" logic: 
      // Every document gets the specific UID of the creator.
      const docRef = await addDoc(collection(db, "capsules"), {
        ...capsuleData,
        userId: auth.currentUser.uid, // Crucial for security rules
        userEmail: auth.currentUser.email,
        isOpened: false,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating capsule:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CapsuleContext.Provider value={{ createCapsule, loading }}>
      {children}
    </CapsuleContext.Provider>
  );
};

export const useCapsules = () => {
  const context = useContext(CapsuleContext);
  if (!context) {
    throw new Error("useCapsules must be used within a CapsuleProvider");
  }
  return context;
};