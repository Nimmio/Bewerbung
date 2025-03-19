import React, { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { redirect, usePathname, useSearchParams } from "next/navigation";

interface AppDataTableControlsParams {
  id: number;
}

const AppDataTableControls = (params: AppDataTableControlsParams) => {
  const { id } = params;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEditRowClick = () => {
    redirect(`${pathname}?${createQueryString("edit", id.toString())}`);
  };
  const handleDeleteRowClick = () => {
    redirect(
      `${pathname}?${createQueryString("deleteApplication", id.toString())}`
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleEditRowClick}>
          Edit Application
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteRowClick}>
          Delete Application
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDataTableControls;
