"use client";

import type { CheckedState } from "@radix-ui/react-checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handlePasswordGeneration } from "@/lib/helpers/helpers";
import { GENERATION_TOAST } from "@/lib/helpers/passwordUiText";
import usePasswordStore from "@/lib/store/passwordStore";
import {
  PASSWORD_DEFAULT_FORM_VALUES,
  PasswordFormSchema,
  PasswordFormType,
  PasswordOptionId,
  PasswordOptionsRecord,
} from "@/lib/types";

type FormOptionsOnChange = (value: PasswordOptionsRecord) => void;

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

  const createHandleGeneratorOptionCheckedChange = (
    options: PasswordOptionsRecord,
    onChange: FormOptionsOnChange,
    optionId: PasswordOptionId
  ) => {
    return (checked: CheckedState) => {
      onChange({
        ...options,
        [optionId]: checked === true,
      });
    };
  };

  return {
    form,
    isPasswordGenerated,
    handleGeneratorFormSubmit,
    handleGeneratorReset,
    createHandleGeneratorOptionCheckedChange,
  };
};
