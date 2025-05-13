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
import { createApplication } from "@/lib/application";
import { TCreateApplication } from "@/lib/types";
import { ViewApplicationDialog } from "./viewApplicationDialog/view-application-dialog";

interface ApplicationsProps {
  applications: Application[];
  applicationsCount: number;
}

const Applications = (props: ApplicationsProps) => {
  const { applications, applicationsCount } = props;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { orderBy, filter, search, page, perPage } = useApplicationStore(
    (state) => state
  );
  const [viewApplication, setViewApplication] = useState<Application | null>(
    null
  );

  const [editApplication, setEditApplication] = useState<Application | null>(
    null
  );

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(
        "controls",
        JSON.stringify({ orderBy, filter, search, page, perPage })
      )}`
    );
  }, [orderBy, filter, search, page, perPage]);

  const handleAdd = (createApplicationData: TCreateApplication) => {
    createApplication({ newApplication: createApplicationData }).then(() => {
      setIsAddDialogOpen(false);
    });
  };
  const handleView = (id: number) => {
    const applicationToView = applications.find(
      (application) => application.id === id
    );
    if (applicationToView) {
      setViewApplication(applicationToView);
    } else {
      setViewApplication(null);
    }
  };

  const handleEdit = (id: number) => {
    const applicationToEdit = applications.find(
      (application) => application.id === id
    );
    if (applicationToEdit) {
      setEditApplication(applicationToEdit);
    } else {
      setEditApplication(null);
    }
  };

  const handleViewEditButtonClick = () => {
    setEditApplication(viewApplication);
    setViewApplication(null);
  };

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
        applicationsCount={applicationsCount}
        onView={(id) => handleView(id)}
        onEdit={(id) => handleEdit(id)}
      />
      <AddApplicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={(createApplicationData) => {
          handleAdd(createApplicationData);
        }}
      />
      {viewApplication && (
        <ViewApplicationDialog
          application={viewApplication}
          open={viewApplication !== null}
          onOpenChange={(open) => {
            if (!open) {
              setViewApplication(null);
            }
          }}
          onEditButtonCLick={() => handleViewEditButtonClick()}
        />
      )}
    </div>
  );
};

export default Applications;
