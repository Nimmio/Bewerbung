import ApplicationTable from "@/components/Table/ApplicationTable";
import prisma from "@/utils/db";

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams?: {
    search?: string;
    page?: string;
    limit?: string;
  };
}>) {
  const search = searchParams?.search || "";
  const page = parseInt(searchParams?.page || "1");
  const limit = parseInt(searchParams?.limit || "10");

  //TODO: Reduce Redudancy

  const applicationsCount = await prisma.application.count({
    where: {
      archived: false,
      OR: [
        {
          description: { contains: search },
        },
        {
          company: { contains: search },
        },
      ],
    },
  });

  const applications = await prisma.application.findMany({
    where: {
      archived: false,
      OR: [
        {
          description: { contains: search },
        },
        {
          company: { contains: search },
        },
      ],
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
