"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Application } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import AppDataTableControls from "@/components/app-data-table-controls";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.getValue("link");
      const renderElement = link ? (
        <Link href={link}>
          <Button className="pl-0" variant={"link"}>
            Link
          </Button>
        </Link>
      ) : (
        ""
      );
      return <>{renderElement}</>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const state: string = row.getValue("state");
      const renderString = state.charAt(0) + state.substring(1).toLowerCase();
      return <>{renderString}</>;
    },
  },
  {
    accessorKey: "sendDate",
    header: "Send Date",
    cell: ({ row }) => {
      const sendDate: Date | null = row.getValue("sendDate");
      const renderString = sendDate ? formatDate(sendDate) : "";
      return <>{renderString}</>;
    },
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
    cell: ({ row }) => {
      const lastUpdate: Date | null = row.getValue("lastUpdate");
      const renderString = lastUpdate ? formatDate(lastUpdate, true) : "";
      return <>{renderString}</>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <AppDataTableControls id={id} />;
    },
  },
];
