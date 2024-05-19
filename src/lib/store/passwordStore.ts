import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PasswordStrength } from "@/lib/types";

type PasswordState = {
  password: string;
  isPasswordGenerated: boolean;
  strength: PasswordStrength;
  copied: boolean;
};

type PasswordActions = {
  setCopied: (copied: boolean) => void;
  setIsPasswordGenerated: (isPasswordGenerated: boolean) => void;
  setPassword: (password: string, strength: PasswordStrength) => void;
  resetStore: () => void;
};

type PasswordStore = PasswordState & PasswordActions;

const initialStoreState: PasswordState = {
  password: "P4$5W0rD!",
  isPasswordGenerated: false,
  strength: PasswordStrength.Empty,
  copied: false,
};

const usePasswordStore = create<PasswordStore>()(
  devtools((set, get) => ({
    ...initialStoreState,

    setCopied: (copied) => set({ copied }),
    setIsPasswordGenerated: (isPasswordGenerated) => set({ isPasswordGenerated }),
    setPassword: (password, strength) => {
      set({ password, strength });
      get().setIsPasswordGenerated(true);
    },
    resetStore: () => set({ ...initialStoreState }),
  }))
);

export default usePasswordStore;
