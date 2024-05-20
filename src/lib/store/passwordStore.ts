import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PasswordStrength, PasswordStrengthDescriptionType } from "@/lib/types";

type PasswordState = {
  password: string;
  isPasswordGenerated: boolean;
  strength: PasswordStrength;
  copied: boolean;
};

type PasswordActions = {
  setCopied: (copied: boolean) => void;
  setIsPasswordGenerated: (isPasswordGenerated: boolean) => void;
  setPassword: (passwordDescription: PasswordStrengthDescriptionType) => void;
  resetStore: () => void;
};

type PasswordStore = PasswordState & PasswordActions;

const initialStoreState: PasswordState = {
  password: "",
  isPasswordGenerated: false,
  strength: PasswordStrength.Empty,
  copied: false,
};

const usePasswordStore = create<PasswordStore>()(
  devtools((set, get) => ({
    ...initialStoreState,

    setCopied: (copied) => set({ copied }),
    setIsPasswordGenerated: (isPasswordGenerated) => set({ isPasswordGenerated }),
    setPassword: (passwordDescription: PasswordStrengthDescriptionType) => {
      const { password, strength } = passwordDescription;
      set({
        password,
        strength,
        isPasswordGenerated: password.length > 0,
      });
    },
    resetStore: () => set({ ...initialStoreState }),
  }))
);

export default usePasswordStore;
