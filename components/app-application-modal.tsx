"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import AppAppliactionForm from "./app-application-form";
import { Application } from "@/prisma/generated/client";

interface AppAppliactionModalParams {
  open: boolean;
  closeUrl: string;
  editApplication: Application | null;
}

const AppAppliactionModal = (params: AppAppliactionModalParams) => {
  const { open, closeUrl, editApplication } = params;
  const router = useRouter();

  const handleOpenChange = () => {
    router.push(closeUrl);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Application</DialogTitle>
        </DialogHeader>
        <AppAppliactionForm application={editApplication || undefined} />
      </DialogContent>
    </Dialog>
  );
};

export default AppAppliactionModal;
