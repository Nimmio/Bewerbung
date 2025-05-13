"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Application } from "@/generated/prisma";
import { format } from "date-fns";
import { StatusOptions } from "@/lib/status";

interface ViewApplicationDialogProps {
  application: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditButtonCLick: () => void;
}

export function ViewApplicationDialog({
  application,
  open,
  onOpenChange,
  onEditButtonCLick,
}: ViewApplicationDialogProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {application.jobTitle} at {application.companyName}
            </DialogTitle>
            <DialogDescription>Application details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Company:</div>
              <div>{application.companyName}</div>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Location:</div>
              <div>{application.companyLocation || "Not specified"}</div>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Applied on:</div>
              {application.applicationDate && (
                <div>{format(application.applicationDate, "ppp")}</div>
              )}
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Method:</div>
              <div>{application.applicationMethod || "Not specified"}</div>
            </div>

            {application.link && (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="font-medium">Job Link:</div>
                <a
                  href={application.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  View Job Posting
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}

            {application.contactPerson && (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="font-medium">Contact:</div>
                <div>{application.contactPerson}</div>
              </div>
            )}

            {application.contactEmail && (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="font-medium">Contact Email:</div>
                <a
                  href={`mailto:${application.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {application.contactEmail}
                </a>
              </div>
            )}

            {application.expectedSalary && (
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <div className="font-medium">Expected Salary:</div>
                <div>{application.expectedSalary}</div>
              </div>
            )}

            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Status:</div>
              <Badge
                variant="outline"
                className={StatusOptions[application.status].color}
              >
                {StatusOptions[application.status].label}
              </Badge>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-2">
              <div className="font-medium">Notes:</div>
              <div className="whitespace-pre-wrap">
                {application.notes || "No notes available."}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="default" onClick={() => onEditButtonCLick()}>
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
