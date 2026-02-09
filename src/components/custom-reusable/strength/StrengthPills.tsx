"use client";

import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { PASSWORD_UI_DEFAULTS } from "@/lib/constants/passwordUi";
import { useStrengthPills } from "@/lib/hooks/useStrengthPills";
import { PasswordStrength } from "@/lib/types";
import { cn } from "@/lib/utils";

type StrengthPillProps = BadgeProps & {
  strength: PasswordStrength;
  pillCount?: number;
};

function StrengthPills({ strength, pillCount = PASSWORD_UI_DEFAULTS.STRENGTH_PILL_COUNT, ...props }: StrengthPillProps) {
  const { pillStates } = useStrengthPills(strength, pillCount);
  const pills = pillStates.map((pillState, i) => {
    return (
      <Badge
        key={i}
        className={cn(
          "flex-1 min-h-3 min-w-full rounded-sm transition-opacity duration-1000 p-0 m-0 border-2",
          pillState.colorClassName,
          pillState.borderClassName,
          pillState.opacityClassName
        )}
        {...props}
      />
    );
  });

  return <div className="flex flex-col items-center justify-center space-y-1 h-full min-w-8 ml-4 -rotate-90 mx-2">{pills}</div>;
}

export { StrengthPills };
