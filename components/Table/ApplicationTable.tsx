"use client";
import { Pagination, Table } from "@mantine/core";
import ApplicationTableHeader from "./ApplicationTableHeader";
import ApplicationTableTopButtons from "./ApplicationTableTopBar";
import { Application } from "@prisma/client";
import ApplicationTableBody from "./ApplicationTableBody";
import ApplicationTablePagination from "./ApplicationTablePagination";
import TableFilter from "./TableFilter/TableFilter";

interface ApplicationTableProps {
  applications: Application[];
  searchString?: string;
  applicationsCount: number;
}

const ApplicationTable = ({
  applications,
  searchString,
  applicationsCount,
}: Readonly<ApplicationTableProps>) => {
  return (
    <>
      <ApplicationTableTopButtons />
      <TableFilter />
      <Table striped>
        <ApplicationTableHeader />
        <ApplicationTableBody
          applications={applications}
          searchString={searchString}
        />
      </Table>
      <ApplicationTablePagination totalApplications={applicationsCount} />
    </>
  );
};

export default ApplicationTable;
