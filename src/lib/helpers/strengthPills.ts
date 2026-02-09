import { PASSWORD_UI_DEFAULTS } from "@/lib/constants/passwordUi";
import { isActivePill, pillColorMap } from "@/lib/helpers/helpers";
import type { PasswordStrength } from "@/lib/types";

type StrengthPillState = {
  isActive: boolean;
  colorClassName: string;
  borderClassName: string;
  opacityClassName: string;
};

export const getStrengthPillStates = (
  strength: PasswordStrength,
  pillCount: number = PASSWORD_UI_DEFAULTS.STRENGTH_PILL_COUNT
): StrengthPillState[] => {
  return Array.from({ length: pillCount }, (_, index) => {
    const active = isActivePill(strength, index);

    return {
      isActive: active,
      colorClassName: active ? pillColorMap[strength] : "bg-transparent",
      borderClassName: active ? "border-transparent" : "border-white",
      opacityClassName: active ? "opacity-100" : "opacity-80",
    };
  });
};
