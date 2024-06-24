"use server";
import { CreateApplication, EditApplication } from "@/types/application";
import prisma from "@/utils/db";
import { fakerDE as faker } from "@faker-js/faker";
import { Application } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveApplication(
  createApplication: Readonly<CreateApplication>
): Promise<Application> {
  const newApplication = await prisma.application.create({
    data: createApplication,
  });
  await prisma.history.create({
    data: {
      applicationId: newApplication.id,
      type: "CREATED",
    },
  });
  revalidatePath("/");

  return newApplication;
}

export async function updateApplication(
  updateApplication: Readonly<EditApplication>,
  id: Readonly<number>
): Promise<Application> {
  const oldApplication = await prisma.application.findFirst({
    where: {
      id: id,
    },
  });

  const newApplication = await prisma.application.update({
    where: {
      id: id,
    },
    data: updateApplication,
  });

  if (oldApplication?.state !== newApplication?.state) {
    await prisma.history.create({
      data: {
        applicationId: newApplication.id,
        type: "CHANGEDSTATE",
        stateFrom: oldApplication?.state,
        stateTo: newApplication?.state,
      },
    });
  }
  if (oldApplication?.archived !== newApplication?.archived) {
    await prisma.history.create({
      data: {
        applicationId: newApplication.id,
        type: "ARCHIVED",
        archivedFrom: oldApplication?.archived,
        archivedTo: newApplication?.archived,
      },
    });
  }
  revalidatePath("/");

  return newApplication;
}

export async function deleteApplication(id: Readonly<number>) {
  await prisma.application.delete({
    where: { id: id },
  });
  revalidatePath("/");
}

export async function createDemoData() {
  const max = 1000;
  for (let index = 0; index < max; index++) {
    const newApplication: CreateApplication = {
      company: faker.company.name(),
      contactPerson: faker.person.fullName(),
      link: "",
      description: faker.person.jobTitle(),
      state: "TODO",
    };
    await saveApplication(newApplication);
  }
  revalidatePath("/");
}
