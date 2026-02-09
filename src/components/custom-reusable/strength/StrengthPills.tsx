"use client";

import React from "react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { PasswordStrength } from "@/lib/types";
import { cn } from "@/lib/utils";
import { isActivePill, pillColorMap } from "@/lib/helpers/helpers";

type StrengthPillProps = BadgeProps & {
  strength: PasswordStrength;
  pillCount?: number;
};

function StrengthPills({ strength, pillCount = 4, ...props }: StrengthPillProps) {
  // Create pill elements
  const pills = Array.from({ length: pillCount }, (_, i) => {
    const isActive = isActivePill(strength, i);
    return (
      <Badge
        key={i}
        className={cn(
          "flex-1 min-h-3 min-w-full rounded-sm transition-opacity duration-1000 p-0 m-0 border-2",
          isActive ? pillColorMap[strength] : "bg-transparent",
          isActive ? "border-transparent" : "border-white",
          { "opacity-100": isActive, "opacity-80": !isActive }
        )}
        {...props}
      />
    );
  });

  return <div className="flex flex-col items-center justify-center space-y-1 h-full min-w-8 ml-4 -rotate-90 mx-2">{pills}</div>;
}

export { StrengthPills };
