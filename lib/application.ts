import { Application, Status } from "@/generated/prisma";
import prisma from "./prisma";

interface findApplicationsParams {
  orderBy?: [string, "asc" | "desc"];
  filter?: Status | "all";
  search?: string;
}

export const findApplications = async (
  params: findApplicationsParams
): Promise<Application[]> => {
  const {
    orderBy = ["applicationDate", "desc"],
    filter = "all",
    search = "",
  } = params;
  return await prisma.application.findMany({
    where:
      filter !== "all"
        ? {
            status: filter,
          }
        : {},
    orderBy: {
      [orderBy[0]]: orderBy[1],
    },
  });
};
