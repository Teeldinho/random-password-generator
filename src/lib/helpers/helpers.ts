import {
  PASSWORD_STRENGTH,
  PasswordFormSchema,
  PasswordFormType,
  PasswordOptionsRecord,
  PasswordStrength,
  PasswordStrengthDescriptionSchema,
  PasswordStrengthDescriptionType,
} from "@/lib/types";

const PASSWORD_STRENGTH_LABELS = Object.freeze({
  [PASSWORD_STRENGTH.Empty]: "",
  [PASSWORD_STRENGTH.TooWeak]: "Too weak!",
  [PASSWORD_STRENGTH.Weak]: "Weak",
  [PASSWORD_STRENGTH.Medium]: "Medium",
  [PASSWORD_STRENGTH.Strong]: "Strong",
} as const satisfies Record<PasswordStrength, string>);

const PASSWORD_CHARACTER_SET = Object.freeze({
  includeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  includeLowercase: "abcdefghijklmnopqrstuvwxyz",
  includeNumbers: "0123456789",
  includeSymbols: "!@#$%^&*()_+[]{}|;:,.<>?/",
} as const satisfies Record<keyof PasswordOptionsRecord, string>);

const PASSWORD_TOO_WEAK_LENGTH_THRESHOLD = 6;
const PASSWORD_SYMBOLS_PATTERN = /[!@#$%^&*()_+[\]{}|;:,.<>?]/;

export function getReadablePasswordStrength(strength: PasswordStrength): string {
  return PASSWORD_STRENGTH_LABELS[strength];
}

export const pillStrengthMap = Object.freeze({
  [PASSWORD_STRENGTH.Empty]: 0,
  [PASSWORD_STRENGTH.TooWeak]: 1,
  [PASSWORD_STRENGTH.Weak]: 2,
  [PASSWORD_STRENGTH.Medium]: 3,
  [PASSWORD_STRENGTH.Strong]: 4,
} as const satisfies Record<PasswordStrength, number>);

export const pillColorMap = Object.freeze({
  [PASSWORD_STRENGTH.TooWeak]: "bg-destructive",
  [PASSWORD_STRENGTH.Weak]: "bg-warning",
  [PASSWORD_STRENGTH.Medium]: "bg-yellow-500",
  [PASSWORD_STRENGTH.Strong]: "bg-primary",
  [PASSWORD_STRENGTH.Empty]: "bg-transparent",
} as const satisfies Record<PasswordStrength, string>);

export const isActivePill = (strength: PasswordStrength, index: number): boolean => {
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
  if (password.length === 0) return PASSWORD_STRENGTH.Empty;
  if (password.length < PASSWORD_TOO_WEAK_LENGTH_THRESHOLD) return PASSWORD_STRENGTH.TooWeak;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = PASSWORD_SYMBOLS_PATTERN.test(password);

  const strengthScore = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;

  switch (strengthScore) {
    case 0:
    case 1:
      return PASSWORD_STRENGTH.TooWeak;
    case 2:
      return PASSWORD_STRENGTH.Weak;
    case 3:
      return PASSWORD_STRENGTH.Medium;
    case 4:
      return PASSWORD_STRENGTH.Strong;
    default:
      return PASSWORD_STRENGTH.Empty;
  }
};

export const handlePasswordGeneration = (passwordData: PasswordFormType): PasswordStrengthDescriptionType => {
  const parsedData = PasswordFormSchema.parse(passwordData);

  const password = generatePassword(parsedData.characterLength, parsedData.options);

  const strength = determineStrength(password);

  return PasswordStrengthDescriptionSchema.parse({ password, strength });
};
