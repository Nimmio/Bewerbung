import { Application } from "@prisma/client";

export type CreateApplication = Omit<
  Application,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "interviewAt"
  | "rejectedAt"
  | "sentAt"
  | "archived"
>;

export type EditApplication = Omit<
  Application,
  "id" | "interviewAt" | "rejectedAt" | "sentAt"
>;
