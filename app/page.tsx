import Applications from "@/components/applications";
import { findApplications, getApplicatiosnCount } from "@/lib/application";
import { ApplicationStoreProvider } from "@/provider/application-store-provider";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { controls } = await searchParams;
  const parsedControls =
    typeof controls === "string" ? JSON.parse(controls) : undefined;
  const {
    orderBy = undefined,
    filter = undefined,
    search = undefined,
    page = 1,
    perPage = 20,
  } = parsedControls || {};
  const applications = await findApplications({
    orderBy,
    filter,
    search,
    page,
    perPage,
  });
  const applicationsCount = await getApplicatiosnCount({
    filter,
    search,
  });
  console.log("applicationsCount", applicationsCount);
  return (
    <ApplicationStoreProvider>
      <h1 className="text-3xl font-bold mb-10">Job Application Manager</h1>
      <Applications
        applications={applications}
        applicationsCount={applicationsCount}
      />
    </ApplicationStoreProvider>
  );
}
