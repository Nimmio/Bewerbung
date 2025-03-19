import React from "react";

import AppPageWithSidebarWrap from "@/components/app-page-with-sidebar-wrap";
import AppCurrenUserForm from "@/components/app-current-user-form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AppUserForm from "@/components/app-user-form";

const Account = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });

  return (
    <AppPageWithSidebarWrap
      breadcrumbs={[{ title: "Settings" }, { title: "User" }]}
    >
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
        {user && <AppUserForm user={user} isCurrentUser />}
      </div>
    </AppPageWithSidebarWrap>
  );
};

export default Account;
