import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { DB } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  user: null,
  setUser: (user) => set({ currentUser: user }),
  setChatUser: (user) => set({ user }),
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(DB, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
