import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface PasswordState {
  password: string;
  setPassword: (password: string) => void;
}

const usePasswordStore = create<PasswordState>()(
  devtools(
    persist(
      (set) => ({
        password: "",
        setPassword: (password) => set({ password }),
      }),
      {
        name: "password-storage", // This name is used for local storage
      }
    )
  )
);

export default usePasswordStore;
