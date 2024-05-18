"use client";

import { PasswordFormSchema, PasswordFormType, passwordOptions } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "../ui/slider";
import usePasswordStore from "@/lib/store/passwordStore";

export default function GeneratorConfigurator() {
  const setPassword = usePasswordStore((state) => state.setPassword);

  const form = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: PasswordFormSchema.parse({}), // use zod schema to parse default values
  });

  function onSubmit(data: PasswordFormType) {
    console.log(data);

    const generatedPassword = `Password${data.characterLength}`;
    setPassword(generatedPassword);

    toast.info("Generating Strong Password...", {
      description: <code className="text-white">{JSON.stringify(data, null, 2)}</code>,
    });
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

        <Button variant="default" className="uppercase flex flex-row items-center gap-2 w-full">
          Generate
          <MoveRight className="size-4" />
        </Button>
      </form>
    </Form>
  );
}
