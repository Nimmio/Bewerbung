import { Input } from "@mantine/core";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const urlSearch = searchParams.get("search")?.toString();

  const [value, setValue] = useState(urlSearch);
  const [debouncedValue] = useDebouncedValue(value, 200);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchParams.get("search")?.toString() === debouncedValue) return;
    if (debouncedValue && debouncedValue !== "") {
      params.set("search", debouncedValue);
      params.delete("page");
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [debouncedValue]);

  useEffect(() => {
    if (urlSearch !== value) setValue(urlSearch);
  }, [urlSearch]);

  return (
    <Input
      placeholder="Search"
      w="14.5em"
      leftSection={<IconSearch size={16} />}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};

export default SearchInput;
