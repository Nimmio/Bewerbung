"use client";

import { saveApplication } from "@/app/actions";
import { CreateApplication } from "@/types/application";
import { stringIsValidUrl } from "@/utils/misc";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Application } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

const NewApplicationForm = () => {
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
  const form = useForm<CreateApplication>({
    mode: "uncontrolled",
    initialValues: {
      company: "",
      description: "",
      contactPerson: "",
      state: "TODO",
      link: "",
    },

    validate: {
      company: (value) => (value !== "" ? null : "Invalid Email"),
      description: (value) => (value !== "" ? null : "Invalid Description"),
      link: (value) =>
        value !== "" && !stringIsValidUrl(value || "") ? "Invalid Link" : null,
    },
  });

  const handleSubmit = (values: CreateApplication) => {
    saveApplication(values).then(() => {
      notifications.show({
        message: "Saved Application",
      });
      router.push("/");
    });
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
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
        <Button type="submit" fullWidth>
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default NewApplicationForm;
