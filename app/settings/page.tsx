"use client";

import { Button } from "@mantine/core";
import React from "react";
import { fakerDE as faker } from "@faker-js/faker";
import { CreateApplication } from "@/types/application";
import { createDemoData, saveApplication } from "../actions";
import { notifications } from "@mantine/notifications";
const Settings = () => {
  const handleCreateDemoData = () => {
    createDemoData().then(() => {
      notifications.show({ message: "Done" });
    });
  };
  return (
    <main>
      <Button onClick={() => handleCreateDemoData()}>DemoData</Button>
    </main>
  );
};
export default Settings;
