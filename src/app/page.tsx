import PasswordGenerator from "@/components/custom-reusable/PasswordGenerator";

export default function Home() {
  return (
    <main className="flex overflow-hidden min-w-screen min-h-screen flex-col items-center justify-center pb-8">
      <PasswordGenerator />
    </main>
  );
}
