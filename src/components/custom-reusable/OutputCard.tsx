"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Files } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import usePasswordStore from "@/lib/store/passwordStore";

export default function OutputCard() {
  const password = usePasswordStore((state) => state.password);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      toast.success("Password Copied To Clipboard!", {
        description: "You can now use the password wherever you need.",
      });
    } catch (error) {
      toast.error("Failed To Copy Password!", {
        description: "Please try again.",
      });
    }
  };

  return (
    <>
      <Card className="rounded-none min-w-full p-0 bg-muted">
        <CardContent className="w-full py-2 pr-1 flex flex-row items-center justify-between">
          <p>{password && password.length > 0 ? password : "No password generated yet."}</p>
          <Button variant="ghost" size="icon" onClick={handleCopyToClipboard}>
            <Files className="size-4 text-primary" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
