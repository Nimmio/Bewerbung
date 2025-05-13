import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, ChevronDown, ExternalLink } from "lucide-react";

import { StatusOptions } from "@/lib/status";
import { Application, Status } from "@/generated/prisma";
import StatusDropdown from "../statusDropdown/status-dropdown";
import { useApplicationStore } from "@/provider/application-store-provider";
import { Badge } from "../ui/badge";

interface GetColumnsParams {
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}

const GetColumns = (params: GetColumnsParams): ColumnDef<Application>[] => {
  const { onView, onEdit } = params;
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
          <Badge variant="outline" className={StatusOptions[status].color}>
            {StatusOptions[status].label}
          </Badge>
        );
      },
    },
    {
      id: "link",
      header: "Link",
      cell: ({ row }) => {
        const link = row.original.link;
        if (!link) return null;

        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
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
          <Button variant="ghost" onClick={() => onEdit(row.original.id)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];
};
export default GetColumns;
