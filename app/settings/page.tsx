"use client";

import { Button } from "@mantine/core";
import React from "react";
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
      <Button onClick={() => handleCreateDemoData()} color="red">
        DemoData
      </Button>
    </main>
  );
};
export default Settings;
