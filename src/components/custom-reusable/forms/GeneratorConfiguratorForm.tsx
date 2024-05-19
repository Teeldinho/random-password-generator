"use client";

import { PasswordFormSchema, PasswordFormType, PasswordStrength, passwordOptions } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MoveRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../../ui/slider";
import usePasswordStore from "@/lib/store/passwordStore";
import StrengthCard from "../strength/StrengthCard";
import { cn } from "@/lib/utils";

export default function GeneratorConfiguratorForm() {
  const { setPassword, setCopied, resetStore, isPasswordGenerated } = usePasswordStore((state) => state);

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: PasswordFormSchema.parse({}), // use zod schema to parse default values
  });

  function onSubmit(data: PasswordFormType) {
    setCopied(false);

    const generatedPassword = `Password${data.characterLength}`;
    const generatedStrength = PasswordStrength.Medium;
    setPassword(generatedPassword, generatedStrength);

    // toast.success("Strong Password Successfully Generated!", {
    //   description: "You can now copy the password to clipboard or use it wherever you need.",
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="characterLength"
          render={({ field: { value, onChange } }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="flex items-center justify-between">
                <p>Password Length</p>
                <p className="text-lg">{value ?? 10}</p>
              </FormLabel>
              <FormControl>
                <Slider min={1} max={20} step={1} defaultValue={[value]} onValueChange={onChange} />
              </FormControl>
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
                      checked={field.value.includes(option.id)}
                      onCheckedChange={(checked) => {
                        const newOptions = checked ? [...field.value, option.id] : field.value.filter((value) => value !== option.id);
                        field.onChange(newOptions);
                      }}
                    />
                  </FormControl>
                  <FormLabel>{option.label}</FormLabel>
                </div>
              ))}
            </FormItem>
          )}
        />

        <StrengthCard />

        <div className="flex items-center w-full gap-2 transition-all">
          {/* Generate Button */}
          <Button variant="default" className="uppercase flex flex-row items-center gap-2 flex-1">
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
