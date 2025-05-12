import { Status } from "./types";

export const StatusOptions: Status = {
  Applied: {
    label: "Applied",
    color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  InterviewScheduled: {
    label: "Interview scheduled",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  Interviewed: {
    label: "Interviewed",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  AssessmentScheduled: {
    label: "Assessment scheduled",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  AssessmentCompleted: {
    label: "Assessment completed",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  FollowedUp: {
    label: "Followed up",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  OnHold: {
    label: "On hold",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  Rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  OfferReceived: {
    label: "Offer received",
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  OfferAccepted: {
    label: "Offer accepted",
    color: "bg-green-200 text-green-900 hover:bg-green-300",
  },
  OfferDeclined: {
    label: "Offer declined",
    color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
  Withdrawn: {
    label: "Withdrawn",
    color: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  Closed: {
    label: "Closed",
    color: "bg-teal-100 text-teal-800 hover:bg-teal-200",
  },
  Ghosted: {
    label: "Ghosted",
    color: "bg-gray-400 text-gray-900 hover:bg-gray-500",
  },
};

export const StatusOptionsKeysArray: string[] = Object.keys(StatusOptions);
