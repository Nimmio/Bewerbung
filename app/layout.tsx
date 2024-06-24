import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import {
  Card,
  ColorSchemeScript,
  Container,
  DEFAULT_THEME,
  MantineProvider,
  createTheme,
  mergeMantineTheme,
} from "@mantine/core";
import AppShell from "@/components/AppShell/AppShell";
import NavbarContent from "@/components/AppShell/NavbarContent";
import FooterContent from "@/components/AppShell/FooterContet";
import { Notifications } from "@mantine/notifications";
import DayjsProvider from "@/components/DayjsProvider";
export const metadata: Metadata = {
  title: "Bewerbung",
  description: "A Application-Manager",
};

const themeOverride = createTheme({
  /** Put your mantine theme override here */
});
const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <AppShell
            navbarContent={<NavbarContent />}
            footerContent={<FooterContent />}
          >
            <Container>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                {children}
              </Card>
            </Container>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
