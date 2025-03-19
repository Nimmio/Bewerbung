import React from "react";
import AppPageWithSidebarWrap from "@/components/app-page-with-sidebar-wrap";
import AppAppliactionModal from "@/components/app-application-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { columns } from "./columns";
import DataTableControlWrap from "@/components/data-table-controlwrap";
import { getCurrentUserId } from "@/app/action";
import AppAppliactionDeleteModal from "@/components/app-application-delete-modal";

interface ApplicationsPageParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Applications = async ({ searchParams }: ApplicationsPageParams) => {
  const { newApplication, page, perPage, edit, deleteApplication } =
    await searchParams;

  const currentUserId = await getCurrentUserId();

  const applicationsPerPage = perPage ? parseInt(perPage as string) : 10;
  const applicationsPage = page ? parseInt(page as string) : 1;

  const applicationsCount = await prisma.application.count({
    where: { userId: currentUserId },
  });
  const applications = await prisma.application.findMany({
    where: { userId: currentUserId },
    take: applicationsPerPage,
    skip: (applicationsPage - 1) * applicationsPerPage,
  });

  const getCurrentLink = (linkAddition?: string): string => {
    let pathname = "/applications?";
    if (applicationsPage !== 1) {
      pathname = `${pathname}page=${applicationsPage}&`;
    }
    if (applicationsPerPage !== 10) {
      pathname = `${pathname}perPage=${applicationsPerPage}&`;
    }
    if (linkAddition) {
      pathname = `${pathname}${linkAddition}`;
    }
    //remove trailing &
    if (pathname.slice(-1) === "&") {
      pathname = pathname.slice(0, -1);
    }
    return pathname;
  };

  const editApplication =
    edit !== undefined
      ? await prisma.application.findFirst({
          where: { id: parseInt(edit as string), userId: currentUserId },
        })
      : null;

  const modalOpen = edit !== undefined || newApplication !== undefined;

  return (
    <AppPageWithSidebarWrap breadcrumbs={[{ title: "Home" }]}>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-8 ">
        <AppAppliactionModal
          editApplication={editApplication}
          open={modalOpen}
          closeUrl={getCurrentLink()}
        />
        <AppAppliactionDeleteModal
          open={deleteApplication !== undefined}
          id={parseInt(deleteApplication as string)}
          closeUrl={getCurrentLink()}
        />
        <Button className="mb-4">
          <Link href={getCurrentLink("newApplication")}>newApplication</Link>
        </Button>
        <DataTableControlWrap
          DataTableProps={{ data: applications, columns: columns }}
          dataCount={applicationsCount}
        />
      </div>
    </AppPageWithSidebarWrap>
  );
};

export default Applications;
