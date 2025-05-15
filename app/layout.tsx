import type { Metadata } from "next";
import { ThemeProvider } from "@/provider/theme-provider";
import "./globals.css";
import { Card } from "@/components/ui/card";
import { isDemo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jop Application Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isDemo() && (
            <Card className="container mx-auto p-10 mt-4">
              Please note: Adding, deleting, and updating applications are
              disabled on this demo instance.
            </Card>
          )}
          <Card className="container mx-auto p-10 mt-4">{children}</Card>
        </ThemeProvider>
      </body>
    </html>
  );
}
