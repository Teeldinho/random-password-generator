import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GeneratorConfigurator from "./GeneratorConfigurator";
import OutputCard from "./OutputCard";

export default function PasswordGenerator() {
  return (
    <Card className="w-96 border-none p-0">
      <CardHeader className="text-center space-y-5 min-w-full px-0">
        <CardTitle className="text-muted-foreground">Password Generator</CardTitle>
        {/* Card for showing generated password output */}
        <OutputCard />
      </CardHeader>

      <CardContent className="border w-full bg-muted p-4">
        {/* Configurator for password generator */}
        <GeneratorConfigurator />
      </CardContent>
    </Card>
  );
}
