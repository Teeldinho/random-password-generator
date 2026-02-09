"use client";

import { PASSWORD_UI_DEFAULTS } from "@/lib/constants/passwordUi";
import { getStrengthPillStates } from "@/lib/helpers/strengthPills";
import type { PasswordStrength } from "@/lib/types";

export const useStrengthPills = (
  strength: PasswordStrength,
  pillCount: number = PASSWORD_UI_DEFAULTS.STRENGTH_PILL_COUNT
) => {
  const pillStates = getStrengthPillStates(strength, pillCount);

  return {
    pillStates,
  };
};
