"use client";

import { getReadablePasswordStrength } from "@/lib/helpers/helpers";
import usePasswordStore from "@/lib/store/passwordStore";

export const useStrengthIndicator = () => {
  const { strength } = usePasswordStore((state) => state);
  const readablePasswordStrength = getReadablePasswordStrength(strength);

  return {
    strength,
    readablePasswordStrength,
  };
};
