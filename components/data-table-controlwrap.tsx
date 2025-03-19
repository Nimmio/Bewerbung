"use client";

import React, { Fragment, useCallback } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { redirect, usePathname, useSearchParams } from "next/navigation";

import { PaginationControl } from "./pagination-control";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const DataTableControlWrap = <TData, TValue>(params: {
  DataTableProps: DataTableProps<TData, TValue>;
  dataCount: number;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { DataTableProps, dataCount } = params;
  const { data, columns } = DataTableProps;
  const perPage = +(searchParams.get("perPage") || 10);
  const page = +(searchParams.get("page") || 1);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageSizeChange = (value: number) => {
    redirect(`${pathname}?${createQueryString("perPage", value.toString())}`);
  };

  const handlePageChange = (value: number) => {
    redirect(`${pathname}?${createQueryString("page", value.toString())}`);
  };

  return (
    <>
      <DataTable columns={columns} data={data} />
      <PaginationControl
        className="mt-4"
        totalItems={dataCount}
        onPageSizeChange={handlePageSizeChange}
        pageSize={perPage}
        onPageChange={handlePageChange}
        currentPage={page}
      />
    </>
  );
};

export default DataTableControlWrap;
