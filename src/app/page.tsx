import PasswordGenerator from "@/components/custom-reusable/PasswordGenerator";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <main className="flex overflow-hidden min-w-screen min-h-screen flex-col items-center justify-center p-2 md:p-0 md:pb-8">
      <BackgroundBeams />
      <PasswordGenerator />
    </main>
  );
}
