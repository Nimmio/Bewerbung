import { DatesProvider } from "@mantine/dates";
import React from "react";
import "dayjs/locale/de";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjs from "dayjs";

const DayjsProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  dayjs.extend(localizedFormat);

  return <DatesProvider settings={{ locale: "en" }}>{children}</DatesProvider>;
};

export default DayjsProvider;
