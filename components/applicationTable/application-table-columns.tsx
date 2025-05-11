import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { StatusOptions } from "@/lib/status";
import { Application, Status } from "@/generated/prisma";
import StatusDropdown from "../statusDropdown/status-dropdown";
import { useApplicationStore } from "@/provider/application-store-provider";

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
  const { setOrderBy, setFilter, filter } = useApplicationStore(
    (state) => state
  );
  return [
    {
      accessorKey: "jobTitle",
      header: () => (
        <Button variant="ghost" onClick={() => setOrderBy("jobTitle")}>
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
      header: () => (
        <Button variant="ghost" onClick={() => setOrderBy("companyName")}>
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "applicationDate",
      header: () => (
        <Button variant="ghost" onClick={() => setOrderBy("applicationDate")}>
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
      header: () => {
        return (
          <div className="flex items-center space-x-2">
            <StatusDropdown
              status={Object.keys(StatusOptions) as Status[]}
              activeStatus={filter || "All"}
              withAll
              onChange={(newStatus) => setFilter(newStatus)}
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

        return (
          <StatusDropdown
            status={Object.keys(StatusOptions) as Status[]}
            activeStatus={status}
            onChange={(newStatus) =>
              onStatusChange({
                id: row.original.id,
                newStatus: newStatus as Status,
              })
            }
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
