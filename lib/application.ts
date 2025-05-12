"use server";

import { Application, Status } from "@/generated/prisma";
import prisma from "./prisma";
import { TCreateApplication } from "./types";

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
                mode: "insensitive",
              },
            },
            {
              companyName: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              companyLocation: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              contactPerson: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              contactEmail: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              notes: {
                contains: search,
                mode: "insensitive",
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
    return { savedApplication };
  } catch (error) {
    console.log("error");
    return { error };
  }
};
