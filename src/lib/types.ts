import { z } from "zod";

export const passwordOptions = [
  { id: "includeUppercase", label: "Include Uppercase Letters" },
  { id: "includeLowercase", label: "Include Lowercase Letters" },
  { id: "includeNumbers", label: "Include Numbers" },
  { id: "includeSymbols", label: "Include Symbols" },
] as const;

export const PasswordFormSchema = z.object({
  characterLength: z.number().min(8).max(20).default(10),
  options: z
    .array(z.string())
    .refine((data) => data.length > 0, {
      message: "Select at least one character type.",
    })
    .default(["includeUppercase", "includeLowercase", "includeNumbers"]),
});

export type PasswordFormType = z.infer<typeof PasswordFormSchema>;
