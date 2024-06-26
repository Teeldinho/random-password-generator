"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Files } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import usePasswordStore from "@/lib/store/passwordStore";
import { cn } from "@/lib/utils";

export default function OutputCard() {
  const { password, isPasswordGenerated, setCopied, copied } = usePasswordStore((state) => state);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);

      setCopied(true);

      toast.info("Password Copied To Clipboard.", {
        description: "You can now paste it wherever you need to.",
      });
    } catch (error) {
      toast.error("Failed To Copy Password!", {
        description: "Please try again.",
      });
    }
  };

  return (
    <Card className={cn("rounded-none min-w-full p-0 bg-muted transition-all")}>
      <CardContent className="w-full py-2 pr-1 flex flex-row items-center justify-between">
        <p>{isPasswordGenerated ? password : "No password generated yet."}</p>

        <div className="flex items-center uppercase gap-2">
          <p className={cn("text-primary text-xs -mr-2", !copied && "hidden")}>Copied</p>
          <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} disabled={!isPasswordGenerated}>
            <Files className={cn("size-4 text-foreground", copied && "text-primary")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
