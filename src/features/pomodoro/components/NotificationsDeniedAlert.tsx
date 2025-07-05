import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function NotificationsDeniedAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Notifications have been denied</AlertTitle>
      <AlertDescription>
        You can allow them on your browser configuration settings.
      </AlertDescription>
    </Alert>
  );
}
