"use client";

import {
  PASSWORD_CHAR_LENGTH_DEFAULT,
  PASSWORD_CHAR_LENGTH_MAX,
  PASSWORD_CHAR_LENGTH_MIN,
  passwordOptions,
} from "@/lib/types";
import { MoveRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../../ui/slider";
import StrengthCard from "../strength/StrengthCard";
import { PASSWORD_GENERATOR_TEXT } from "@/lib/constants/passwordUi";
import { cn } from "@/lib/utils";
import { useGeneratorConfiguratorForm } from "@/lib/hooks/useGeneratorConfiguratorForm";

export default function GeneratorConfiguratorForm() {
  const {
    form,
    isPasswordGenerated,
    handleGeneratorFormSubmit,
    handleGeneratorReset,
    createGeneratorOptionCheckedChangeHandler,
    createGeneratorCharacterLengthChangeHandler,
  } = useGeneratorConfiguratorForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleGeneratorFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="characterLength"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center justify-between">
                <p>{PASSWORD_GENERATOR_TEXT.PASSWORD_LENGTH_LABEL}</p>
                <p className="text-lg text-primary">{field.value ?? PASSWORD_CHAR_LENGTH_DEFAULT}</p>
              </FormLabel>
              <FormControl>
                <Slider
                  min={PASSWORD_CHAR_LENGTH_MIN}
                  max={PASSWORD_CHAR_LENGTH_MAX}
                  step={1}
                  value={[field.value]}
                  onValueChange={createGeneratorCharacterLengthChangeHandler(field.onChange)}
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
                      onCheckedChange={createGeneratorOptionCheckedChangeHandler(field.value, field.onChange, option.id)}
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
            {PASSWORD_GENERATOR_TEXT.GENERATE_BUTTON_LABEL}
            <MoveRight className="size-4" />
          </Button>

          {/* Reset Button */}
          <Button
            variant="destructive"
            size="icon"
            type="button"
            className={cn("min-h-full", !isPasswordGenerated && "hidden")}
            onClick={handleGeneratorReset}
          >
            <RotateCcw className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
