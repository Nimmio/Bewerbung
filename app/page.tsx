import ApplicationTable from "@/components/Table/ApplicationTable";
import prisma from "@/utils/db";
import { getQuery } from "@/utils/filter";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams?: {
    search?: string;
    page?: string;
    limit?: string;
    filters?: string;
  };
}>) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const limit = parseInt(searchParams?.limit || "10");
  const filter = searchParams?.filters ? JSON.parse(searchParams?.filters) : [];

  //TODO: Reduce Redudancy

  const applicationsCount = await prisma.application.count({
    where: {
      archived: false,
      OR: [
        {
          description: { contains: search, mode: "insensitive" },
        },
        {
          company: { contains: search, mode: "insensitive" },
        },
      ],
      AND: getQuery(filter),
    },
  });

  const applications = await prisma.application.findMany({
    where: {
      archived: false,
      OR: [
        {
          description: { contains: search, mode: "insensitive" },
        },
        {
          company: { contains: search, mode: "insensitive" },
        },
      ],
      AND: getQuery(filter),
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  return (
    <main>
      <ApplicationTable
        applications={applications}
        searchString={search}
        applicationsCount={applicationsCount}
      />
    </main>
  );
}
