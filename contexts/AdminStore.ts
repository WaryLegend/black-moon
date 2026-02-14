import { Admin } from "@/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminStore {
  admin: Admin | null;
  isAuthenticated: boolean;
  setAdmin: (admin: Admin) => void;
  setAuthenticated: (admin: Admin) => void;
  resetAuthenticated: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,

      setAdmin: (admin: Admin) =>
        set(() => ({
          admin,
        })),

      setAuthenticated: (admin: Admin) =>
        set(() => ({
          admin: admin,
          isAuthenticated: true,
        })),

      resetAuthenticated: () => {
        set(() => ({
          admin: null,
          isAuthenticated: false,
        }));

        // clear localStorage "user"
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin");
        }
      },
    }),
    {
      name: "admin",
    },
  ),
);
