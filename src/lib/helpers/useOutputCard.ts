"use client";

import { toast } from "sonner";
import usePasswordStore from "@/lib/store/passwordStore";
import { COPY_TOAST_MESSAGES } from "@/lib/constants/passwordUi";

export const useOutputCard = () => {
  const { password, isPasswordGenerated, setCopied, copied } = usePasswordStore((state) => state);

  const handleOutputCardCopyToClipboard = async () => {
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

  return {
    password,
    isPasswordGenerated,
    copied,
    handleOutputCardCopyToClipboard,
  };
};
