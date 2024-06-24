"use client";

import { Button, Flex } from "@mantine/core";
import { Application } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import DayjsProvider from "../DayjsProvider";
import TitleLabel from "./View/TitleLabel";

interface ViewApplicationProps {
  application: Application;
}

const ViewApplication = ({ application }: Readonly<ViewApplicationProps>) => {
  return (
    <DayjsProvider>
      <Flex direction="column" gap="md">
        <TitleLabel title="Company" text={application?.company} />
        <TitleLabel title="Description" text={application?.description} />
        {application?.link && (
          <TitleLabel
            title="Link"
            text={
              <Button component={Link} href={application.link} target="_blank">
                Link
              </Button>
            }
          />
        )}
        {application?.contactPerson && (
          <TitleLabel
            title="Contact Person"
            text={application?.contactPerson}
          />
        )}
        <TitleLabel title="State" text={application?.state.toLowerCase()} />
        {application?.sentAt && (
          <TitleLabel
            title="Sent At"
            text={dayjs(application.sentAt).format("LL")}
          />
        )}
        {application?.interviewAt && (
          <TitleLabel
            title="Interview At"
            text={dayjs(application.interviewAt).format("LL")}
          />
        )}
        {application?.rejectedAt && (
          <TitleLabel
            title="Rejected At"
            text={dayjs(application.rejectedAt).format("LL")}
          />
        )}
        {application?.updatedAt && (
          <TitleLabel
            title="Updated At"
            text={dayjs(application.updatedAt).format("LL")}
          />
        )}
        {application?.createdAt && (
          <TitleLabel
            title="Created At"
            text={dayjs(application.createdAt).format("LL")}
          />
        )}

        <Button component={Link} href={"/"} fullWidth>
          Back
        </Button>
      </Flex>
    </DayjsProvider>
  );
};

export default ViewApplication;
