import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignupDisabled() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Alert variant="destructive" className="w-full max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Registration Disabled</AlertTitle>
        <AlertDescription>
          New account registration is temporarily disabled. Please check back
          later.
        </AlertDescription>
      </Alert>
    </div>
  );
}
