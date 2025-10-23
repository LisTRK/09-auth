import { User } from "@/types/ures";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    isAuthenticated: boolean,
    user: User ,
    setUser: (user: User) => void,
    clearIsAuthenticated: () => void,
}

export const useAuthStore = create<AuthStore>()(
    persist(
    (set) => (
        {
  isAuthenticated: false,
                user: {
      id: "",
    email: "",
    avatar: "",
    username:"",
  },
  setUser: (user: User) => {
                set(() => ({ user, isAuthenticated: true }));
            },
  clearIsAuthenticated: () => {
        set(() => ({ user: {
      id: "",
    email: "",
    avatar: "",
    username:""
        },
            isAuthenticated: false
        }));
            },
        }
        ),
        {
      name: 'user',
            partialize: (state) => ({
                user: state.user,
          isAuthenticated: state.isAuthenticated
      }),
    },
)
);