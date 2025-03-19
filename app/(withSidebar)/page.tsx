import React from "react";

import AppPageWithSidebarWrap from "@/components/app-page-with-sidebar-wrap";
import DashboardElement from "@/components/dashboard-element";
import {
  Calendar,
  ExternalLink,
  GalleryVerticalEnd,
  MailOpen,
  Mic,
  Notebook,
  Send,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import IDashboardValues from "@/types/Dashboard";
import getDashboardValues from "@/lib/dashboard";

const Base = async () => {
  const dashboardValues: IDashboardValues = await getDashboardValues();

  return (
    <AppPageWithSidebarWrap breadcrumbs={[{ title: "Home" }]}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <DashboardElement
            title="Need Action"
            icon={<TriangleAlert />}
            main=<>{dashboardValues.needAction}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Open"
            icon={<MailOpen />}
            main=<>{dashboardValues.open}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Planned"
            icon={<Notebook />}
            main=<>{dashboardValues.planned}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Sent"
            icon={<Send />}
            main=<>{dashboardValues.sent}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Talk"
            icon={<Mic />}
            main=<>{dashboardValues.talk}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Last Week"
            icon={<Calendar />}
            main=<>{dashboardValues.lastWeek}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Last Month"
            icon={<Calendar />}
            main=<>{dashboardValues.lastMonth}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="Last Year"
            icon={<Calendar />}
            main=<>{dashboardValues.lastYear}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
          <DashboardElement
            title="All"
            icon={<GalleryVerticalEnd />}
            main=<>{dashboardValues.allTime}</>
            sub={
              <Button className="pl-0" variant={"link"}>
                <div className="flex items-center gap-1">
                  Open <ExternalLink />
                </div>
              </Button>
            }
          />
        </div>
      </div>
    </AppPageWithSidebarWrap>
  );
};

export default Base;
