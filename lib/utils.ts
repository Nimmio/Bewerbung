import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isDemo = (): boolean => {
  return (
    process.env.NEXT_PUBLIC_DEMO !== undefined &&
    typeof process.env.NEXT_PUBLIC_DEMO === "string" &&
    process.env.NEXT_PUBLIC_DEMO.toUpperCase() === "TRUE"
  );
};
