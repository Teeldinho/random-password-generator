"use client";

import {
  PASSWORD_CHAR_LENGTH_DEFAULT,
  PASSWORD_CHAR_LENGTH_MAX,
  PASSWORD_CHAR_LENGTH_MIN,
  PASSWORD_DEFAULT_FORM_VALUES,
  PasswordFormSchema,
  PasswordFormType,
  passwordOptions,
} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MoveRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../../ui/slider";
import usePasswordStore from "@/lib/store/passwordStore";
import StrengthCard from "../strength/StrengthCard";
import { cn } from "@/lib/utils";
import { handlePasswordGeneration } from "@/lib/helpers/helpers";
import { GENERATION_TOAST } from "@/lib/helpers/passwordUiText";

export default function GeneratorConfiguratorForm() {
  const { setPassword, setCopied, resetStore, isPasswordGenerated } = usePasswordStore((state) => state);

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: PASSWORD_DEFAULT_FORM_VALUES,
  });

  function handleGeneratorFormSubmit(data: PasswordFormType) {
    const passwordDescription = handlePasswordGeneration(data);

    setCopied(false);
    setPassword(passwordDescription);

    if (passwordDescription.password.length > 0)
      toast.success(GENERATION_TOAST.TITLE, {
        description: GENERATION_TOAST.DESCRIPTION,
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleGeneratorFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="characterLength"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center justify-between">
                <p>Password Length</p>
                <p className="text-lg text-primary">{field.value ?? PASSWORD_CHAR_LENGTH_DEFAULT}</p>
              </FormLabel>
              <FormControl>
                <Slider
                  min={PASSWORD_CHAR_LENGTH_MIN}
                  max={PASSWORD_CHAR_LENGTH_MAX}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              {passwordOptions.map((option) => (
                <div key={option.id} className="flex gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value[option.id]}
                      onCheckedChange={(checked) => {
                        field.onChange({
                          ...field.value,
                          [option.id]: checked === true,
                        });
                      }}
                    />
                  </FormControl>
                  <FormLabel>{option.label}</FormLabel>
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <StrengthCard />

        <div className="flex items-center w-full gap-2 transition-all">
          {/* Generate Button */}
          <Button type="submit" variant="default" className="uppercase flex flex-row items-center gap-2 flex-1">
            Generate
            <MoveRight className="size-4" />
          </Button>

          {/* Reset Button */}
          <Button
            variant="destructive"
            size="icon"
            type="button"
            className={cn("min-h-full", !isPasswordGenerated && "hidden")}
            onClick={() => resetStore()}
          >
            <RotateCcw className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
