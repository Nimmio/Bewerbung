import { Application } from "@/lib/types";
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

interface getColumnsParams {
  onStatusChange: ({
    id,
    newStatus,
  }: {
    id: string;
    newStatus: Application["status"];
  }) => void;
  onView: (id: string) => void;
}

const getColumns = (params: getColumnsParams): ColumnDef<Application>[] => {
  const { onStatusChange, onView } = params;
  return [
    {
      accessorKey: "position",
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
        <div className="font-medium">{row.getValue("position")}</div>
      ),
    },
    {
      accessorKey: "company",
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
      accessorKey: "date",
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
        const date = new Date(row.getValue("date"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Status</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem
                  checked={!column.getFilterValue()}
                  onCheckedChange={() => column.setFilterValue(undefined)}
                >
                  All Statuses
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={column.getFilterValue() === "pending"}
                  onCheckedChange={() => column.setFilterValue("pending")}
                >
                  <Badge
                    variant="outline"
                    className={StatusOptions.pending.color}
                  >
                    {StatusOptions.pending.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={column.getFilterValue() === "reviewed"}
                  onCheckedChange={() => column.setFilterValue("reviewed")}
                >
                  <Badge
                    variant="outline"
                    className={StatusOptions.reviewed.color}
                  >
                    {StatusOptions.reviewed.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={column.getFilterValue() === "accepted"}
                  onCheckedChange={() => column.setFilterValue("accepted")}
                >
                  <Badge
                    variant="outline"
                    className={StatusOptions.accepted.color}
                  >
                    {StatusOptions.accepted.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={column.getFilterValue() === "rejected"}
                  onCheckedChange={() => column.setFilterValue("rejected")}
                >
                  <Badge
                    variant="outline"
                    className={StatusOptions.rejected.color}
                  >
                    {StatusOptions.rejected.label}
                  </Badge>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as Application["status"];
        const { label, color } = StatusOptions[status];

        return (
          <Select
            defaultValue={status}
            onValueChange={(value) =>
              onStatusChange({
                id: row.original.id,
                newStatus: value as Application["status"],
              })
            }
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue>
                <Badge variant="outline" className={color}>
                  {label}
                </Badge>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">
                <Badge
                  variant="outline"
                  className={StatusOptions.pending.color}
                >
                  {StatusOptions.pending.label}
                </Badge>
              </SelectItem>
              <SelectItem value="reviewed">
                <Badge
                  variant="outline"
                  className={StatusOptions.reviewed.color}
                >
                  {StatusOptions.reviewed.label}
                </Badge>
              </SelectItem>
              <SelectItem value="accepted">
                <Badge
                  variant="outline"
                  className={StatusOptions.accepted.color}
                >
                  {StatusOptions.accepted.label}
                </Badge>
              </SelectItem>
              <SelectItem value="rejected">
                <Badge
                  variant="outline"
                  className={StatusOptions.rejected.color}
                >
                  {StatusOptions.rejected.label}
                </Badge>
              </SelectItem>
            </SelectContent>
          </Select>
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
