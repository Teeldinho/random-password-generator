import { describe, expect, it, vi } from "vitest";
import {
  createGeneratorCharacterLengthChangeHandler,
  createGeneratorOptionCheckedChangeHandler,
  getCharacterLengthFromSliderValue,
  getUpdatedPasswordOptions,
} from "@/lib/helpers/generatorForm";
import type { PasswordOptionsRecord } from "@/lib/types";

const BASE_OPTIONS: PasswordOptionsRecord = {
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: false,
  includeSymbols: false,
};

describe("generator form helpers", () => {
  it("updates one option with checked state", () => {
    const updated = getUpdatedPasswordOptions(BASE_OPTIONS, "includeNumbers", true);

    expect(updated.includeNumbers).toBe(true);
    expect(updated.includeUppercase).toBe(true);
  });

  it("treats indeterminate checked state as false", () => {
    const updated = getUpdatedPasswordOptions(BASE_OPTIONS, "includeLowercase", "indeterminate");

    expect(updated.includeLowercase).toBe(false);
  });

  it("maps slider values to first item", () => {
    expect(getCharacterLengthFromSliderValue([16])).toBe(16);
  });

  it("creates option checked-change handler that calls onChange", () => {
    const onChange = vi.fn();
    const handleChange = createGeneratorOptionCheckedChangeHandler(BASE_OPTIONS, onChange, "includeSymbols");

    handleChange(true);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({
      ...BASE_OPTIONS,
      includeSymbols: true,
    });
  });

  it("creates character-length handler that calls onChange", () => {
    const onChange = vi.fn();
    const handleChange = createGeneratorCharacterLengthChangeHandler(onChange);

    handleChange([12]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(12);
  });
});
