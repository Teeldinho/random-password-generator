import { describe, expect, it } from "vitest";
import { determineStrength, generatePassword, isActivePill } from "@/lib/helpers/helpers";
import { getStrengthPillStates } from "@/lib/helpers/strengthPills";
import { PASSWORD_STRENGTH, type PasswordOptionsRecord } from "@/lib/types";

const UPPERCASE_ONLY_OPTIONS: PasswordOptionsRecord = {
  includeUppercase: true,
  includeLowercase: false,
  includeNumbers: false,
  includeSymbols: false,
};

describe("password helpers", () => {
  it("returns empty strength for empty password", () => {
    expect(determineStrength("")).toBe(PASSWORD_STRENGTH.Empty);
  });

  it("returns too weak strength for short password", () => {
    expect(determineStrength("Ab1!")).toBe(PASSWORD_STRENGTH.TooWeak);
  });

  it("returns weak strength when two character classes are used", () => {
    expect(determineStrength("Abcdefgh")).toBe(PASSWORD_STRENGTH.Weak);
  });

  it("returns medium strength when three character classes are used", () => {
    expect(determineStrength("Abcdef12")).toBe(PASSWORD_STRENGTH.Medium);
  });

  it("returns strong strength when all character classes are used", () => {
    expect(determineStrength("Abcd12!@")).toBe(PASSWORD_STRENGTH.Strong);
  });

  it("generates password with requested length and character set", () => {
    const password = generatePassword(12, UPPERCASE_ONLY_OPTIONS);

    expect(password).toHaveLength(12);
    expect(password).toMatch(/^[A-Z]+$/);
  });

  it("returns empty password when no character class is enabled", () => {
    const password = generatePassword(10, {
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: false,
      includeSymbols: false,
    });

    expect(password).toBe("");
  });

  it("marks active pill state based on mapped strength", () => {
    expect(isActivePill(PASSWORD_STRENGTH.Medium, 0)).toBe(true);
    expect(isActivePill(PASSWORD_STRENGTH.Medium, 2)).toBe(true);
    expect(isActivePill(PASSWORD_STRENGTH.Medium, 3)).toBe(false);
  });

  it("derives strength pill states with active and inactive classes", () => {
    const pillStates = getStrengthPillStates(PASSWORD_STRENGTH.Weak, 4);

    expect(pillStates).toHaveLength(4);
    expect(pillStates[0]?.isActive).toBe(true);
    expect(pillStates[1]?.isActive).toBe(true);
    expect(pillStates[2]?.isActive).toBe(false);
    expect(pillStates[3]?.isActive).toBe(false);
  });
});
