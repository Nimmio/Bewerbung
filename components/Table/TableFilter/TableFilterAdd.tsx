"use client";

import { Filter } from "@/types/filter";
import {
  ActionIcon,
  ComboboxData,
  Flex,
  Grid,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

const stringTypeOptions = [
  {
    label: "Exact",
    value: "exact",
  },
  {
    label: "Includes",
    value: "includes",
  },
];

interface TableFilterAddProps {
  onSave: (value: Filter) => void;
}

const TableFilterAdd = ({ onSave }: TableFilterAddProps) => {
  const [fieldValue, setFieldValue] = useState<string | null>(null);
  const [typeOptions, setTypeOptions] = useState<ComboboxData>([]);
  const [typeValue, setTypeValue] = useState<string | null>(null);
  const [textInputValue, setTextInputValue] = useState<string | null>(null);

  useEffect(() => {
    switch (fieldValue) {
      case "company":
      case "description":
      case "contactPerson":
        setTypeOptions(stringTypeOptions);
        setTypeValue(stringTypeOptions[0].value);
        break;

      default:
        setTypeOptions([]);
        setTypeValue(null);
        break;
    }
  }, [fieldValue]);

  const handleFilterSave = () => {
    const newFilter: Filter = [
      fieldValue as string,
      typeValue as string,
      textInputValue || "",
    ];
    onSave(newFilter);
  };

  return (
    <Grid>
      <Grid.Col span={11}>
        <Grid>
          <Grid.Col span={4}>
            <Text>Field:</Text>
            <Select
              size="xs"
              value={fieldValue}
              onChange={(value) => setFieldValue(value)}
              data={[
                {
                  label: "Company",
                  value: "company",
                },
                {
                  label: "Description",
                  value: "description",
                },
                {
                  label: "Contact Person",
                  value: "contactPerson",
                },
                {
                  label: "State",
                  value: "state",
                },
                {
                  label: "Sent Date",
                  value: "sentDate",
                },
                {
                  label: "Reject Date",
                  value: "rejectDate",
                },
                {
                  label: "Create Date",
                  value: "createDate",
                },
                {
                  label: "Update Date",
                  value: "updateDate",
                },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Type:</Text>
            <Select
              size="xs"
              data={typeOptions}
              value={typeValue}
              onChange={(value) => setTypeValue(value)}
              disabled={fieldValue === null}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Text>Value:</Text>
            <TextInput
              size="xs"
              disabled={typeValue === null}
              value={textInputValue || ""}
              onChange={(event) => setTextInputValue(event.currentTarget.value)}
            />
          </Grid.Col>
        </Grid>
      </Grid.Col>

      <Grid.Col span={1}>
        <Flex h="100%" align={"flex-end"}>
          <ActionIcon
            size="md"
            disabled={typeValue === null}
            onClick={() => handleFilterSave()}
          >
            <IconDeviceFloppy />
          </ActionIcon>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default TableFilterAdd;
