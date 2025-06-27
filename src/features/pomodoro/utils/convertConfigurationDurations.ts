import type { PomodoroConfiguration } from "@/features/pomodoro/types";

// Utility: convert config durations from seconds to minutes
export function configSecondsToMinutes(
  config: PomodoroConfiguration
): PomodoroConfiguration {
  return {
    ...config,
    work: { ...config.work, duration: config.work.duration / 60 },
    break: {
      ...config.break,
      duration: config.break.duration / 60,
    },
    longBreak: {
      ...config.longBreak,
      duration: config.longBreak.duration / 60,
      frequency: config.longBreak.frequency,
    },
  };
}

// Utility: convert config durations from minutes to seconds
export function configMinutesToSeconds(
  config: PomodoroConfiguration
): PomodoroConfiguration {
  return {
    ...config,
    work: { ...config.work, duration: config.work.duration * 60 },
    break: { ...config.break, duration: config.break.duration * 60 },
    longBreak: {
      ...config.longBreak,
      duration: config.longBreak.duration * 60,
      frequency: config.longBreak.frequency,
    },
  };
}
