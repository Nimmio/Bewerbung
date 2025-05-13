"use server";

import { Application, Prisma, Status } from "@/generated/prisma";
import prisma from "./prisma";
import { TCreateApplication } from "./types";
import { revalidatePath } from "next/cache";

const getWhere = (filter: Status | "all", search: string) => {
  const filterWhere =
    filter !== "all"
      ? {
          status: filter,
        }
      : {};

  const searchWhere =
    search !== ""
      ? {
          OR: [
            {
              jobTitle: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              companyName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              companyLocation: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              contactPerson: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              contactEmail: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              notes: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};
  return Object.assign(filterWhere, searchWhere);
};

interface findApplicationsParams {
  orderBy?: [string, "asc" | "desc"];
  filter?: Status | "all";
  search?: string;
  perPage: number;
  page: number;
}

export const findApplications = async (
  params: findApplicationsParams
): Promise<Application[]> => {
  "use server";
  const {
    orderBy = ["applicationDate", "desc"],
    filter = "all",
    search = "",
    page = 1,
    perPage = 20,
  } = params;
  return await prisma.application.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    where: getWhere(filter, search),
    orderBy: {
      [orderBy[0]]: orderBy[1],
    },
  });
};

interface getApplicatiosnCountParams {
  filter?: Status | "all";
  search?: string;
}

export const getApplicatiosnCount = async (
  params: getApplicatiosnCountParams
): Promise<number> => {
  "use server";
  const { filter = "all", search = "" } = params;
  return await prisma.application.count({
    where: getWhere(filter, search),
  });
};

interface createApplicationParams {
  newApplication: TCreateApplication;
}

interface createApplicationReturns {
  savedApplication?: Application;
  error?: unknown;
}

export const createApplication = async (
  params: createApplicationParams
): Promise<createApplicationReturns> => {
  const { newApplication } = params;
  try {
    const savedApplication = await prisma.application.create({
      data: newApplication,
    });
    revalidatePath("/");
    return { savedApplication };
  } catch (error) {
    console.log("error", error);
    return { error };
  }
};

interface updateApplicationParams {
  application: Application;
}

interface updateApplicationReturns {
  updatedApplication?: Application;
  error?: unknown;
}

export const updateApplication = async (
  params: updateApplicationParams
): Promise<updateApplicationReturns> => {
  const { application } = params;
  try {
    const updatedApplication = await prisma.application.update({
      where: {
        id: application.id,
      },
      data: application,
    });
    revalidatePath("/");
    return { updatedApplication };
  } catch (error) {
    console.log("error", error);
    return { error };
  }
};
