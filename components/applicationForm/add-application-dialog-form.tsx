import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { StatusOptions } from "@/lib/status";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, isDemo } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { TCreateApplication } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { Application } from "@/generated/prisma";

const formSchema = z.object({
  jobTitle: z.string().min(2).max(255),
  status: z.enum([
    "Applied",
    "InterviewScheduled",
    "Interviewed",
    "AssessmentScheduled",
    "AssessmentCompleted",
    "FollowedUp",
    "OnHold",
    "Rejected",
    "OfferReceived",
    "OfferAccepted",
    "OfferDeclined",
    "Withdrawn",
    "Closed",
    "Ghosted",
  ]),
  companyName: z.string().min(2).max(255),
  companyLocation: z.optional(z.string().max(255)),
  applicationDate: z.date(),
  applicationMethod: z.string(),
  link: z.union([z.literal(""), z.string().trim().url()]),
  contactPerson: z.string().max(255).optional(),
  contactEmail: z.union([z.literal(""), z.string().trim().email()]),
  notes: z.string().optional(),
  expectedSalary: z.string().max(255).optional(),
});

interface ApplicationFormProps {
  onFormSubmit: (application: TCreateApplication) => void;
  editApplication?: Application;
}

const ApplicationForm = (props: ApplicationFormProps) => {
  const { onFormSubmit, editApplication } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: editApplication?.jobTitle || "",
      status: editApplication?.status || "Applied",
      companyName: editApplication?.companyName || "",
      companyLocation: editApplication?.companyLocation || "",
      applicationDate: editApplication?.applicationDate || new Date(),
      applicationMethod: editApplication?.applicationMethod || "None",
      link: editApplication?.link || "",
      contactPerson: editApplication?.contactPerson || "",
      contactEmail: editApplication?.contactEmail || "",
      notes: editApplication?.notes || "",
      expectedSalary: editApplication?.expectedSalary || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onFormSubmit({
      jobTitle: values.jobTitle,
      status: values.status,
      companyName: values.companyName,
      companyLocation: values.companyLocation || null,
      applicationDate: values.applicationDate || null,
      applicationMethod: values.applicationMethod,
      link: values.link || null,
      contactPerson: values.contactPerson || null,
      contactEmail: values.contactEmail || null,
      notes: values.notes || null,
      expectedSalary: values.expectedSalary || null,
      dateOfLastStatusUpdate: values.applicationDate || null,
    });
  }
  const [popoverOpen, setpopoverOpen] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(StatusOptions).map((StatusOptionKey) => (
                    <SelectItem key={StatusOptionKey} value={StatusOptionKey}>
                      {StatusOptions[StatusOptionKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="applicationDate"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Application Date</FormLabel>
                <FormControl>
                  <Popover
                    open={popoverOpen}
                    onOpenChange={(open) => {
                      setpopoverOpen(open);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3 justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(value) => {
                          field.onChange(value);
                          setpopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="applicationMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "None",
                    "Company Website",
                    "LinkedIn",
                    "Indeed",
                    "Referral",
                    "Email",
                    "Job Board",
                    "Recruiter",
                    "Other",
                  ].map((appliedMethod) => (
                    <SelectItem key={appliedMethod} value={appliedMethod}>
                      {appliedMethod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectedSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Salary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDemo()}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ApplicationForm;
