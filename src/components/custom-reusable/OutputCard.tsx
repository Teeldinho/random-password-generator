"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Files } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import usePasswordStore from "@/lib/store/passwordStore";
import { cn } from "@/lib/utils";
import { COPY_TOAST_MESSAGES, OUTPUT_CARD_COPY_TEXT } from "@/lib/helpers/passwordUiText";

export default function OutputCard() {
  const { password, isPasswordGenerated, setCopied, copied } = usePasswordStore((state) => state);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      toast.info(COPY_TOAST_MESSAGES.SUCCESS_TITLE, {
        description: COPY_TOAST_MESSAGES.SUCCESS_DESCRIPTION,
      });
    } catch {
      toast.error(COPY_TOAST_MESSAGES.ERROR_TITLE, {
        description: COPY_TOAST_MESSAGES.ERROR_DESCRIPTION,
      });
    }
  };

  return (
    <Card className={cn("rounded-none min-w-full p-0 bg-muted transition-all")}>
      <CardContent className="w-full py-2 pr-1 flex flex-row items-center justify-between">
        <p>{isPasswordGenerated ? password : OUTPUT_CARD_COPY_TEXT.EMPTY_PASSWORD}</p>

        <div className="flex items-center uppercase gap-2">
          <p className={cn("text-primary text-xs -mr-2", !copied && "hidden")}>{OUTPUT_CARD_COPY_TEXT.COPIED}</p>
          <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} disabled={!isPasswordGenerated}>
            <Files className={cn("size-4 text-foreground", copied && "text-primary")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
