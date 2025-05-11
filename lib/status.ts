import { Status } from "./types";

export const StatusOptions: Status = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  accepted: {
    label: "Accepted",
    color: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800 hover:bg-red-100",
  },
};
