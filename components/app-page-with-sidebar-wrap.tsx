import React from "react";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import IBreadcrumb from "@/types/Breadcrumb";
import AppBreadcrumbs from "./app-breadcrumbs";
import AppDarkModeToggle from "./app-dark-mode-toggle";

const AppPageWithSidebarWrap = async ({
  children,
  breadcrumbs,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs?: IBreadcrumb[];
}>) => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          {breadcrumbs ? <AppBreadcrumbs breadcrumbs={breadcrumbs} /> : ""}
        </div>
        <AppDarkModeToggle />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </SidebarInset>
  );
};

export default AppPageWithSidebarWrap;
