import type { CheckedState } from "@radix-ui/react-checkbox";
import type { PasswordOptionId, PasswordOptionsRecord } from "@/lib/types";

type FormOptionsOnChange = (value: PasswordOptionsRecord) => void;
type FormCharacterLengthOnChange = (value: number) => void;

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

export const createGeneratorOptionCheckedChangeHandler = (
  options: PasswordOptionsRecord,
  onChange: FormOptionsOnChange,
  optionId: PasswordOptionId
) => {
  return (checked: CheckedState) => {
    onChange(getUpdatedPasswordOptions(options, optionId, checked));
  };
};

export const createGeneratorCharacterLengthChangeHandler = (onChange: FormCharacterLengthOnChange) => {
  return (value: number[]) => {
    onChange(getCharacterLengthFromSliderValue(value));
  };
};
