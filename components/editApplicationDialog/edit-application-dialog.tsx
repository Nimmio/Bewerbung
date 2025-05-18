"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Application } from "@/generated/prisma";
import { TCreateApplication } from "@/lib/types";
import ApplicationForm from "../applicationForm/application-form";

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditSubmit: (application: Application) => void;
  editApplication: Application;
}

const EditApplicationDialog = (props: AddApplicationDialogProps) => {
  const { open, onOpenChange, onEditSubmit, editApplication } = props;

  const handleSubmit = (applicationValues: TCreateApplication) => {
    onEditSubmit({
      ...editApplication,
      ...applicationValues,
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Enter the details of the new job application.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          onFormSubmit={(application) => handleSubmit(application)}
          editApplication={editApplication}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicationDialog;
