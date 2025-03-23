"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { deleteApplication } from "@/app/(withSidebar)/applications/actions";
import { toast } from "sonner";

interface AppAppliactionDeleteModalParams {
  open: boolean;
  closeUrl: string;
  id?: number;
}

const AppAppliactionDeleteModal = (params: AppAppliactionDeleteModalParams) => {
  const { open, closeUrl, id } = params;
  const router = useRouter();

  const handleOpenChange = () => {
    router.push(closeUrl);
  };

  const handleDelete = () => {
    if (id) {
      deleteApplication(id).then(() => {
        handleOpenChange();
        toast("Deleted Application");
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Application ?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-8">
            <Button
              className="grow"
              variant={"destructive"}
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button className="grow" onClick={handleOpenChange}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppAppliactionDeleteModal;
