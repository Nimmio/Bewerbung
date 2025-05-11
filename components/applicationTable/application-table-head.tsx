import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Application } from "@/lib/types";

interface ApplicationTableHeadProps {
  table: Table<Application>;
}

const ApplicationTableHead = (props: ApplicationTableHeadProps) => {
  const { table } = props;
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default ApplicationTableHead;
