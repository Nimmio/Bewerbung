"use client";

import { Flex, Table } from "@mantine/core";
import React from "react";

const Headers = [
  {
    key: "TableHeadCompany",
    label: "Company",
    width: "19.5em",
  },
  {
    key: "TableHeadDescription",
    label: "Description",
    width: "25.5em",
  },
  {
    key: "TableHeadState",
    label: "State",
  },
  {
    key: "TableHeadActions",
    label: "",
  },
];

const ApplicationTableHeader = () => {
  return (
    <Table.Thead>
      <Table.Tr>
        {Headers.map((header) => (
          <Table.Th key={header.key} w={header.width}>
            <div>{header.label}</div>
          </Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};

export default ApplicationTableHeader;
