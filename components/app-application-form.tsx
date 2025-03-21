"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  saveApplication,
  updateAppliaction,
} from "@/app/(withSidebar)/applications/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Application } from "@prisma/client";

const formSchema = z.object({
  company: z.string().nonempty({ message: "Company cannot be empty" }),
  position: z.string().nonempty({ message: "Position cannot be empty" }),
  link: z.string(),
  sendDate: z.date().or(z.undefined()),
  state: z.enum(["PLANNED", "SENT", "TALK", "WAITING", "DECLINED"]),
  location: z.string(),
});

const AppAppliactionForm = (params: { application?: Application }) => {
  const { application } = params;

  const user = useUser();
  const [sentDateVisiable, setSentDateVisiable] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: application?.company || "",
      position: application?.position || "",
      link: application?.link || "",
      sendDate: application?.sendDate || undefined,
      state: application?.state || "PLANNED",
      location: application?.location || "",
    },
  });

  const handleSave = (values: z.infer<typeof formSchema>) => {
    saveApplication({
      sendDate: values.sendDate ? values.sendDate : null,
      userId: user.user.id,
      ...values,
    }).then(() => {
      toast("Saved Application");
      redirect("/applications");
    });
  };

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    updateAppliaction({
      sendDate: values.sendDate ? values.sendDate : null,
      userId: user.user.id,
      id: application?.id || 0,
      ...values,
    }).then(() => {
      toast("Updated Application");
      redirect("/applications");
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true);
    if (!application?.id) {
      handleSave(values);
    } else {
      handleUpdate(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSentDateVisiable(value !== "PLANNED");
                }}
                defaultValue={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="SENT">Sent</SelectItem>
                  <SelectItem value="TALK">Talk</SelectItem>
                  <SelectItem value="WAITING">Wating</SelectItem>
                  <SelectItem value="DECLINED">Decline</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {sentDateVisiable && (
          <FormField
            control={form.control}
            name="sendDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sent on: </FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="w-full"
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button disabled={disabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default AppAppliactionForm;
