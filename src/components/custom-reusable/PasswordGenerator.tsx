import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OutputCard from "./OutputCard";
import GeneratorConfiguratorForm from "@/components/custom-reusable/forms/GeneratorConfiguratorForm";

export default function PasswordGenerator() {
  return (
    <Card className="w-full max-w-[28rem] border-none p-0 z-10">
      <CardHeader className="text-center space-y-5 min-w-full px-0">
        <CardTitle className="text-muted-foreground">Password Generator</CardTitle>
        {/* Card for showing generated password output */}
        <OutputCard />
      </CardHeader>

      <CardContent className="border w-full bg-muted p-4">
        {/* Configurator for password generator */}
        <GeneratorConfiguratorForm />
      </CardContent>
    </Card>
  );
}
