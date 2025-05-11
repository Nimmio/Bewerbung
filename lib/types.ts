export type Application = {
  id: string;
  position: string;
  company: string;
  email: string;
  date: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  notes: string;
};

export type Status = {
  [key: string]: {
    label: string;
    color: string;
  };
};
