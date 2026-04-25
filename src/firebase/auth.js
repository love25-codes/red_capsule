import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth } from "./firebase";

export const signupUser = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(res.user, {
    displayName: name
  });

  await res.user.reload(); // important

  return auth.currentUser;
};

export const loginUser = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};