"use client";

import usePasswordStore from "@/lib/store/passwordStore";
import { StrengthPills } from "@/components/custom-reusable/strength/StrengthPills";
import { getReadablePasswordStrength } from "@/lib/helpers/helpers";

export default function StrengthIndicator() {
  const { strength } = usePasswordStore((state) => state);
  const readablePasswordStrengh = getReadablePasswordStrength(strength);

  return (
    <div className="flex gap-2 items-center">
      <p className="uppercase text-xl font-extrabold">{readablePasswordStrengh}</p>
      <StrengthPills strength={strength} />
    </div>
  );
}
