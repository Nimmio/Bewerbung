"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { BookOpen, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AppUserTableActionsProps {
  id: string;
  name: string;
  notDeletable?: boolean;
}

const AppUserTableActions = (props: AppUserTableActionsProps) => {
  const { id, name, notDeletable } = props;
  const [DialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Dialog open={DialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This will delete User {name}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setDialogOpen(false)}>No</Button>
            <Button variant={"destructive"} onClick={() => {}}>
              Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`users/view/${id}`}>
              <Button>
                <BookOpen />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>View User</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"destructive"}
              disabled={notDeletable}
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Delete User</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default AppUserTableActions;
