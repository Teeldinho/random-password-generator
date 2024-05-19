import { Card, CardContent } from "@/components/ui/card";
import StrengthIndicator from "@/components/custom-reusable/strength/StrengthIndicator";

export default function StrengthCard() {
  return (
    <Card className="rounded-none min-w-full p-0 bg-card">
      <CardContent className="w-full py-0 flex flex-row items-center justify-between">
        <p className="uppercase text-sm text-muted-foreground">Strength</p>
        <StrengthIndicator />
      </CardContent>
    </Card>
  );
}
