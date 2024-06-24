import EditApplicationForm from "@/components/Application/EditApplicationForm";
import prisma from "@/utils/db";
import React from "react";

export default async function Edit({
  params,
}: Readonly<{ params: { id: string } }>) {
  const { id } = params;
  const application = await prisma.application.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  return (
    <main>
      {application && <EditApplicationForm application={application} />}
    </main>
  );
}
