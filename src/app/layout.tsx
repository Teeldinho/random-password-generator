import type { Metadata } from "next";
import { JetBrains_Mono as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Random Password Generator",
  description: "Generate random passwords with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("dark font-bold min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
      <Toaster richColors position="bottom-left" />
    </html>
  );
}
