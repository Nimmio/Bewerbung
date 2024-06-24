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
    JSON.parse(searchParams?.get("filter") || "")
  );


  const handleNewFilter = (newFilter: Filter) => {
    const params = new URLSearchParams(searchParams);
    if (filters.length === 0) params.set("filter", JSON.stringify([newFilter]));
    else params.set("filter", JSON.stringify([...filters, newFilter]));
    setFilters([...filters, ...[newFilter]]);
    replace(`${pathname}?${params.toString()}`);
  };


  //TODO: implement
  const handleDeleteFilter = (index: number) => {
    console.log(index)
    return
    const params = new URLSearchParams(searchParams);
    if () params.set("filter", JSON.stringify([newFilter]));
    else params.set("filter", JSON.stringify([...urlFilter, newFilter]));
    setFilters([...filters, ...[newFilter]]);
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <>
      <Divider mb="sm" />
      <Title order={3}>Filter:</Title>

      <TableFilterAdd onSave={(newFilter) => handleNewFilter(newFilter)} />
      <TableFilterList filters={filters}  onDelete={(index => handleDeleteFilter(index))}/>

      <Divider mt="sm" />
    </>
  );
};

export default TableFilter;
