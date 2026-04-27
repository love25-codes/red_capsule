import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { auth } from "./firebase";

/* ---------------------------------- */
/* SIGNUP USER */
/* ---------------------------------- */
export const signupUser = async (
  name,
  email,
  password
) => {
  const res =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  /* Save entered name instantly */
  await updateProfile(res.user, {
    displayName: name.trim(),
  });

  /* Refresh latest user data */
  await res.user.reload();

  /* Return updated user */
  return auth.currentUser;
};

/* ---------------------------------- */
/* LOGIN USER */
/* ---------------------------------- */
export const loginUser = async (
  email,
  password
) => {
  const res =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  await res.user.reload();

  return auth.currentUser;
};

/* ---------------------------------- */
/* LOGOUT USER */
/* ---------------------------------- */
export const logoutUser = async () => {
  await signOut(auth);
};