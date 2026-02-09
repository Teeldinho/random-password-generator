import {
  PasswordFormSchema,
  PasswordFormType,
  PasswordOptionsRecord,
  PasswordStrength,
  PasswordStrengthDescriptionSchema,
  PasswordStrengthDescriptionType,
} from "@/lib/types";

const PASSWORD_STRENGTH_LABELS: Readonly<Record<PasswordStrength, string>> = Object.freeze({
  [PasswordStrength.Empty]: "",
  [PasswordStrength.TooWeak]: "Too weak!",
  [PasswordStrength.Weak]: "Weak",
  [PasswordStrength.Medium]: "Medium",
  [PasswordStrength.Strong]: "Strong",
});

const PASSWORD_CHARACTER_SET: Readonly<Record<keyof PasswordOptionsRecord, string>> = Object.freeze({
  includeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  includeLowercase: "abcdefghijklmnopqrstuvwxyz",
  includeNumbers: "0123456789",
  includeSymbols: "!@#$%^&*()_+[]{}|;:,.<>?/",
});

const PASSWORD_TOO_WEAK_LENGTH_THRESHOLD = 6;
const PASSWORD_SYMBOLS_PATTERN = /[!@#$%^&*()_+[\]{}|;:,.<>?]/;

export function getReadablePasswordStrength(strength: PasswordStrength): string {
  return PASSWORD_STRENGTH_LABELS[strength];
}

export const pillStrengthMap: Readonly<Record<PasswordStrength, number>> = Object.freeze({
  [PasswordStrength.Empty]: 0,
  [PasswordStrength.TooWeak]: 1,
  [PasswordStrength.Weak]: 2,
  [PasswordStrength.Medium]: 3,
  [PasswordStrength.Strong]: 4,
});

export const pillColorMap: Readonly<Record<PasswordStrength, string>> = Object.freeze({
  [PasswordStrength.TooWeak]: "bg-destructive",
  [PasswordStrength.Weak]: "bg-warning",
  [PasswordStrength.Medium]: "bg-yellow-500",
  [PasswordStrength.Strong]: "bg-primary",
  [PasswordStrength.Empty]: "bg-transparent",
});

// Utility function to check if a pill should be active based on the index
export const isActivePill = (strength: PasswordStrength, index: number, pillStrengthMap: Record<PasswordStrength, number>): boolean => {
  return index < pillStrengthMap[strength];
};

export const generatePassword = (length: number, options: PasswordOptionsRecord): string => {
  let characters = "";
  for (const [key, value] of Object.entries(options) as [keyof PasswordOptionsRecord, boolean][]) {
    if (value) {
      characters += PASSWORD_CHARACTER_SET[key];
    }
  }

  if (!characters) {
    return "";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};

export const determineStrength = (password: string): PasswordStrength => {
  if (password.length === 0) return PasswordStrength.Empty;
  if (password.length < PASSWORD_TOO_WEAK_LENGTH_THRESHOLD) return PasswordStrength.TooWeak;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = PASSWORD_SYMBOLS_PATTERN.test(password);

  const strengthScore = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;

  switch (strengthScore) {
    case 0:
    case 1:
      return PasswordStrength.TooWeak;
    case 2:
      return PasswordStrength.Weak;
    case 3:
      return PasswordStrength.Medium;
    case 4:
      return PasswordStrength.Strong;
    default:
      return PasswordStrength.Empty;
  }
};

export const handlePasswordGeneration = (passwordData: PasswordFormType): PasswordStrengthDescriptionType => {
  const parsedData = PasswordFormSchema.parse(passwordData);

  const password = generatePassword(parsedData.characterLength, parsedData.options);

  const strength = determineStrength(password);

  return PasswordStrengthDescriptionSchema.parse({ password, strength });
};
