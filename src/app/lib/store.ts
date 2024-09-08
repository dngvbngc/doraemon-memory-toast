import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: string;
  login: (user: string) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: "",
      login: (user: string) => set(() => ({ user })),
      logout: () => set(() => ({ user: "" })),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
