import { create } from "zustand";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// localStorage
const storedState = localStorage.getItem("auth-store");
const initialState: AuthState = storedState
  ? JSON.parse(storedState)
  : { user: null, token: null };

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,

  login: (user, token) => {
    const newState = { user, token };
    set(newState);
    localStorage.setItem("auth-store", JSON.stringify(newState));
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("auth-store");
  },
}));