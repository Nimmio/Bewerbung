"use client";

import React, { useEffect, useState } from "react";
import { ApplicationTable } from "./applicationTable/application-table";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { AddApplicationDialog } from "./addApplicationDialog/add-application-dialog";
import { Application } from "@/generated/prisma";
import { useApplicationStore } from "@/provider/application-store-provider";
import { useQueryString } from "@/hooks/use-query-string,";
import { usePathname, useRouter } from "next/navigation";

interface ApplicationsProps {
  applications: Application[];
}

const Applications = (props: ApplicationsProps) => {
  const { applications } = props;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { orderBy, filter, search } = useApplicationStore((state) => state);

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(
        "controls",
        JSON.stringify({ orderBy, filter, search })
      )}`
    );
  }, [orderBy, filter, search]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Applications</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Application
        </Button>
      </div>
      <ApplicationTable
        applications={applications}
        onView={(id) => console.log("View application:", id)}
        onStatusChange={({ id, newStatus }) =>
          console.log(`Status Change - ID: ${id}, STATUS ${newStatus}`)
        }
      />
      <AddApplicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={() => {}}
      />
    </div>
  );
};

export default Applications;
