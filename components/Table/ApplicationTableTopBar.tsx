import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const ApplicationTableTop = () => {
  return (
    <>
      <SearchInput />
      <Flex gap="md" justify="flex-end">
        <Tooltip label="Show Filter">
          <ActionIcon
            variant="light"
            size="lg"
            radius="xl"
            aria-label="Show Filter"
            color="grey"
          >
            <IconFilter style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="New Application">
          <ActionIcon
            variant="light"
            size="lg"
            radius="xl"
            aria-label="New Application"
            component={Link}
            href="/application/new"
          >
            <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </>
  );
};

export default ApplicationTableTop;
