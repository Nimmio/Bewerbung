"use client";

import { deleteApplication, updateApplication } from "@/app/actions";
import { EditApplication } from "@/types/application";
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Application } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import DayjsProvider from "../DayjsProvider";
import { notifications } from "@mantine/notifications";
import { stringIsValidUrl } from "@/utils/misc";

interface EditApplicationFormProps {
  application: Application;
}

const EditApplicationForm = ({
  application,
}: Readonly<EditApplicationFormProps>): ReactNode => {
  const router = useRouter();
  const StateDropDownValues: { value: Application["state"]; label: string }[] =
    [
      {
        label: "Todo",
        value: "TODO",
      },
      {
        label: "Sent",
        value: "SENT",
      },
      {
        label: "Interview",
        value: "INTERVIEW",
      },
      {
        label: "Rejected",
        value: "REJECTED",
      },
      {
        label: "Success",
        value: "SUCCESS",
      },
    ];

  const form = useForm<EditApplication>({
    mode: "uncontrolled",
    initialValues: {
      ...application,
    },

    validate: {
      company: (value) => (value !== "" ? null : "Invalid email"),
      description: (value) => (value !== "" ? null : "Invalid email"),
      link: (value) => {
        if (value || value === "") return null;
        if (!stringIsValidUrl(value || "")) return "Invalid Link";
        return null;
      },
    },
  });

  const handleSubmit = (values: EditApplication) => {
    updateApplication(values, application.id).then(() => {
      notifications.show({ message: "Updated Application" });
      router.push("/");
    });
  };

  const handleDelete = () => {
    deleteApplication(application.id).then(() => {
      notifications.show({ message: "Deleted Application" });
      router.push("/");
    });
  };

  return (
    <DayjsProvider>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap="md">
          <TextInput
            withAsterisk
            label="Company"
            placeholder="Company Name"
            key={form.key("company")}
            {...form.getInputProps("company")}
          />
          <TextInput
            withAsterisk
            label="Position Description"
            placeholder="Description"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <TextInput
            label="Contact Person"
            placeholder="Contact Person"
            key={form.key("contactPerson")}
            {...form.getInputProps("contactPerson")}
          />
          <TextInput
            label="Link"
            placeholder="Link"
            key={form.key("link")}
            {...form.getInputProps("link")}
          />
          <Select
            label="State"
            key={form.key("state")}
            {...form.getInputProps("state")}
            data={StateDropDownValues}
          />

          <DatePickerInput
            label="Sent Date"
            placeholder="Sent Date"
            key={form.key("sentAt")}
            {...form.getInputProps("sentAt")}
          />
          <DatePickerInput
            label="Reject Date"
            placeholder="Reject Date"
            key={form.key("rejectedAt")}
            {...form.getInputProps("rejectedAt")}
          />
          <Checkbox
            label="archived"
            key={form.key("archived")}
            {...form.getInputProps("archived", { type: "checkbox" })}
          />
          <Button type="submit" fullWidth>
            Save
          </Button>
          <Popover width={250} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button color="red" fullWidth>
                Delete
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Flex justify="center" direction="column">
                <Text ta="center">
                  Are you sure you want to delete this Application?
                </Text>
                <Button color="red" onClick={() => handleDelete()}>
                  Yes
                </Button>
              </Flex>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </form>
    </DayjsProvider>
  );
};

export default EditApplicationForm;
