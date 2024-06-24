"use client";

import { AppShell as MantineAppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { useMantineTheme } from "@mantine/core";

interface AppShellProps {
  children: ReactNode;
  headerContent?: ReactNode;
  navbarContent?: ReactNode;
  footerContent?: ReactNode;
}

const AppShell = ({
  children,
  headerContent,
  navbarContent,
  footerContent,
}: Readonly<AppShellProps>) => {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      footer={{ height: 30 }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        {headerContent ? <>{headerContent}</> : <></>}
      </MantineAppShell.Header>
      {navbarContent ? (
        <MantineAppShell.Navbar p="md">{navbarContent}</MantineAppShell.Navbar>
      ) : (
        <></>
      )}

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      {footerContent ? (
        <MantineAppShell.Footer>{footerContent}</MantineAppShell.Footer>
      ) : (
        <></>
      )}
    </MantineAppShell>
  );
};

export default AppShell;
