import type { CheckedState } from "@radix-ui/react-checkbox";
import type { PasswordOptionId, PasswordOptionsRecord } from "@/lib/types";

export const getUpdatedPasswordOptions = (
  options: PasswordOptionsRecord,
  optionId: PasswordOptionId,
  checked: CheckedState
): PasswordOptionsRecord => {
  return {
    ...options,
    [optionId]: checked === true,
  };
};

export const getCharacterLengthFromSliderValue = (value: number[]): number => {
  return value[0];
};
