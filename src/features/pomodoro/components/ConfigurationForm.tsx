import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultPomodoroConfiguration } from "@/features/pomodoro/constants";
import {
  configMinutesToSeconds,
  configSecondsToMinutes,
} from "@/features/pomodoro/utils/convertConfigurationDurations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PomodoroConfigurationSchema } from "@/features/pomodoro/schemas/PomodoroConfigurationSchema";
import type { PomodoroConfiguration } from "@/features/pomodoro/types/pomodoroTypes";

interface ConfigurationFormProps {
  onClose: () => void;
}

export function ConfigurationForm({ onClose }: ConfigurationFormProps) {
  const [pomodoroConfig, setPomodoroConfig] =
    useLocalStorage<PomodoroConfiguration>(
      "pomodoro",
      defaultPomodoroConfiguration
    );

  const form = useForm({
    resolver: zodResolver(PomodoroConfigurationSchema),
    defaultValues: configSecondsToMinutes(pomodoroConfig),
  });

  function onSubmit(data: PomodoroConfiguration) {
    setPomodoroConfig(configMinutesToSeconds(data));
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="work.duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pomodoro</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="break.duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Break</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longBreak.duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long Break</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="longBreak.frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Break Frequency</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoStartPhases"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-Configuration">
              <FormLabel>Auto Start Pomodoros/Breaks</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
