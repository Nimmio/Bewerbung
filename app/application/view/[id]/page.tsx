import ViewApplication from "@/components/Application/ViewApplication";
import prisma from "@/utils/db";

export default async function View({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const application = await prisma.application.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return (
    <main>{application && <ViewApplication application={application} />}</main>
  );
}
