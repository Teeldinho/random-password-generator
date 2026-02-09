"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GENERATION_TOAST } from "@/lib/constants/passwordUi";
import {
  createGeneratorCharacterLengthChangeHandler,
  createGeneratorOptionCheckedChangeHandler,
} from "@/lib/helpers/generatorForm";
import { handlePasswordGeneration } from "@/lib/helpers/helpers";
import usePasswordStore from "@/lib/store/passwordStore";
import { PASSWORD_DEFAULT_FORM_VALUES, PasswordFormSchema, PasswordFormType } from "@/lib/types";

export const useGeneratorConfiguratorForm = () => {
  const { setPassword, setCopied, resetStore, isPasswordGenerated } = usePasswordStore((state) => state);

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: PASSWORD_DEFAULT_FORM_VALUES,
  });

  const handleGeneratorFormSubmit = (data: PasswordFormType) => {
    const passwordDescription = handlePasswordGeneration(data);

    setCopied(false);
    setPassword(passwordDescription);

    if (passwordDescription.password.length > 0) {
      toast.success(GENERATION_TOAST.TITLE, {
        description: GENERATION_TOAST.DESCRIPTION,
      });
    }
  };

  const handleGeneratorReset = () => {
    resetStore();
  };

  return {
    form,
    isPasswordGenerated,
    handleGeneratorFormSubmit,
    handleGeneratorReset,
    createGeneratorOptionCheckedChangeHandler,
    createGeneratorCharacterLengthChangeHandler,
  };
};
