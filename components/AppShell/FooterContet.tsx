import { ActionIcon, Button, Center } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

const FooterContent = () => {
  return (
    <Center>
      by Benjamin Wilhelm
      <ActionIcon
        variant="subtle"
        color="gray"
        component={Link}
        href="https://github.com/Nimmio"
        target="_blank"
      >
        <IconBrandGithub style={{ width: "70%", height: "70%" }} stroke={1.5} />
      </ActionIcon>
    </Center>
  );
};

export default FooterContent;
