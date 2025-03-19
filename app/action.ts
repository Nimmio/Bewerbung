import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getSession = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const getCurrentUserId = async () => {
  const session = await getSession();
  return session?.user.id;
};
