import { useLocalStorage } from "@/hooks/useLocalStorage";
import { defaultPomodoroConfiguration } from "@/features/pomodoro/constants";

export function usePomodoroConfig() {
  const [pomodoroConfig, setPomodoroConfig] = useLocalStorage(
    "pomodoro",
    defaultPomodoroConfiguration
  );

  return { pomodoroConfig, setPomodoroConfig };
}
