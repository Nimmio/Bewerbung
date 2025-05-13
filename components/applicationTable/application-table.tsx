"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import GetColumns from "./application-table-columns";
import ApplicationTableSearch from "./application-table-search";
import { Application } from "@/generated/prisma";
import { useApplicationStore } from "@/provider/application-store-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getPagesCount } from "@/lib/table";

interface ApplicationTableProps {
  applications: Application[];
  applicationsCount: number;
  onView: (id: Application["id"]) => void;
  onEdit: (id: Application["id"]) => void;
  onDelete: (id: Application["id"]) => void;
}

const pageSizeOptions = [20, 50, 100];

export function ApplicationTable({
  applications,
  onView,
  onEdit,
  onDelete,
  applicationsCount,
}: ApplicationTableProps) {
  const columns = GetColumns({
    onView,
    onEdit,
    onDelete,
  });

  const table = useReactTable({
    data: applications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const {
    setSearch,
    search,
    decreasePage,
    increasePage,
    page,
    setPerPage,
    perPage,
    setPage,
  } = useApplicationStore((state) => state);

  const [pages, setPages] = useState(1);
  useEffect(() => {
    const pagesCount = getPagesCount({
      entrysCount: applicationsCount,
      perPage: perPage || 20,
    });
    setPages(pagesCount);
    if (page && page > pagesCount) {
      setPage(pagesCount);
    }
    return () => {
      setPages(1);
    };
  }, [applicationsCount, perPage, page, setPage]);

  return (
    <div>
      <ApplicationTableSearch
        value={search || ""}
        onChange={(newValue) => setSearch(newValue)}
      />
      <div className="rounded-md border">
        <Table>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={perPage?.toString()}
            onValueChange={(value) => {
              setPerPage(+value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => decreasePage()}
            disabled={page === 1}
          >
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {page} of {pages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => increasePage()}
            disabled={page === pages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
