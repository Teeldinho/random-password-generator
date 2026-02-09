"use client";

import { StrengthPills } from "@/components/custom-reusable/strength/StrengthPills";
import { useStrengthIndicator } from "@/lib/hooks/useStrengthIndicator";

export default function StrengthIndicator() {
  const { strength, readablePasswordStrength } = useStrengthIndicator();

  return (
    <div className="flex gap-2 items-center">
      <p className="uppercase text-xl font-extrabold">{readablePasswordStrength}</p>
      <StrengthPills strength={strength} />
    </div>
  );
}
