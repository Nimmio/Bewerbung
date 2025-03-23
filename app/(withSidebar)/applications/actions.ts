"use server";

import prisma from "@/lib/prisma";
import { Application } from "@/prisma/generated/client";

export const saveApplication = async (
  newApplication: Omit<Application, "id" | "lastUpdate">
): Promise<Application> => {
  const { userId, ...aplication } = newApplication;

  return await prisma.application.create({
    data: {
      ...aplication,
      lastUpdate: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const updateAppliaction = async (
  updateApplication: Omit<Application, "lastUpdate">
): Promise<Application> => {
  const { userId, id, ...application } = updateApplication;

  return await prisma.application.update({
    where: {
      id: id,
    },
    data: {
      ...application,
      lastUpdate: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const deleteApplication = async (id: number): Promise<Application> => {
  return await prisma.application.delete({
    where: {
      id: id,
    },
  });
};
