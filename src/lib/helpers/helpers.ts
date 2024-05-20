import {
  PasswordFormSchema,
  PasswordFormType,
  PasswordStrength,
  PasswordStrengthDescriptionSchema,
  PasswordStrengthDescriptionType,
} from "@/lib/types";

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
  [PasswordStrength.TooWeak]: "bg-destructive",
  [PasswordStrength.Weak]: "bg-warning",
  [PasswordStrength.Medium]: "bg-yellow-500",
  [PasswordStrength.Strong]: "bg-primary",
  [PasswordStrength.Empty]: "bg-transparent",
};

// Utility function to check if a pill should be active based on the index
export const isActivePill = (strength: PasswordStrength, index: number, pillStrengthMap: Record<PasswordStrength, number>): boolean => {
  return index < pillStrengthMap[strength];
};

export const generatePassword = (length: number, options: { [key: string]: boolean }): string => {
  // Define the character set for each character type
  const charset = {
    includeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    includeLowercase: "abcdefghijklmnopqrstuvwxyz",
    includeNumbers: "0123456789",
    includeSymbols: "!@#$%^&*()_+[]{}|;:,.<>?/",
  };

  // Create a string of characters based on the options
  let characters = "";
  for (const [key, value] of Object.entries(options)) {
    if (value) {
      characters += charset[key as keyof typeof charset];
    }
  }

  // Generate the password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
};

export const determineStrength = (password: string): PasswordStrength => {
  // If password is empty, return Empty and exit early
  // If password is less than 6 characters, return TooWeak and exit early
  if (password.length === 0) return PasswordStrength.Empty;
  if (password.length < 6) return PasswordStrength.TooWeak;

  // Check if password has uppercase, lowercase, numbers, and symbols:
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

  // Count the number of conditions met:
  const strengthScore = [hasUpper, hasLower, hasNumbers, hasSymbols].filter(Boolean).length;

  // Return the strength based on the score:
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
  // Validate the data using Zod
  const parsedData = PasswordFormSchema.parse(passwordData);

  // Generate the password
  const password = generatePassword(parsedData.characterLength, parsedData.options);

  // Determine the strength of the password
  const strength = determineStrength(password);

  // Validate the password description using Zod
  return PasswordStrengthDescriptionSchema.parse({ password, strength });
};
