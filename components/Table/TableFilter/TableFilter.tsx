"use client";

import { Divider, Grid, Select, Text, Title } from "@mantine/core";
import TableFilterAdd from "./TableFilterAdd";
import TableFilterList from "./TableFilterList";
import { Filter } from "@/types/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TableFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [filters, setFilters] = useState<Filter[]>(
    searchParams?.get("filters")
      ? JSON.parse(searchParams?.get("filters") as string)
      : []
  );

  const handleNewFilter = (newFilter: Filter) => {
    const params = new URLSearchParams(searchParams);
    if (filters.length === 0)
      params.set("filters", JSON.stringify([newFilter]));
    else params.set("filters", JSON.stringify([...filters, newFilter]));
    setFilters([...filters, ...[newFilter]]);
    replace(`${pathname}?${params.toString()}`);
  };

  //TODO: implement
  const handleDeleteFilter = (index: number) => {
    const params = new URLSearchParams(searchParams);
    const newFilters = filters;
    newFilters.splice(index, 1);
    if (newFilters.length !== 0)
      params.set("filters", JSON.stringify(newFilters));
    else params.delete("filters");
    setFilters(newFilters);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Divider mb="sm" />
      <Title order={3}>Filter:</Title>

      <TableFilterAdd onSave={(newFilter) => handleNewFilter(newFilter)} />
      <TableFilterList
        filters={filters}
        onDelete={(index) => handleDeleteFilter(index)}
      />

      <Divider mt="sm" />
    </>
  );
};

export default TableFilter;
