import { PasswordStrength } from "@/lib/types";

const strengthDescription: { [key in PasswordStrength]: string } = {
  [PasswordStrength.Empty]: "",
  [PasswordStrength.TooWeak]: "Too weak!",
  [PasswordStrength.Weak]: "Weak",
  [PasswordStrength.Medium]: "Medium",
  [PasswordStrength.Strong]: "Strong",
};

export function getReadablePasswordStrength(strength: PasswordStrength): string {
  return strengthDescription[strength];
}

export const pillStrengthMap = {
  [PasswordStrength.Empty]: 0,
  [PasswordStrength.TooWeak]: 1,
  [PasswordStrength.Weak]: 2,
  [PasswordStrength.Medium]: 3,
  [PasswordStrength.Strong]: 4,
};

export const pillColorMap = {
  [PasswordStrength.TooWeak]: "bg-red-500",
  [PasswordStrength.Weak]: "bg-orange-500",
  [PasswordStrength.Medium]: "bg-yellow-500",
  [PasswordStrength.Strong]: "bg-green-500",
  [PasswordStrength.Empty]: "bg-transparent",
};

// Utility function to check if a pill should be active based on the index
export const isActivePill = (strength: PasswordStrength, index: number, pillStrengthMap: Record<PasswordStrength, number>): boolean => {
  return index < pillStrengthMap[strength];
};
