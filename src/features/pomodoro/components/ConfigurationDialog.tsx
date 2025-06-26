import { useState } from "react";
import { ConfigurationForm } from "@/features/pomodoro/components/ConfigurationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";

export function ConfigurationDialog() {
  const [open, setOpen] = useState(false);

  function handleModalClose() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button aria-label="Settings">
          <SettingsIcon className="hover:rotate-45 transition-transform" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pomodoro Settings</DialogTitle>
          <DialogDescription>
            Change your settings across different sessions.
          </DialogDescription>
        </DialogHeader>
        <ConfigurationForm onClose={handleModalClose} />
      </DialogContent>
    </Dialog>
  );
}
