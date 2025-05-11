import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Status } from "@/generated/prisma";
import { Badge } from "../ui/badge";
import { StatusOptions } from "@/lib/status";

interface StatusDropdownProps {
  status: Status[];
  withAll?: boolean;
  activeStatus: string;
  customTrigger?: ReactNode;
  onChange: (newStatus: Status | "all") => void;
}

const StatusDropdown = (props: StatusDropdownProps) => {
  const {
    status,
    withAll = false,
    activeStatus,
    customTrigger,
    onChange,
  } = props;
  const handleChange = (status: Status | "all") => {
    onChange(status);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {customTrigger ? (
          customTrigger
        ) : (
          <Badge
            variant="outline"
            className={StatusOptions[activeStatus].color}
          >
            {StatusOptions[activeStatus].label}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {withAll && (
          <DropdownMenuCheckboxItem
            checked={activeStatus === "All"}
            onCheckedChange={() => handleChange("all")}
          >
            All Statuses
          </DropdownMenuCheckboxItem>
        )}
        {status.map((statusEnum) => (
          <DropdownMenuCheckboxItem
            checked={statusEnum === activeStatus}
            onCheckedChange={() => handleChange(statusEnum)}
            key={statusEnum}
          >
            <Badge
              variant="outline"
              className={StatusOptions[statusEnum].color}
            >
              {StatusOptions[statusEnum].label}
            </Badge>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
