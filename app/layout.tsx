import type { Metadata } from "next";
import "./globals.css";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Jop Application Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Card className="container mx-auto p-10 mt-4 ">{children}</Card>
      </body>
    </html>
  );
}
