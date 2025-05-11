"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Application } from "@/generated/prisma";

interface AddApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (application: Omit<Application, "id">) => void;
}

export function AddApplicationDialog({
  open,
  onOpenChange,
  onAdd,
}: AddApplicationDialogProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState<Application["status"]>("pending");
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [applicationDate, setApplicationDate] = useState<Date>(
    new Date()
  );
  const [applicationMethod, setApplicationMethod] = useState("");
  const [link, setLink] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");

  const handleSubmit = () => {
    if (!jobTitle || !companyName || !applicationDate) {
      return;
    }

    onAdd({
      jobTitle,
      status,
      companyName,
      companyLocation,
      applicationDate: applicationDate
      applicationMethod,
      link,
      contactPerson,
      contactEmail,
      notes,
      expectedSalary,
    });

    // Reset form
    setJobTitle("");
    setStatus("Applied");
    setCompanyName("");
    setCompanyLocation("");
    setApplicationDate(new Date());
    setApplicationMethod("");
    setLink("");
    setContactPerson("");
    setContactEmail("");
    setNotes("");
    setExpectedSalary("");

    onOpenChange(false);
  };

  const applicationMethods = [
    "Company Website",
    "LinkedIn",
    "Indeed",
    "Referral",
    "Email",
    "Job Board",
    "Recruiter",
    "Other",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Enter the details of the new job application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyLocation" className="text-right">
              Company Location
            </Label>
            <Input
              id="companyLocation"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              className="col-span-3"
              placeholder="City, State or Remote"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Application Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !applicationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {applicationDate ? (
                    format(applicationDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={applicationDate}
                  onSelect={setApplicationDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Application Method</Label>
            <Select
              value={applicationMethod}
              onValueChange={setApplicationMethod}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {applicationMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Job Link
            </Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="col-span-3"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactPerson" className="text-right">
              Contact Person
            </Label>
            <Input
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactEmail" className="text-right">
              Contact Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expectedSalary" className="text-right">
              Expected Salary
            </Label>
            <Input
              id="expectedSalary"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="col-span-3"
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(value as Application["status"])
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
