"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TCreateApplication } from "@/lib/types";
import ApplicationForm from "../applicationForm/application-form";

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (application: TCreateApplication) => void;
}

export function AddApplicationDialog({
  open,
  onOpenChange,
  onAdd,
}: AddApplicationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Enter the details of the new job application.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm onFormSubmit={onAdd} />
      </DialogContent>
    </Dialog>
  );
}
