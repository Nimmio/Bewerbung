import React from "react";
import { TableHeader, Table, TableRow, TableHead } from "../ui/table";

interface tableProps {
  headerGroups: {
    id: string;
    headers: {
      id: string;
      isPlaceholder: boolean;
    }[];
  }[];
}

const table = (props: tableProps) => {
  const { headerGroups } = props;
  return (
    <Table>
      <TableHeader>
        {headerGroups.map((headerGroup) => (
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
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <div className="ml-2.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No applications found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default table;
