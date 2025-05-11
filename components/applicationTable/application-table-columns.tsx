import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { StatusOptions } from "@/lib/status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Application, Status } from "@/generated/prisma";
import StatusDropdown from "../statusDropdown/status-dropdown";

interface getColumnsParams {
  onStatusChange: ({
    id,
    newStatus,
  }: {
    id: number;
    newStatus: Application["status"];
  }) => void;
  onView: (id: number) => void;
}

const getColumns = (params: getColumnsParams): ColumnDef<Application>[] => {
  const { onStatusChange, onView } = params;
  return [
    {
      accessorKey: "jobTitle",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("jobTitle")}</div>
      ),
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "applicationDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("applicationDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div className="flex items-center space-x-2">
            <StatusDropdown
              status={Object.keys(StatusOptions) as Status[]}
              activeStatus={column.getFilterValue() as string}
              withAll
              customTrigger={
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Status</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as Application["status"];
        const { label, color } = StatusOptions[status];

        return (
          <StatusDropdown
            status={Object.keys(StatusOptions) as Status[]}
            activeStatus={"Applied"}
          />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={() => onView(row.original.id)}>
            View
          </Button>
        </div>
      ),
    },
  ];
};
export default getColumns;
