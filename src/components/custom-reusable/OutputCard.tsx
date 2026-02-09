"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Files } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { OUTPUT_CARD_COPY_TEXT } from "@/lib/constants/passwordUi";
import { useOutputCard } from "@/lib/hooks/useOutputCard";

export default function OutputCard() {
  const { password, isPasswordGenerated, copied, handleOutputCardCopyToClipboard } = useOutputCard();

  return (
    <Card className={cn("rounded-none min-w-full p-0 bg-muted transition-all")}>
      <CardContent className="w-full py-2 pr-1 flex flex-row items-center justify-between">
        <p>{isPasswordGenerated ? password : OUTPUT_CARD_COPY_TEXT.EMPTY_PASSWORD}</p>

        <div className="flex items-center uppercase gap-2">
          <p className={cn("text-primary text-xs -mr-2", !copied && "hidden")}>{OUTPUT_CARD_COPY_TEXT.COPIED}</p>
          <Button variant="ghost" size="icon" onClick={handleOutputCardCopyToClipboard} disabled={!isPasswordGenerated}>
            <Files className={cn("size-4 text-foreground", copied && "text-primary")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
