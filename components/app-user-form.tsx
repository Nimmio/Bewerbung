"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import ImageUpload from "./image-upload";
import { User } from "@prisma/client";
import { useUser } from "@/context/UserContext";
import { updateUser } from "@/app/(withSidebar)/users/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  avatar: z.any(),
});

interface AppUserFormProps {
  user: User;
  isCurrentUser?: boolean;
}

const AppUserForm = (props: AppUserFormProps) => {
  const { user, isCurrentUser } = props;
  const userContext = useUser();
  const router = useRouter();
  console.log("user", user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      avatar: user.image || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, avatar } = values;

    updateUser({ ...user, name: name, image: avatar }).then(() => {
      if (isCurrentUser) {
        userContext.updateUser({
          ...user,
          name: name,
          avatar: avatar,
        });
      }
      toast("Updated User");
      router.push("/users");
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            disabled
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AppUserForm;
