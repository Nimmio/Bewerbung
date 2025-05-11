import Applications from "@/components/applications";
import { findApplications } from "@/lib/application";
import { ApplicationStoreProvider } from "@/provider/application-store-provider";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { controls } = await searchParams;
  const parsedControls =
    typeof controls === "string" ? JSON.parse(controls) : undefined;
  console.log("parsedControls", parsedControls);
  const { orderBy, filter, search } = parsedControls;
  const applications = await findApplications({ orderBy, filter, search });
  return (
    <ApplicationStoreProvider>
      <h1 className="text-3xl font-bold mb-10">Job Application Manager</h1>
      <Applications applications={applications} />
    </ApplicationStoreProvider>
  );
}
