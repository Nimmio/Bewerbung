import { Button, Card, Flex } from "@mantine/core";
import Link from "next/link";

const NavbarContent = () => (
  <>
    <Flex direction="column" gap={"sm"}>
      <Button variant="subtle" component={Link} href="/" key="ButtonLinkHome">
        Home
      </Button>
      <Button
        variant="subtle"
        component={Link}
        href="/applications/archived"
        key="ButtonLinkArchived"
      >
        Archiv
      </Button>
      <Button
        variant="subtle"
        component={Link}
        href="/timeline"
        key="ButtonLinkTimeline"
      >
        Timeline
      </Button>
      <Button
        variant="subtle"
        component={Link}
        href="/statistics"
        key="ButtonLinkStatistics"
      >
        Statistics
      </Button>
      <Button
        variant="subtle"
        component={Link}
        href="/settings"
        key="ButtonLinkSettings"
      >
        Settings
      </Button>
    </Flex>
  </>
);

export default NavbarContent;
