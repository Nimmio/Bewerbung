import IDashboardValues from "@/types/Dashboard";
import prisma from "./prisma";
import { subMonths, subWeeks, subYears } from "date-fns";
import { getCurrentUserId } from "@/app/action";
const getOpenApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      NOT: { OR: [{ state: "DECLINED" }, { state: "PLANNED" }] },
      userId: await getCurrentUserId(),
    },
  });
};

const getPlannedApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: { state: "PLANNED", userId: await getCurrentUserId() },
  });
};

const getSentApplication = async (): Promise<number> => {
  return await prisma.application.count({
    where: { state: "SENT", userId: await getCurrentUserId() },
  });
};

const getTalkApplication = async (): Promise<number> => {
  return await prisma.application.count({
    where: { state: "TALK", userId: await getCurrentUserId() },
  });
};

const getNeedActionApplication = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      lastUpdate: { lte: subWeeks(new Date(), 2) },
      userId: await getCurrentUserId(),
    },
  });
};

const getLastWeekApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      sendDate: { gte: subWeeks(new Date(), 1) },
      userId: await getCurrentUserId(),
    },
  });
};

const getLastMonthApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      sendDate: { gte: subMonths(new Date(), 1) },
      userId: await getCurrentUserId(),
    },
  });
};

const getLastYearApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      sendDate: { gte: subYears(new Date(), 1) },
      userId: await getCurrentUserId(),
    },
  });
};

const getAllApplications = async (): Promise<number> => {
  return await prisma.application.count({
    where: {
      userId: await getCurrentUserId(),
    },
  });
};

const getDashboardValues = async (): Promise<IDashboardValues> => {
  return {
    open: await getOpenApplications(),
    planned: await getPlannedApplications(),
    sent: await getSentApplication(),
    talk: await getTalkApplication(),
    needAction: await getNeedActionApplication(),
    lastWeek: await getLastWeekApplications(),
    lastMonth: await getLastMonthApplications(),
    lastYear: await getLastYearApplications(),
    allTime: await getAllApplications(),
  };
};

export default getDashboardValues;
