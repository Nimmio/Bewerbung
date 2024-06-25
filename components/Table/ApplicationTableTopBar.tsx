import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconFilter, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

interface ApplicationTableTopProps {
  onToggleFilter: () => void;
}

const ApplicationTableTop = ({ onToggleFilter }: ApplicationTableTopProps) => {
  return (
    <Flex justify="space-between" mb="sm">
      <SearchInput />
      <Flex gap="sm">
        <Tooltip label="Show Filter">
          <ActionIcon
            variant="light"
            size="lg"
            radius="xl"
            aria-label="Show Filter"
            color="grey"
            onClick={onToggleFilter}
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
    </Flex>
  );
};

export default ApplicationTableTop;
