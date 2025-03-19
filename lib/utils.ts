import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date, withTime?: boolean): string =>
  withTime ? format(date, "dd.MM.yyyy HH:mm") : format(date, "dd.MM.yyyy");
