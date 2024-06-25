"use client";

import { Flex, Pagination, Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface ApplicationTablePaginationProps {
  totalApplications: number;
}

const ApplicationTablePagination = ({
  totalApplications,
}: Readonly<ApplicationTablePaginationProps>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const page = parseInt(searchParams.get("page")?.toString() || "1");
  const limit = parseInt(searchParams.get("limit")?.toString() || "10");

  const handlePageChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 1) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "10") {
      params.set("limit", value);
    } else {
      params.delete("limit");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Flex justify="space-between" align={"flex-end"}>
      <Pagination
        mt={"1em"}
        value={page}
        onChange={handlePageChange}
        total={Math.ceil(totalApplications / limit)}
      />
      <Flex align={"center"} gap={"xs"}>
        Limit:
        <Select
          w={"5em"}
          data={["10", "25", "50", "100", "250", "500", "1000"]}
          value={limit.toString()}
          onChange={(value) => handleLimitChange(value || "10")}
        />
      </Flex>
    </Flex>
  );
};

export default ApplicationTablePagination;
