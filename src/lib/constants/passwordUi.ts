export const OUTPUT_CARD_COPY_TEXT = {
  COPIED: "Copied",
  EMPTY_PASSWORD: "No password generated yet.",
} as const;

export const COPY_TOAST_MESSAGES = {
  SUCCESS_TITLE: "Password Copied To Clipboard.",
  SUCCESS_DESCRIPTION: "You can now paste it wherever you need to.",
  ERROR_TITLE: "Failed To Copy Password!",
  ERROR_DESCRIPTION: "Please try again.",
} as const;

export const GENERATION_TOAST = {
  TITLE: "Password Successfully Generated.",
  DESCRIPTION: "You can now copy the password to clipboard or use it wherever you need.",
} as const;

export const PASSWORD_UI_DEFAULTS = {
  STRENGTH_PILL_COUNT: 4,
} as const;

export const PASSWORD_GENERATOR_TEXT = {
  TITLE: "Password Generator",
  STRENGTH_LABEL: "Strength",
  PASSWORD_LENGTH_LABEL: "Password Length",
  GENERATE_BUTTON_LABEL: "Generate",
} as const;
