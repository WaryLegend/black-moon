import { User } from "types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setAuthenticated: (user: User) => void;
  setUser: (user: User) => void;
  resetAuthenticated: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: User) =>
        set(() => ({
          user: user,
        })),

      setAuthenticated: (user: User) =>
        set(() => ({
          user: user,
          isAuthenticated: true,
        })),

      resetAuthenticated: () => {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));

        // clear localStorage "user"
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
      },
    }),
    {
      name: "user", // localStorage key
    },
  ),
);
