import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OutputCard from "./OutputCard";
import GeneratorConfiguratorForm from "@/components/custom-reusable/forms/GeneratorConfiguratorForm";
import { PASSWORD_GENERATOR_TEXT } from "@/lib/constants/passwordUi";

export default function PasswordGenerator() {
  return (
    <Card className="w-full max-w-[28rem] border-none p-0 z-10">
      <CardHeader className="text-center space-y-5 min-w-full px-0">
        <CardTitle className="text-muted-foreground">{PASSWORD_GENERATOR_TEXT.TITLE}</CardTitle>
        <OutputCard />
      </CardHeader>

      <CardContent className="border w-full bg-muted p-4">
        <GeneratorConfiguratorForm />
      </CardContent>
    </Card>
  );
}
