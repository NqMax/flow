// Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
// Icons
import { SettingsIcon } from "lucide-react";
// Types
import type { PomodoroConfig } from "@/features/pomodoro-timer/hooks/usePomodoroTimer";

export function ConfigModal({
  pomodoroConfig,
}: {
  pomodoroConfig: PomodoroConfig;
}) {
  return (
    <Dialog>
      <DialogTrigger className="h-fit">
        <SettingsIcon className="h-5 w-5 transition-transform hover:rotate-45" />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="border"></DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Pomodoro</Label>
            <Input defaultValue={pomodoroConfig.work.time} className="w-20" />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>Short Break</Label>
            <Input
              defaultValue={pomodoroConfig.shortBreak.time}
              className="w-20"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <Label>Long Break</Label>
            <Input
              defaultValue={pomodoroConfig.longBreak.time}
              className="w-20"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label>Auto Start Pomodoros</Label>
          <Switch checked={pomodoroConfig.work.autoStart} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Auto Start Short Breaks</Label>
          <Switch checked={pomodoroConfig.shortBreak.autoStart} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Auto Start Long Breaks</Label>
          <Switch checked={pomodoroConfig.longBreak.autoStart} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Long Break Interval</Label>
          <Input
            defaultValue={pomodoroConfig.longBreak.interval}
            className="w-20"
          />
        </div>
        <Button>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
