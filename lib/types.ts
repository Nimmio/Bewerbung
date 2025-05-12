import { Application } from "@/generated/prisma";

export type Status = {
  [key: string]: {
    label: string;
    color: string;
  };
};

export type TCreateApplication = Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
>;
