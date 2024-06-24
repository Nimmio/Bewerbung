import { ActionIcon, Flex, Highlight, Table, Text } from "@mantine/core";
import { Application } from "@prisma/client";
import { IconEdit, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface ApplicationTableBodyProps {
  applications: Application[];
  searchString?: string;
}

const ApplicationTableBody = ({
  applications,
  searchString,
}: Readonly<ApplicationTableBodyProps>) => (
  <Table.Tbody>
    {applications.map((application) => (
      <Table.Tr key={`TableRowKey${application.id}`}>
        <Table.Td>
          <Flex align="center">
            <Highlight highlight={searchString || ""}>
              {application.company}
            </Highlight>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Flex align="center">
            <Highlight highlight={searchString || ""}>
              {application.description}
            </Highlight>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Flex align="center">
            <Text tt="capitalize">{application.state.toLowerCase()}</Text>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Flex justify="end" align="center">
            <ActionIcon
              variant="subtle"
              h="15"
              component={Link}
              href={`/application/view/${application.id}`}
              color="blue.4"
            >
              <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              h="15"
              component={Link}
              href={`/application/edit/${application.id}`}
              color="green.4"
            >
              <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    ))}
  </Table.Tbody>
);

export default ApplicationTableBody;
